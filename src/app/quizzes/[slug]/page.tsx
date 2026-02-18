import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuizBySlug } from "@/lib/quiz";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return { title: "Quiz not found" };
  return {
    title: `${quiz.title} | Quiz pack`,
    description: quiz.description,
    alternates: { canonical: `/quizzes/${quiz.slug}` },
  };
}

export default async function QuizDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: quiz.title,
    description: quiz.description,
    brand: { "@type": "Brand", name: "QuizOS" },
    offers: { "@type": "Offer", priceCurrency: "EUR", price: quiz.oneOffPriceEur, availability: "https://schema.org/InStock" },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <h1 className="text-4xl font-semibold">{quiz.title}</h1>
      <p className="mt-3 text-white/70">{quiz.description}</p>
      <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
        <p>One-off purchase: €{quiz.oneOffPriceEur}</p>
        <p className="text-white/70">Subscription option: weekly drops for returning quiz nights.</p>
      </div>
    </main>
  );
}
