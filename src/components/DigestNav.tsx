import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DigestNavProps {
  currentDate: string;
  previousDate: string | null;
  nextDate: string | null;
}

export function DigestNav({ currentDate, previousDate, nextDate }: DigestNavProps) {
  const today = new Date().toISOString().split("T")[0];
  const isToday = currentDate === today;

  return (
    <nav className="flex items-center justify-between">
      {previousDate ? (
        <Link
          href={`/digest/${previousDate}`}
          className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-700"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
          Previous
        </Link>
      ) : (
        <span />
      )}

      {nextDate ? (
        <Link
          href={isToday ? "/" : `/digest/${nextDate}`}
          className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-700"
        >
          Next
          <ChevronRight size={16} strokeWidth={1.5} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
