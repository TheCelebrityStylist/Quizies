import type { Metadata } from "next";
import "@/styles/globals.css";
import { getClientEnv } from "@/lib/env";

const clientEnv = getClientEnv();
const siteUrl = clientEnv.ok ? clientEnv.value.NEXT_PUBLIC_SITE_URL : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "QuizOS — Pubquiz software en Kahoot alternatief",
    template: "%s | QuizOS",
  },
  description: "Live pubquiz software met host dashboard, team mode, sponsor slides en wekelijkse quizdrops.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-dvh bg-black text-white antialiased">{children}</body>
    </html>
  );
}
