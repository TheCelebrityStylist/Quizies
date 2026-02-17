"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { envClient } from "@/lib/env";

type PubState = {
  code: string;
  status: "lobby" | "live" | "finished";
  title: string;
  subtitle: string;
  questionIndex: number;
  questionCount: number;
  currentQuestion: null | { id: string; prompt: string; options: string[] };
  scores: Record<string, number>;
};

export default function ScreenPage() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);

  async function refresh() {
    const res = await fetch(`/api/session/${code}/state`, { cache: "no-store" });
    if (res.ok) setState(await res.json());
  }

  useEffect(() => {
    refresh();
    const p = new Pusher(envClient.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: envClient.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const ch = p.subscribe(`session-${code}`);
    ch.bind("session:update", (data: PubState) => setState(data));
    ch.bind("scores:update", (data: { scores: Record<string, number> }) =>
      setState((s) => (s ? { ...s, scores: data.scores } : s))
    );
    return () => {
      p.unsubscribe(`session-${code}`);
      p.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const top = useMemo(() => {
    const entries = Object.entries(state?.scores ?? {});
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, 8);
  }, [state?.scores]);

  return (
    <main className="min-h-dvh bg-gradient-to-br from-black to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-10 py-10">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-semibold">{state?.title ?? "QuizOS"}</div>
            <div className="text-sm text-white/60">Session {code}</div>
          </div>
          <div className="text-sm text-white/60">
            {state?.status === "live"
              ? `Vraag ${state.questionIndex + 1}/${state.questionCount}`
              : state?.status === "finished"
              ? "Finished"
              : "Lobby"}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl bg-white/5 p-10 ring-1 ring-white/10">
            {state?.status === "lobby" && <div className="text-4xl font-semibold">Waiting to start…</div>}
            {state?.status === "finished" && <div className="text-4xl font-semibold">Final scores</div>}
            {state?.status === "live" && state.currentQuestion && (
              <>
                <div className="text-4xl font-semibold leading-tight">{state.currentQuestion.prompt}</div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {state.currentQuestion.options.map((o, i) => (
                    <div key={i} className="rounded-2xl bg-black/40 p-5 text-xl ring-1 ring-white/10">
                      {o}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white/80">Leaderboard</div>
            <div className="mt-4 space-y-3">
              {top.length === 0 ? (
                <div className="text-white/60">No players yet.</div>
              ) : (
                top.map(([name, score], idx) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3 ring-1 ring-white/10"
                  >
                    <div className="text-white/80">
                      <span className="text-white/50">{idx + 1}.</span> {name}
                    </div>
                    <div className="text-lg font-semibold">{score}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
