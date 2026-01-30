import { Quote } from "@/types/digest";

interface QuoteBlockProps {
  quotes: Quote[];
}

export function QuoteBlock({ quotes }: QuoteBlockProps) {
  if (quotes.length === 0) return null;

  return (
    <div className="space-y-2">
      {quotes.map((q, i) => (
        <blockquote
          key={i}
          className="border-l-2 border-slate-300 pl-3 text-sm text-slate-600 italic"
        >
          &ldquo;{q.text}&rdquo;
          <span className="ml-1 not-italic text-slate-400">
            &mdash; {q.author}
          </span>
        </blockquote>
      ))}
    </div>
  );
}
