import Link from "next/link";

export function CTA() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/host"
        className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
      >
        Start a live quiz (demo)
      </Link>
      <a
        href="#pricing"
        className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
      >
        See pricing
      </a>
    </div>
  );
}
