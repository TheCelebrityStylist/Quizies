"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quizCatalog } from "@/lib/quiz";

export default function HostStart() {
  const [loading, setLoading] = useState(false);
  const [quizSlug, setQuizSlug] = useState(quizCatalog[0].slug);
  const [teamMode, setTeamMode] = useState(false);
  const r = useRouter();

  async function create() {
    setLoading(true);
    try {
      const res = await fetch("/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizSlug, teamMode }),
      });
      const data = (await res.json()) as { code?: string };
      if (data.code) r.push(`/host/${data.code}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Start a live quiz session</h1>
      <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
        <label className="text-sm">Quiz pack</label>
        <select value={quizSlug} onChange={(e) => setQuizSlug(e.target.value)} className="mt-2 w-full rounded-lg bg-black/40 p-3">
          {quizCatalog.map((quiz) => <option key={quiz.slug} value={quiz.slug}>{quiz.title}</option>)}
        </select>
        <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={teamMode} onChange={(e) => setTeamMode(e.target.checked)} /> Team mode</label>
      </div>
      <button onClick={create} disabled={loading} className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">{loading ? "Creating…" : "Create session"}</button>
      <div className="mt-6 flex gap-4 text-sm text-white/70"><Link href="/quizzes" className="underline">Browse quizzes</Link><Link href="/builder" className="underline">Open builder</Link></div>
    </main>
  );
}
