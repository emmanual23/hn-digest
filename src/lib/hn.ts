import { HNItem } from "@/types/hn";

const HN_API_BASE = "https://hacker-news.firebaseio.com/v0";

export async function fetchTopStories(limit = 30): Promise<number[]> {
  const res = await fetch(`${HN_API_BASE}/topstories.json`);
  if (!res.ok) throw new Error(`Failed to fetch top stories: ${res.status}`);
  const ids: number[] = await res.json();
  return ids.slice(0, limit);
}

export async function fetchItem(id: number): Promise<HNItem | null> {
  try {
    const res = await fetch(`${HN_API_BASE}/item/${id}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchComments(
  item: HNItem,
  limit = 50
): Promise<HNItem[]> {
  if (!item.kids || item.kids.length === 0) return [];

  const commentIds = item.kids.slice(0, limit);
  const results = await Promise.allSettled(
    commentIds.map((id) => fetchItem(id))
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<HNItem> =>
        r.status === "fulfilled" && r.value !== null && !!r.value.text
    )
    .map((r) => r.value);
}
