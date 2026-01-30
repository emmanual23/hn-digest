"use client";

interface TopicFilterProps {
  topics: string[];
  selectedTopics: string[];
  onToggle: (topic: string) => void;
  onClear: () => void;
}

export function TopicFilter({
  topics,
  selectedTopics,
  onToggle,
  onClear,
}: TopicFilterProps) {
  if (topics.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-400">Filter</span>
      {topics.map((topic) => {
        const isSelected = selectedTopics.includes(topic);
        return (
          <button
            key={topic}
            onClick={() => onToggle(topic)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              isSelected
                ? "bg-slate-700 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {topic}
          </button>
        );
      })}
      {selectedTopics.length > 0 && (
        <button
          onClick={onClear}
          className="text-xs font-medium text-slate-400 hover:text-slate-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}
