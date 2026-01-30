import { createClient } from "@/lib/supabase/server";
import { ArchiveList } from "@/components/ArchiveList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive — HN Digest",
  description: "Browse past daily digests of Hacker News discussions",
};

export const revalidate = 300;

export default async function ArchivePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("digests")
    .select("id, date, story_count")
    .eq("status", "complete")
    .order("date", { ascending: false })
    .limit(100);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">Archive</h1>
          <p className="text-sm text-slate-500">Browse past daily digests</p>
        </div>
        <ArchiveList digests={data ?? []} />
      </div>
    </div>
  );
}
