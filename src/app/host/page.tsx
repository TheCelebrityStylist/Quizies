"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HostStart() {
  const [loading, setLoading] = useState(false);
  const r = useRouter();

  async function create() {
    setLoading(true);
    try {
      const res = await fetch("/api/session/create", { method: "POST" });
      const data = (await res.json()) as { code?: string };
      if (!data.code) throw new Error("No code returned");
      r.push(`/host/${data.code}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Start a live quiz</h1>
      <p className="mt-3 text-white/70">This creates a session code for players + a big-screen view.</p>
      <button
        onClick={create}
        disabled={loading}
        className="mt-8 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-60"
      >
        {loading ? "Creating…" : "Create session"}
      </button>
    </main>
  );
}
