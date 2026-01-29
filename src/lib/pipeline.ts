import { createClient } from "@supabase/supabase-js";
import { fetchTopStories, fetchItem, fetchComments } from "./hn";
import { synthesizeComments } from "./llm";
import { HNItem } from "@/types/hn";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function updateDigestStatus(digestId: string, status: string) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("digests")
    .update({ status })
    .eq("id", digestId);
  if (error) throw new Error(`Failed to update digest status: ${error.message}`);
}

export async function runPipeline(): Promise<{ digestId: string; storyCount: number }> {
  const supabase = getServiceClient();
  const today = new Date().toISOString().split("T")[0];

  // Check if today's digest already exists
  const { data: existing } = await supabase
    .from("digests")
    .select("id, status")
    .eq("date", today)
    .single();

  if (existing?.status === "complete") {
    return { digestId: existing.id, storyCount: 0 };
  }

  // Create or reuse digest row
  let digestId: string;
  if (existing) {
    digestId = existing.id;
    await updateDigestStatus(digestId, "pending");
  } else {
    const { data, error } = await supabase
      .from("digests")
      .insert({ date: today, status: "pending" })
      .select("id")
      .single();
    if (error || !data) throw new Error(`Failed to create digest: ${error?.message}`);
    digestId = data.id;
  }

  try {
    // Stage: fetching
    await updateDigestStatus(digestId, "fetching");

    const storyIds = await fetchTopStories(30);
    const stories: (HNItem & { comments: HNItem[] })[] = [];

    for (const id of storyIds) {
      const item = await fetchItem(id);
      if (!item || !item.title) continue;
      const comments = await fetchComments(item, 50);
      stories.push({ ...item, comments });
    }

    // Insert story rows
    const storyRows = stories.map((s, i) => ({
      digest_id: digestId,
      hn_id: s.id,
      title: s.title!,
      url: s.url ?? null,
      author: s.by,
      score: s.score ?? 0,
      comment_count: s.descendants ?? 0,
      posted_at: new Date(s.time * 1000).toISOString(),
      rank: i + 1,
    }));

    // Clear old stories if retrying
    await supabase.from("stories").delete().eq("digest_id", digestId);

    const { data: insertedStories, error: storyError } = await supabase
      .from("stories")
      .insert(storyRows)
      .select("id, hn_id");

    if (storyError || !insertedStories) {
      throw new Error(`Failed to insert stories: ${storyError?.message}`);
    }

    // Stage: synthesizing
    await updateDigestStatus(digestId, "synthesizing");

    const hnIdToDbId = new Map(insertedStories.map((s) => [s.hn_id, s.id]));

    let synthesizedCount = 0;
    for (const story of stories) {
      const dbId = hnIdToDbId.get(story.id);
      if (!dbId) continue;

      const commentTexts = story.comments
        .map((c) => c.text)
        .filter((t): t is string => !!t);

      if (commentTexts.length === 0) continue;

      try {
        const result = await synthesizeComments(story.title!, commentTexts);

        await supabase.from("summaries").upsert(
          {
            story_id: dbId,
            takeaways: result.takeaways,
            sentiment: result.sentiment,
            key_debates: result.key_debates,
            model_used: result.model_used,
            token_count: result.token_count,
          },
          { onConflict: "story_id" }
        );

        synthesizedCount++;
      } catch (err) {
        // Partial success: log and continue with other stories
        console.error(`Synthesis failed for story ${story.id}:`, err);
      }
    }

    // Complete
    await supabase
      .from("digests")
      .update({ status: "complete", story_count: stories.length })
      .eq("id", digestId);

    return { digestId, storyCount: synthesizedCount };
  } catch (err) {
    await updateDigestStatus(digestId, "failed");
    throw err;
  }
}
