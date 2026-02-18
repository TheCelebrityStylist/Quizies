import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuizOS vs QuizMaestro",
  description: "Compare live host control, sponsor tools, team mode, and weekly quiz drops.",
  alternates: { canonical: "/compare/quizmaestro" },
};

export default function ComparePage() {
  const rows = [
    ["Live reveal flow", "Yes (question → reveal → next)", "Varies by workflow"],
    ["Sponsor slide between questions", "Built in", "Usually manual"],
    ["Team mode scoring", "Built in", "Limited"],
    ["Quiz import/export JSON", "Built in", "Not always available"],
    ["Weekly subscription positioning", "Core model", "Mostly one-off"],
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-semibold">QuizOS vs QuizMaestro</h1>
      <p className="mt-2 text-white/70">If you run recurring quiz nights, QuizOS is designed for repeat operations and conversion moments.</p>
      <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/10">
            <tr><th className="p-3">Feature</th><th className="p-3">QuizOS</th><th className="p-3">QuizMaestro</th></tr>
          </thead>
          <tbody>
            {rows.map(([f, a, b]) => (
              <tr key={f} className="border-t border-white/10"><td className="p-3">{f}</td><td className="p-3">{a}</td><td className="p-3 text-white/70">{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
