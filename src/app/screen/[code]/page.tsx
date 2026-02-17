"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { envClient } from "@/lib/env";

type PubState = {
  title: string;
  status: "lobby" | "live" | "finished";
  phase: "question" | "reveal" | "sponsor";
  tieBreakerActive: boolean;
  questionIndex: number;
  questionCount: number;
  currentQuestion: null | { prompt: string; options: string[]; correctIndex: number | null; sponsorSlide: null | { title: string; cta: string } };
  scores: Record<string, number>;
};

export default function ScreenPage() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);

  useEffect(() => {
    fetch(`/api/session/${code}/state`, { cache: "no-store" }).then(async (res) => res.ok && setState(await res.json()));
    const p = new Pusher(envClient.NEXT_PUBLIC_PUSHER_KEY, { cluster: envClient.NEXT_PUBLIC_PUSHER_CLUSTER });
    const ch = p.subscribe(`session-${code}`);
    ch.bind("session:update", (data: PubState) => setState(data));
    ch.bind("scores:update", (data: { scores: Record<string, number> }) => setState((s) => (s ? { ...s, scores: data.scores } : s)));
    return () => { p.unsubscribe(`session-${code}`); p.disconnect(); };
  }, [code]);

  const top = useMemo(() => Object.entries(state?.scores ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 8), [state?.scores]);

  return (
    <main className="min-h-dvh bg-gradient-to-br from-black to-slate-950 p-8 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
        <section className="lg:col-span-3 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
          <p className="text-sm text-white/60">{state?.title} · {state?.tieBreakerActive ? "Tie-breaker" : `Vraag ${(state?.questionIndex ?? 0) + 1}/${state?.questionCount ?? 0}`}</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">{state?.currentQuestion?.prompt ?? "Wachten op host"}</h1>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {state?.currentQuestion?.options.map((o, i) => (
              <div key={o} className={`rounded-2xl p-5 text-2xl ring-1 ${state.currentQuestion?.correctIndex === i ? "bg-emerald-500/25 ring-emerald-300/50" : "bg-black/40 ring-white/10"}`}>
                {o}
              </div>
            ))}
          </div>
          {state?.phase === "reveal" && state.currentQuestion?.sponsorSlide ? (
            <div className="mt-8 rounded-2xl bg-indigo-500/20 p-5 ring-1 ring-indigo-300/30"><p className="text-sm">{state.currentQuestion.sponsorSlide.title}</p><p className="text-xl font-semibold">{state.currentQuestion.sponsorSlide.cta}</p></div>
          ) : null}
        </section>
        <aside className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <div className="mt-4 space-y-2">{top.map(([name, score]) => <div key={name} className="flex justify-between rounded-xl bg-black/40 px-3 py-2"><span>{name}</span><span>{score}</span></div>)}</div>
        </aside>
      </div>
    </main>
  );
}
