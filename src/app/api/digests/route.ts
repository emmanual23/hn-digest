import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const limit = 20;

  let query = supabase
    .from("digests")
    .select("id, date, story_count, status")
    .eq("status", "complete")
    .order("date", { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt("date", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = data.length > limit;
  const digests = hasMore ? data.slice(0, limit) : data;
  const nextCursor = hasMore ? digests[digests.length - 1].date : null;

  return NextResponse.json({ digests, next_cursor: nextCursor });
}
