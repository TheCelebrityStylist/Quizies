"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { getClientEnv } from "@/lib/env";
import { QRJoin } from "@/components/QRJoin";

type PubState = {
  code: string;
  status: "lobby" | "live" | "finished";
  phase: "question" | "reveal" | "sponsor";
  tieBreakerActive: boolean;
  teamMode: boolean;
  title: string;
  currentQuestion: null | { id: string; prompt: string; options: string[]; correctIndex: number | null };
  scores: Record<string, number>;
};

export default function HostPanel() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);
  const env = useMemo(() => getClientEnv(), []);

  const joinUrl = `${env.ok ? env.value.NEXT_PUBLIC_SITE_URL : "http://localhost:3000"}/play/${code}`;

  useEffect(() => {
    void fetch(`/api/session/${code}/state`, { cache: "no-store" }).then(async (res) => {
      if (res.ok) setState(await res.json());
    });

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

  async function action(path: string, payload?: unknown) {
    await fetch(`/api/session/${code}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload ? JSON.stringify(payload) : undefined,
    });
  }

  const top = Object.entries(state?.scores ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 10);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Host dashboard · {code}</h1>
      {!env.ok ? <p className="mt-3 rounded-lg bg-amber-500/15 p-3 text-sm text-amber-200">Realtime env vars are missing. Live updates are disabled, but the page still works.</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => action("start")} className="rounded-lg bg-white px-4 py-2 text-black">Start</button>
        <button onClick={() => action("reveal")} className="rounded-lg bg-white/10 px-4 py-2 ring-1 ring-white/20">Reveal answer</button>
        <button onClick={() => action("next")} className="rounded-lg bg-white/10 px-4 py-2 ring-1 ring-white/20">Next question</button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <p className="text-sm text-white/60">{state?.status} · {state?.phase}</p>
          <h2 className="mt-2 text-xl font-semibold">{state?.currentQuestion?.prompt ?? "Waiting"}</h2>
        </div>
        <div className="space-y-4">
          <QRJoin url={joinUrl} />
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-sm font-semibold">Top scores</div>
            <div className="mt-3 space-y-2 text-sm">{top.map(([name, score]) => <div key={name} className="flex justify-between"><span>{name}</span><span>{score}</span></div>)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
