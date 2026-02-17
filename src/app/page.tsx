import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CTA } from "@/components/CTA";
import { Section } from "@/components/Section";
import { Stat } from "@/components/Stat";

export default function HomePage() {
  return (
    <main>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(700px_circle_at_85%_35%,rgba(255,255,255,0.10),transparent_50%)]" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-8 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <a href="#how" className="hover:text-white">
              How it works
            </a>
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </nav>
          <Link
            href="/host"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Start demo
          </Link>
        </header>

        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
              Live pubquiz software • Kahoot-alternatief • Voor bars & events
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Run quiz nights that feel like a show — not a spreadsheet.
            </h1>
            <p className="mt-5 max-w-2xl text-white/70 sm:text-lg">
              QuizOS is a live quiz engine built for real venues. Players join by QR,
              you control the room, and the big screen stays hype: live scores,
              fast rounds, tie-breakers, weekly fresh quizzes.
            </p>

            <div className="mt-8">
              <CTA />
              <p className="mt-3 text-xs text-white/50">
                Demo uses a short sample quiz. Weekly content + branding are in paid plans.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Stat k="Setup time" v="&lt; 2 min" />
            <Stat k="Players" v="Unlimited" />
            <Stat k="Works on" v="Any phone" />
          </div>
        </section>
      </div>

      <Section title="How it works" subtitle="No Kahoot accounts, no file downloads, no fragile setup.">
        <div id="how" className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">1) Start a session</div>
            <p className="mt-2 text-sm text-white/70">
              Click “Start demo” to create a join code. Open the big-screen page.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">2) Players join by QR</div>
            <p className="mt-2 text-sm text-white/70">No app. No logins. Just scan and play.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">3) You control the energy</div>
            <p className="mt-2 text-sm text-white/70">
              Start, skip, speed up. Tie-breakers and live scoring keep it exciting.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Built for venues that want repeat revenue"
        subtitle="QuizMaestro sells one-off quizzes. QuizOS sells a weekly experience you can run forever."
      >
        <div id="features" className="grid gap-4 md:grid-cols-2">
          {[
            ["Live host control", "Skip/next, pace control, instant resets. No dead air."],
            ["Big-screen mode", "Leaderboard + question screen designed for venues."],
            ["Weekly fresh quizzes", "Never repeat the same night unless you want to."],
            ["Engagement first", "Fast answers, visible momentum, satisfying reveals."],
            ["Branding & sponsors", "Add a sponsor round, voucher, or CTA (paid)."],
            ["Simple by design", "Works even if your Wi‑Fi is ‘bar Wi‑Fi’."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-base font-semibold text-white">{t}</div>
              <p className="mt-2 text-sm text-white/70">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Pricing" subtitle="Start small. Scale to multiple venues later.">
        <div id="pricing" className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">Starter</div>
            <div className="mt-2 text-3xl font-semibold">
              €29<span className="text-base text-white/60">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• 1 weekly quiz drop</li>
              <li>• Live host + big-screen</li>
              <li>• Unlimited players</li>
            </ul>
            <Link
              href="/host"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Run demo
            </Link>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/20">
            <div className="text-sm font-semibold text-white">Growth</div>
            <div className="mt-2 text-3xl font-semibold">
              €59<span className="text-base text-white/60">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Unlimited quiz nights</li>
              <li>• Branding</li>
              <li>• Theme packs</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Coming next
            </a>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white">Venue Pro</div>
            <div className="mt-2 text-3xl font-semibold">
              €99<span className="text-base text-white/60">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Sponsorship tools</li>
              <li>• Email capture</li>
              <li>• Multi-venue admin</li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              Coming next
            </a>
          </div>
        </div>
      </Section>

      <footer className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Ready to run a real quiz night?</div>
              <div className="mt-1 text-sm text-white/70">
                Start the demo, open big-screen mode, and test it with friends in 5 minutes.
              </div>
            </div>
            <Link
              href="/host"
              className="inline-flex justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Start demo
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
