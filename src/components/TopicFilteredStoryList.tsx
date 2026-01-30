"use client";

import { useState } from "react";
import { StoryWithSummary } from "@/types/digest";
import { extractUniqueTopics, filterStoriesByTopics } from "@/lib/topics";
import { TopicFilter } from "./TopicFilter";
import { StoryCard } from "./StoryCard";

interface TopicFilteredStoryListProps {
  stories: StoryWithSummary[];
}

export function TopicFilteredStoryList({
  stories,
}: TopicFilteredStoryListProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const allTopics = extractUniqueTopics(stories);
  const filteredStories = filterStoriesByTopics(stories, selectedTopics);

  const handleToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleClear = () => setSelectedTopics([]);

  return (
    <div className="space-y-4">
      <TopicFilter
        topics={allTopics}
        selectedTopics={selectedTopics}
        onToggle={handleToggle}
        onClear={handleClear}
      />
      {filteredStories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
