import { getEnvChecks } from "@/lib/env";

export default function SetupCheckPage() {
  const checks = getEnvChecks();
  const ok = Object.values(checks).every(Boolean);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Startup self-check</h1>
      <p className="mt-2 text-white/70">Use this page after deploy to verify required environment variables.</p>
      <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
        <div className="text-sm font-semibold">Status: {ok ? "Ready" : "Missing configuration"}</div>
        <ul className="mt-3 space-y-2 text-sm">
          {Object.entries(checks).map(([key, isSet]) => (
            <li key={key} className="flex items-center justify-between">
              <span className="text-white/80">{key}</span>
              <span className={isSet ? "text-emerald-300" : "text-amber-300"}>{isSet ? "set" : "missing"}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
