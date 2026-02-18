import Link from "next/link";

const faqItems = [
  {
    q: "Wat is een goed Kahoot alternatief voor horeca?",
    a: "QuizOS is gebouwd voor bars en events met hostcontrole, QR-join en groot scherm.",
  },
  { q: "Kan ik een pubquiz maken zonder app?", a: "Ja. Hosts beheren alles in de browser en spelers doen mee via hun telefoonbrowser." },
  { q: "Ondersteunt QuizOS team mode?", a: "Ja, spelers kunnen op teamnaam antwoorden en scores worden per team bijgehouden." },
  { q: "Kan ik quizvragen importeren/exporteren?", a: "Ja, via JSON import/export in de quiz builder." },
];

export default function HomePage() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "QuizOS",
    url: "https://quizos.example",
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "QuizOS",
    url: "https://quizos.example",
    potentialAction: { "@type": "SearchAction", target: "https://quizos.example/quizzes" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/60">QuizMaestro alternative • Pubquiz software</p>
          <h1 className="mt-3 text-5xl font-semibold leading-tight">Run quiz nights that look and feel premium.</h1>
          <p className="mt-4 text-white/70">Start a live demo, browse one-off quizzes, or subscribe for weekly drops.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/host" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">Start demo</Link>
            <Link href="/quizzes" className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold ring-1 ring-white/20">Browse quizzes</Link>
          </div>
          <p className="mt-4 text-sm text-white/60">Used in bars & teams. Built for recurring quiz revenue.</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/60">Big screen preview</div>
              <div className="mt-4 h-36 rounded-lg bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40" />
            </div>
            <div className="rounded-2xl bg-slate-950 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/60">Phone preview</div>
              <div className="mx-auto mt-3 h-36 w-24 rounded-xl border border-white/30 bg-black" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {["Start session", "Players scan QR", "Reveal + next"].map((step, i) => (
          <div key={step} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="animate-pulse text-xs text-white/50">Step {i + 1}</div>
            <h2 className="mt-2 text-lg font-semibold">{step}</h2>
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"><h3 className="font-semibold">One-off quiz</h3><p className="mt-2 text-white/70">€19 per quiz pack</p></div>
        <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/20"><h3 className="font-semibold">Weekly drops</h3><p className="mt-2 text-white/70">€49/mo for recurring hosts</p></div>
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"><h3 className="font-semibold">Venue Pro</h3><p className="mt-2 text-white/70">€99/mo multi-venue toolkit</p></div>
      </section>

      <section className="mt-14 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((item) => (
            <div key={item.q}><p className="font-medium">{item.q}</p><p className="text-sm text-white/70">{item.a}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}
