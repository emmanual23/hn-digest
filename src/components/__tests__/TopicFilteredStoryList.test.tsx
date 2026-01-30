import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { TopicFilteredStoryList } from "../TopicFilteredStoryList";
import { StoryWithSummary } from "@/types/digest";

function makeStory(
  id: string,
  title: string,
  topics: string[]
): StoryWithSummary {
  return {
    id,
    digest_id: "d1",
    hn_id: 1,
    title,
    url: null,
    author: "user",
    score: 100,
    comment_count: 50,
    posted_at: "2025-01-01T00:00:00Z",
    rank: 1,
    summary: {
      id: `sum-${id}`,
      story_id: id,
      takeaways: [],
      sentiment: "neutral",
      key_debates: null,
      quotes: [],
      topics,
      model_used: "test",
      token_count: null,
      generated_at: "2025-01-01T00:00:00Z",
    },
  };
}

const stories: StoryWithSummary[] = [
  makeStory("s1", "AI Story", ["AI", "ML"]),
  makeStory("s2", "Cloud Story", ["Cloud"]),
  makeStory("s3", "Rust Story", ["Rust", "AI"]),
];

describe("TopicFilteredStoryList", () => {
  it("renders all stories when no filter is active", () => {
    render(<TopicFilteredStoryList stories={stories} />);
    expect(screen.getByText("AI Story")).toBeInTheDocument();
    expect(screen.getByText("Cloud Story")).toBeInTheDocument();
    expect(screen.getByText("Rust Story")).toBeInTheDocument();
  });

  it("renders TopicFilter with unique topics from stories", () => {
    render(<TopicFilteredStoryList stories={stories} />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cloud" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ML" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rust" })).toBeInTheDocument();
  });

  it("clicking a topic pill filters the visible story list", async () => {
    render(<TopicFilteredStoryList stories={stories} />);
    await userEvent.click(screen.getByRole("button", { name: "Cloud" }));
    expect(screen.getByText("Cloud Story")).toBeInTheDocument();
    expect(screen.queryByText("AI Story")).not.toBeInTheDocument();
    expect(screen.queryByText("Rust Story")).not.toBeInTheDocument();
  });

  it("clicking a selected topic deselects it, restoring stories", async () => {
    render(<TopicFilteredStoryList stories={stories} />);
    const cloudBtn = screen.getByRole("button", { name: "Cloud" });
    await userEvent.click(cloudBtn);
    expect(screen.queryByText("AI Story")).not.toBeInTheDocument();

    await userEvent.click(cloudBtn);
    expect(screen.getByText("AI Story")).toBeInTheDocument();
    expect(screen.getByText("Cloud Story")).toBeInTheDocument();
    expect(screen.getByText("Rust Story")).toBeInTheDocument();
  });

  it('clicking Clear restores all stories', async () => {
    render(<TopicFilteredStoryList stories={stories} />);
    await userEvent.click(screen.getByRole("button", { name: "Cloud" }));
    expect(screen.queryByText("AI Story")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Clear"));
    expect(screen.getByText("AI Story")).toBeInTheDocument();
    expect(screen.getByText("Cloud Story")).toBeInTheDocument();
    expect(screen.getByText("Rust Story")).toBeInTheDocument();
  });

  it("does not render TopicFilter when no topics exist across stories", () => {
    const noTopicStories: StoryWithSummary[] = [
      {
        ...stories[0],
        summary: { ...stories[0].summary!, topics: [] },
      },
    ];
    render(<TopicFilteredStoryList stories={noTopicStories} />);
    expect(screen.queryByText("Filter")).not.toBeInTheDocument();
  });
});
