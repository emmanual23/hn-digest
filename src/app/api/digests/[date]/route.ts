import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: digest, error } = await supabase
    .from("digests")
    .select(
      `
      id,
      date,
      story_count,
      status,
      created_at,
      stories (
        id,
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
    .eq("date", date)
    .single();

  if (error || !digest) {
    return NextResponse.json({ digest: null }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawStories = digest.stories as any[];
  const stories = rawStories
    .map((story) => ({
      id: story.id,
      hn_id: story.hn_id,
      title: story.title,
      url: story.url,
      author: story.author,
      score: story.score,
      comment_count: story.comment_count,
      posted_at: story.posted_at,
      rank: story.rank,
      summary: Array.isArray(story.summaries)
        ? story.summaries[0] ?? null
        : story.summaries ?? null,
    }))
    .sort((a, b) => a.rank - b.rank);

  return NextResponse.json({
    digest: {
      id: digest.id,
      date: digest.date,
      story_count: digest.story_count,
      status: digest.status,
      created_at: digest.created_at,
      stories,
    },
  });
}
