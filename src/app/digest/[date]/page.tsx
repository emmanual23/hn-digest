import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DigestHeader } from "@/components/DigestHeader";
import { DigestNav } from "@/components/DigestNav";
import { StoryCard } from "@/components/StoryCard";
import { StoryWithSummary } from "@/types/digest";
import type { Metadata } from "next";

interface DigestPageProps {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: DigestPageProps): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `${date} — HN Digest`,
    description: `Hacker News discussion digest for ${date}`,
  };
}

export const revalidate = 3600;

export default async function DigestPage({ params }: DigestPageProps) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    notFound();
  }

  const supabase = await createClient();

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
    .eq("date", date)
    .eq("status", "complete")
    .single();

  if (!digest) {
    notFound();
  }

  // Get adjacent digest dates for navigation
  const [{ data: prevData }, { data: nextData }] = await Promise.all([
    supabase
      .from("digests")
      .select("date")
      .eq("status", "complete")
      .lt("date", date)
      .order("date", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("digests")
      .select("date")
      .eq("status", "complete")
      .gt("date", date)
      .order("date", { ascending: true })
      .limit(1)
      .single(),
  ]);

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
        <div className="space-y-4">
          <DigestNav
            currentDate={digest.date}
            previousDate={prevData?.date ?? null}
            nextDate={nextData?.date ?? null}
          />
          <DigestHeader date={digest.date} storyCount={digest.story_count} />
        </div>
        <div className="space-y-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
