import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, nlCities } from "@/lib/seo/cities";

export function generateStaticParams() {
  return nlCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return { title: "City not found" };
  return {
    title: `Pubquiz software ${data.name}`,
    description: `Run high-energy pubquiz nights in ${data.name} with QR join, live host control and sponsor-ready rounds.`,
    alternates: { canonical: `/pubquiz-software/${data.slug}` },
  };
}

export default async function CityLandingPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Is dit een goed kahoot alternatief in ${data.name}?`, acceptedAnswer: { "@type": "Answer", text: "Ja, QuizOS werkt zonder app met QR-join en hostcontrole voor echte locaties." } },
      { "@type": "Question", name: "Kan ik zelf een quiz maken?", acceptedAnswer: { "@type": "Answer", text: "Ja, met de JSON-builder maak en importeer je eigen rondes en vragen." } },
      { "@type": "Question", name: "Werkt dit voor pubquiz software met teams?", acceptedAnswer: { "@type": "Answer", text: "Ja, team mode telt scores op teamniveau voor bars en bedrijfsavonden." } },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <h1 className="text-4xl font-semibold">Pubquiz software in {data.name}</h1>
      <p className="mt-3 text-white/70">Speciaal voor {data.angle}. Draai quizavonden met live reveal, sponsor-CTA en teamscore.</p>
    </main>
  );
}
