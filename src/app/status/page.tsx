import { getEnvChecks } from "@/lib/env";

export default function StatusPage() {
  const checks = getEnvChecks();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Deploy Status</h1>
      <p className="mt-2 text-white/70">NODE_ENV: {process.env.NODE_ENV ?? "unknown"}</p>
      <p className="mt-4 rounded-lg bg-white/5 p-3 text-sm text-white/80 ring-1 ring-white/10">
        Missing env vars will break live features but should NOT break the homepage.
      </p>
      <ul className="mt-6 space-y-2">
        {Object.entries(checks).map(([key, exists]) => (
          <li key={key} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
            <span>{key}</span>
            <span className={exists ? "text-emerald-300" : "text-amber-300"}>{String(exists)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
