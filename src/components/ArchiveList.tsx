import Link from "next/link";
import { Calendar } from "lucide-react";

interface ArchiveDigest {
  id: string;
  date: string;
  story_count: number;
}

interface ArchiveListProps {
  digests: ArchiveDigest[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArchiveList({ digests }: ArchiveListProps) {
  if (digests.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-slate-500">
        No past digests available yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200">
      {digests.map((digest) => (
        <li key={digest.id}>
          <Link
            href={`/digest/${digest.date}`}
            className="flex items-center justify-between px-2 py-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <Calendar size={16} strokeWidth={1.5} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-900">
                {formatDate(digest.date)}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {digest.story_count} {digest.story_count === 1 ? "story" : "stories"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
