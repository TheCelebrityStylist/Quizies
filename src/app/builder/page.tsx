"use client";

import { useState } from "react";

const starter = {
  id: "custom-quiz",
  slug: "custom-quiz",
  title: "Custom Quiz",
  subtitle: "MVP Builder",
  description: "Build your own quiz",
  oneOffPriceEur: 0,
  rounds: [
    {
      id: "r1",
      title: "Round 1",
      questions: [
        { id: "q1", prompt: "Vraag?", options: ["A", "B", "C", "D"], correctIndex: 0 },
      ],
    },
  ],
};

export default function BuilderPage() {
  const [json, setJson] = useState(JSON.stringify(starter, null, 2));
  const [message, setMessage] = useState("");

  async function save() {
    const res = await fetch("/api/quizzes/save", { method: "POST", body: json, headers: { "Content-Type": "application/json" } });
    setMessage(res.ok ? "Saved to Redis" : "Invalid quiz JSON");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Quiz builder (MVP)</h1>
      <p className="mt-2 text-white/70">Create rounds/questions in JSON and save to Redis.</p>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} className="mt-5 h-96 w-full rounded-xl bg-black/40 p-4 text-sm ring-1 ring-white/20" />
      <div className="mt-4 flex gap-3">
        <button onClick={save} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">Save quiz</button>
      </div>
      {message ? <p className="mt-3 text-sm text-white/70">{message}</p> : null}
    </main>
  );
}
