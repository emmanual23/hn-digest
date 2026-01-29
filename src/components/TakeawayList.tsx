import { Takeaway } from "@/types/digest";

const TYPE_STYLES: Record<Takeaway["type"], string> = {
  consensus: "bg-emerald-50 text-emerald-700",
  counterpoint: "bg-amber-50 text-amber-700",
  insight: "bg-slate-100 text-slate-700",
};

const TYPE_LABELS: Record<Takeaway["type"], string> = {
  consensus: "Consensus",
  counterpoint: "Counterpoint",
  insight: "Insight",
};

interface TakeawayListProps {
  takeaways: Takeaway[];
}

export function TakeawayList({ takeaways }: TakeawayListProps) {
  if (takeaways.length === 0) return null;

  return (
    <ul className="space-y-3">
      {takeaways.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span
            className={`mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-xs font-medium ${TYPE_STYLES[t.type]}`}
          >
            {TYPE_LABELS[t.type]}
          </span>
          <span className="text-sm leading-relaxed text-slate-700">
            {t.point}
          </span>
        </li>
      ))}
    </ul>
  );
}
