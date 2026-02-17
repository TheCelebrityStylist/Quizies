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

export default function PlayPage() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);
  const [name, setName] = useState("");
  const [locked, setLocked] = useState(false);
  const [lastQ, setLastQ] = useState<string | null>(null);

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
    ch.bind("session:update", (data: PubState) => {
      setState(data);
      setLocked(false);
      setLastQ(data.currentQuestion?.id ?? null);
    });
    ch.bind("scores:update", (data: { scores: Record<string, number> }) =>
      setState((s) => (s ? { ...s, scores: data.scores } : s))
    );
    return () => {
      p.unsubscribe(`session-${code}`);
      p.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const myScore = useMemo(() => (name ? state?.scores?.[name] ?? 0 : 0), [name, state]);

  async function answer(choiceIndex: number) {
    if (!name.trim()) return;
    if (!state?.currentQuestion) return;
    if (locked) return;

    setLocked(true);
    await fetch(`/api/session/${code}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), choiceIndex }),
    });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <div className="text-sm font-semibold text-white">QuizOS</div>
        <div className="mt-1 text-xs text-white/60">Session {code}</div>

        <div className="mt-6">
          <label className="text-sm text-white/70">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Elke"
            className="mt-2 w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/40"
          />
          <div className="mt-2 text-xs text-white/50">Score: {myScore}</div>
        </div>

        <div className="mt-8">
          {state?.status === "lobby" && <div className="text-white/70">Waiting for the host to start…</div>}
          {state?.status === "finished" && <div className="text-white/70">Quiz finished. Thanks for playing.</div>}

          {state?.status === "live" && state.currentQuestion && (
            <>
              <div className="text-base font-semibold text-white">{state.currentQuestion.prompt}</div>
              <div className="mt-4 grid gap-2">
                {state.currentQuestion.options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={locked || !name.trim() || lastQ !== state.currentQuestion?.id}
                    className="rounded-xl bg-white/10 px-4 py-3 text-left text-sm text-white ring-1 ring-white/15 hover:bg-white/15 disabled:opacity-50"
                  >
                    {o}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-white/50">
                Progress: {state.questionIndex + 1}/{state.questionCount}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
