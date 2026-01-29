import { ArrowUpRight, MessageSquare, TrendingUp, User, Clock } from "lucide-react";

interface StoryMetaProps {
  score: number;
  commentCount: number;
  author: string;
  postedAt: string;
  hnId: number;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const hours = Math.floor((now - then) / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function StoryMeta({ score, commentCount, author, postedAt, hnId }: StoryMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
      <span className="flex items-center gap-1">
        <TrendingUp size={14} strokeWidth={1.5} />
        {score}
      </span>
      <span className="flex items-center gap-1">
        <MessageSquare size={14} strokeWidth={1.5} />
        {commentCount}
      </span>
      <span className="flex items-center gap-1">
        <User size={14} strokeWidth={1.5} />
        {author}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={14} strokeWidth={1.5} />
        {timeAgo(postedAt)}
      </span>
      <a
        href={`https://news.ycombinator.com/item?id=${hnId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-slate-600 hover:text-slate-700"
      >
        HN
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </a>
    </div>
  );
}
