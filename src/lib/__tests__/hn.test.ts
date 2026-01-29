import { fetchTopStories, fetchItem, fetchComments } from "../hn";
import { HNItem } from "@/types/hn";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("fetchTopStories", () => {
  it("returns top N story IDs", async () => {
    const ids = Array.from({ length: 500 }, (_, i) => i + 1);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(ids),
    });

    const result = await fetchTopStories(30);
    expect(result).toHaveLength(30);
    expect(result[0]).toBe(1);
    expect(result[29]).toBe(30);
  });

  it("throws on HTTP error", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchTopStories()).rejects.toThrow("Failed to fetch top stories");
  });
});

describe("fetchItem", () => {
  it("returns an HN item", async () => {
    const item: HNItem = {
      id: 123,
      type: "story",
      by: "testuser",
      time: 1700000000,
      title: "Test Story",
      score: 100,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(item),
    });

    const result = await fetchItem(123);
    expect(result).toEqual(item);
  });

  it("returns null on HTTP error", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const result = await fetchItem(999);
    expect(result).toBeNull();
  });

  it("returns null on network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));
    const result = await fetchItem(999);
    expect(result).toBeNull();
  });
});

describe("fetchComments", () => {
  it("fetches comments from item kids", async () => {
    const parent: HNItem = {
      id: 1,
      type: "story",
      by: "author",
      time: 1700000000,
      kids: [10, 11, 12],
    };

    const comments: HNItem[] = [
      { id: 10, type: "comment", by: "a", time: 1700000001, text: "Comment A" },
      { id: 11, type: "comment", by: "b", time: 1700000002, text: "Comment B" },
      { id: 12, type: "comment", by: "c", time: 1700000003, text: "Comment C" },
    ];

    comments.forEach((c) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(c),
      });
    });

    const result = await fetchComments(parent, 50);
    expect(result).toHaveLength(3);
    expect(result[0].text).toBe("Comment A");
  });

  it("returns empty array when item has no kids", async () => {
    const parent: HNItem = { id: 1, type: "story", by: "author", time: 1700000000 };
    const result = await fetchComments(parent);
    expect(result).toEqual([]);
  });

  it("skips comments without text", async () => {
    const parent: HNItem = {
      id: 1,
      type: "story",
      by: "author",
      time: 1700000000,
      kids: [10, 11],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 10, type: "comment", by: "a", time: 1, text: "Valid" }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 11, type: "comment", by: "b", time: 2 }), // no text (deleted)
    });

    const result = await fetchComments(parent);
    expect(result).toHaveLength(1);
  });
});
