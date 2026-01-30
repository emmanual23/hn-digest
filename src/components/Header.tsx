import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          HN Digest
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Today
          </Link>
          <Link
            href="/archive"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}
