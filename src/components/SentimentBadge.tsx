const SENTIMENT_CONFIG: Record<string, { label: string; className: string }> = {
  positive: { label: "Agrees", className: "bg-emerald-50 text-emerald-700" },
  negative: { label: "Disagrees", className: "bg-red-50 text-red-700" },
  divided: { label: "Divided", className: "bg-amber-50 text-amber-700" },
  neutral: { label: "Neutral", className: "bg-slate-100 text-slate-600" },
};

interface SentimentBadgeProps {
  sentiment: string | null;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  if (!sentiment) return null;

  const config = SENTIMENT_CONFIG[sentiment] ?? SENTIMENT_CONFIG.neutral;

  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
