import { extractUniqueTopics, filterStoriesByTopics } from "../topics";
import { StoryWithSummary } from "@/types/digest";

function makeStory(overrides: Partial<StoryWithSummary> = {}): StoryWithSummary {
  return {
    id: "s1",
    digest_id: "d1",
    hn_id: 1,
    title: "Test",
    url: null,
    author: "user",
    score: 100,
    comment_count: 50,
    posted_at: "2025-01-01T00:00:00Z",
    rank: 1,
    summary: null,
    ...overrides,
  };
}

function makeSummary(topics: string[]) {
  return {
    id: "sum1",
    story_id: "s1",
    takeaways: [],
    sentiment: "neutral",
    key_debates: null,
    quotes: [],
    topics,
    model_used: "test",
    token_count: null,
    generated_at: "2025-01-01T00:00:00Z",
  };
}

describe("extractUniqueTopics", () => {
  it("returns [] for empty stories array", () => {
    expect(extractUniqueTopics([])).toEqual([]);
  });

  it("returns [] when stories have no summaries", () => {
    expect(extractUniqueTopics([makeStory()])).toEqual([]);
  });

  it("returns sorted unique topics across all stories", () => {
    const stories = [
      makeStory({ id: "s1", summary: makeSummary(["Rust", "AI"]) }),
      makeStory({ id: "s2", summary: makeSummary(["Cloud", "DevOps"]) }),
    ];
    expect(extractUniqueTopics(stories)).toEqual(["AI", "Cloud", "DevOps", "Rust"]);
  });

  it("deduplicates topics appearing in multiple stories", () => {
    const stories = [
      makeStory({ id: "s1", summary: makeSummary(["AI", "Rust"]) }),
      makeStory({ id: "s2", summary: makeSummary(["AI", "Cloud"]) }),
    ];
    expect(extractUniqueTopics(stories)).toEqual(["AI", "Cloud", "Rust"]);
  });
});

describe("filterStoriesByTopics", () => {
  const stories = [
    makeStory({ id: "s1", summary: makeSummary(["AI", "Rust"]) }),
    makeStory({ id: "s2", summary: makeSummary(["Cloud"]) }),
    makeStory({ id: "s3", summary: null }),
  ];

  it("returns all stories when selectedTopics is empty", () => {
    expect(filterStoriesByTopics(stories, [])).toEqual(stories);
  });

  it("returns only stories matching ANY selected topic", () => {
    const result = filterStoriesByTopics(stories, ["AI"]);
    expect(result).toEqual([stories[0]]);
  });

  it("returns [] when no stories match", () => {
    expect(filterStoriesByTopics(stories, ["Go"])).toEqual([]);
  });

  it("excludes stories with null summary", () => {
    const result = filterStoriesByTopics(stories, ["AI", "Cloud"]);
    expect(result).toHaveLength(2);
    expect(result.map((s) => s.id)).toEqual(["s1", "s2"]);
  });
});
