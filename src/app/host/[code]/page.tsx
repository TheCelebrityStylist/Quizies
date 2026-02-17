"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { envClient } from "@/lib/env";
import { QRJoin } from "@/components/QRJoin";

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

export default function HostPanel() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<PubState | null>(null);

  const joinUrl = useMemo(() => `${envClient.NEXT_PUBLIC_SITE_URL}/play/${code}`, [code]);
  const screenUrl = useMemo(() => `${envClient.NEXT_PUBLIC_SITE_URL}/screen/${code}`, [code]);

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

  async function start() {
    await fetch(`/api/session/${code}/start`, { method: "POST" });
  }
  async function next() {
    await fetch(`/api/session/${code}/next`, { method: "POST" });
  }

  const top = useMemo(() => {
    const entries = Object.entries(state?.scores ?? {});
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, 10);
  }, [state?.scores]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Host dashboard</h1>
          <p className="mt-2 text-white/70">
            Session <span className="font-semibold text-white">{code}</span>
          </p>
          <p className="mt-2 text-sm text-white/60">
            Big screen:{" "}
            <a className="underline" href={screenUrl} target="_blank" rel="noreferrer">
              open
            </a>
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={start}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Start
            </button>
            <button
              onClick={next}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              Next
            </button>
            <button
              onClick={refresh}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              Refresh
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">Current</div>
            <div className="mt-2 text-white/80">
              {state?.status === "lobby" && "Lobby — waiting to start"}
              {state?.status === "finished" && "Finished"}
              {state?.status === "live" && state.currentQuestion?.prompt}
            </div>

            {state?.status === "live" && state.currentQuestion ? (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {state.currentQuestion.options.map((o, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-black/40 p-3 text-sm text-white/80 ring-1 ring-white/10"
                  >
                    {o}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-4 text-xs text-white/60">
              Progress: {Math.max(0, (state?.questionIndex ?? -1) + 1)}/{state?.questionCount ?? 0}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <QRJoin url={joinUrl} />
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">Join URL</div>
            <div className="mt-2 break-all text-xs text-white/70">{joinUrl}</div>
          </div>

          <div className="w-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">Top players</div>
            <div className="mt-3 space-y-2">
              {top.length === 0 ? (
                <div className="text-sm text-white/60">No players yet.</div>
              ) : (
                top.map(([name, score], idx) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <div className="text-white/80">
                      {idx + 1}. {name}
                    </div>
                    <div className="font-semibold text-white">{score}</div>
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
