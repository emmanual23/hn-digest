import { Inbox } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Inbox size={40} strokeWidth={1.5} className="mb-4 text-slate-300" />
      <h2 className="text-lg font-medium text-slate-900">
        No digest available yet
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Today&apos;s digest hasn&apos;t been generated yet. Check back later.
      </p>
    </div>
  );
}
