import type { Metadata } from "next";
import "@/styles/globals.css";
import { envClient } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(envClient.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "QuizOS — Pubquiz software en Kahoot alternatief",
    template: "%s | QuizOS",
  },
  description: "Live pubquiz software met host dashboard, team mode, sponsor slides en wekelijkse quizdrops.",
  keywords: ["pubquiz software", "kahoot alternatief", "quiz maken", "team quiz"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "QuizOS — Live pubquiz software",
    description: "QR join, reveal flow, live scoreboard en sponsor momenten.",
    url: "/",
    siteName: "QuizOS",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizOS — Live pubquiz software",
    description: "Host quiz nights with reveal flow, team mode and sponsor slides.",
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
