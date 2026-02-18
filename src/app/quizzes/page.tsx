import Link from "next/link";
import type { Metadata } from "next";
import { quizCatalog } from "@/lib/quiz";

export const metadata: Metadata = {
  title: "Quiz catalog",
  description: "Browse ready-to-host pubquiz packs. Buy one-off quizzes or subscribe for weekly drops.",
  alternates: { canonical: "/quizzes" },
};

export default function QuizzesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-semibold">Quiz catalog</h1>
      <p className="mt-2 text-white/70">One-off quiz purchases plus subscription-ready weekly drops.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {quizCatalog.map((quiz) => (
          <article key={quiz.id} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-2xl font-semibold">{quiz.title}</h2>
            <p className="mt-2 text-sm text-white/70">{quiz.description}</p>
            <p className="mt-4 text-sm text-white/80">One-off: €{quiz.oneOffPriceEur}</p>
            <div className="mt-4 flex gap-3">
              <Link href={`/quizzes/${quiz.slug}`} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">
                View details
              </Link>
              <Link href="/host" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                Start demo
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
