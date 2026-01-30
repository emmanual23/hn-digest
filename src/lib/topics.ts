import { StoryWithSummary } from "@/types/digest";

export function extractUniqueTopics(stories: StoryWithSummary[]): string[] {
  const topicSet = new Set<string>();
  for (const story of stories) {
    if (story.summary?.topics) {
      for (const topic of story.summary.topics) {
        topicSet.add(topic);
      }
    }
  }
  return Array.from(topicSet).sort();
}

export function filterStoriesByTopics(
  stories: StoryWithSummary[],
  selectedTopics: string[]
): StoryWithSummary[] {
  if (selectedTopics.length === 0) return stories;
  return stories.filter(
    (story) =>
      story.summary?.topics?.some((topic) => selectedTopics.includes(topic)) ??
      false
  );
}
