"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { getClientEnv } from "@/lib/env";

type PubState = {
  title: string;
  status: "lobby" | "live" | "finished";
  questionIndex: number;
  questionCount: number;
  currentQuestion: null | { prompt: string; options: string[] };
  scores: Record<string, number>;
};

export default function ScreenPage() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);
  const env = useMemo(() => getClientEnv(), []);

  useEffect(() => {
    void fetch(`/api/session/${code}/state`, { cache: "no-store" }).then(async (res) => res.ok && setState(await res.json()));
    if (!env.ok) return;

    const p = new Pusher(env.value.NEXT_PUBLIC_PUSHER_KEY, { cluster: env.value.NEXT_PUBLIC_PUSHER_CLUSTER });
    const ch = p.subscribe(`session-${code}`);
    ch.bind("session:update", (data: PubState) => setState(data));
    ch.bind("scores:update", (data: { scores: Record<string, number> }) => setState((s) => (s ? { ...s, scores: data.scores } : s)));
    return () => {
      p.unsubscribe(`session-${code}`);
      p.disconnect();
    };
  }, [code, env]);

  const top = useMemo(() => Object.entries(state?.scores ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 8), [state?.scores]);

  return (
    <main className="min-h-dvh bg-gradient-to-br from-black to-slate-950 p-8 text-white">
      {!env.ok ? <p className="mx-auto mb-4 max-w-7xl rounded-lg bg-amber-500/15 p-3 text-sm text-amber-200">Realtime env vars are missing. Screen is in fallback mode.</p> : null}
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
        <section className="lg:col-span-3 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
          <p className="text-sm text-white/60">{state?.title} · Vraag {(state?.questionIndex ?? 0) + 1}/{state?.questionCount ?? 0}</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">{state?.currentQuestion?.prompt ?? "Wachten op host"}</h1>
        </section>
        <aside className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <div className="mt-4 space-y-2">{top.map(([name, score]) => <div key={name} className="flex justify-between rounded-xl bg-black/40 px-3 py-2"><span>{name}</span><span>{score}</span></div>)}</div>
        </aside>
      </div>
    </main>
  );
}
