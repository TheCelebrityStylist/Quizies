"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { getClientEnv } from "@/lib/env";

type PubState = {
  status: "lobby" | "live" | "finished";
  phase: "question" | "reveal" | "sponsor";
  teamMode: boolean;
  currentQuestion: null | { id: string; prompt: string; options: string[] };
  scores: Record<string, number>;
};

export default function PlayPage() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [locked, setLocked] = useState(false);
  const env = useMemo(() => getClientEnv(), []);

  useEffect(() => {
    void fetch(`/api/session/${code}/state`, { cache: "no-store" }).then(async (res) => res.ok && setState(await res.json()));
    if (!env.ok) return;

    const p = new Pusher(env.value.NEXT_PUBLIC_PUSHER_KEY, { cluster: env.value.NEXT_PUBLIC_PUSHER_CLUSTER });
    const ch = p.subscribe(`session-${code}`);
    ch.bind("session:update", (data: PubState) => {
      setState(data);
      if (data.phase === "question") setLocked(false);
    });
    ch.bind("scores:update", (data: { scores: Record<string, number> }) => setState((s) => (s ? { ...s, scores: data.scores } : s)));
    return () => {
      p.unsubscribe(`session-${code}`);
      p.disconnect();
    };
  }, [code, env]);

  const myScore = useMemo(() => {
    if (!state) return 0;
    const key = state.teamMode && teamName.trim() ? `Team: ${teamName.trim()}` : name.trim();
    return state.scores[key] ?? 0;
  }, [state, name, teamName]);

  async function answer(choiceIndex: number) {
    if (!state?.currentQuestion || locked || !name.trim()) return;
    setLocked(true);
    await fetch(`/api/session/${code}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), teamName: teamName.trim(), choiceIndex }),
    });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      {!env.ok ? <p className="mb-3 rounded-lg bg-amber-500/15 p-3 text-sm text-amber-200">Realtime env vars are missing. Answers may not update live.</p> : null}
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-lg bg-black/40 p-3" />
        {state?.teamMode ? <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team name" className="mt-2 w-full rounded-lg bg-black/40 p-3" /> : null}
        <p className="mt-2 text-xs text-white/60">Score: {myScore}</p>
        {state?.status === "live" && state.currentQuestion ? (
          <div className="mt-4 grid gap-2">{state.currentQuestion.options.map((o, i) => <button key={o} onClick={() => answer(i)} disabled={locked} className="rounded-lg bg-white/10 p-3 text-left">{o}</button>)}</div>
        ) : null}
      </div>
    </main>
  );
}
