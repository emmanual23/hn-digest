interface DigestHeaderProps {
  date: string;
  storyCount: number;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DigestHeader({ date, storyCount }: DigestHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold text-slate-900">
        {formatDate(date)}
      </h1>
      <p className="text-sm text-slate-500">
        {storyCount} {storyCount === 1 ? "story" : "stories"} from Hacker News
      </p>
    </div>
  );
}
