import { createClient } from "@/lib/supabase/server";
import { DigestHeader } from "@/components/DigestHeader";
import { StoryCard } from "@/components/StoryCard";
import { EmptyState } from "@/components/EmptyState";
import { StoryWithSummary } from "@/types/digest";

export const revalidate = 300; // revalidate every 5 minutes

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: digest } = await supabase
    .from("digests")
    .select(
      `
      id,
      date,
      story_count,
      status,
      stories (
        id,
        digest_id,
        hn_id,
        title,
        url,
        author,
        score,
        comment_count,
        posted_at,
        rank,
        summaries (
          id,
          story_id,
          takeaways,
          sentiment,
          key_debates,
          model_used,
          token_count,
          generated_at
        )
      )
    `
    )
    .eq("date", today)
    .eq("status", "complete")
    .single();

  if (!digest) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <EmptyState />
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stories: StoryWithSummary[] = (digest.stories as any[])
    .map((s) => ({
      ...s,
      summary: Array.isArray(s.summaries)
        ? s.summaries[0] ?? null
        : s.summaries ?? null,
    }))
    .sort((a, b) => a.rank - b.rank);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="space-y-8">
        <DigestHeader date={digest.date} storyCount={digest.story_count} />
        <div className="space-y-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
