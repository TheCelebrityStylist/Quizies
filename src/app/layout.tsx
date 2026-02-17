import type { Metadata } from "next";
import "@/styles/globals.css";
import { envClient } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(envClient.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "QuizOS — Live pubquiz software (Kahoot-alternatief)",
    template: "%s | QuizOS",
  },
  description:
    "Run high-energy quiz nights without Kahoot. QR join, live leaderboard, host control, weekly fresh quizzes. Built for bars, teams and events.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "QuizOS — Live pubquiz software (Kahoot-alternatief)",
    description:
      "QR join. Live scoring. Host control. Weekly fresh quizzes. Make quiz nights effortless — and repeatable revenue.",
    url: "/",
    siteName: "QuizOS",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizOS — Live pubquiz software",
    description: "QR join. Live scoring. Host control. Weekly fresh quizzes.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-dvh bg-black text-white antialiased">{children}</body>
    </html>
  );
}
