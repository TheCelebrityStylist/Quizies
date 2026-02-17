export function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-2xl font-semibold text-white">{v}</div>
      <div className="mt-1 text-sm text-white/70">{k}</div>
    </div>
  );
}
