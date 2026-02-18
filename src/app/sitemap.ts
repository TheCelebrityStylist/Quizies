import type { MetadataRoute } from "next";
import { getClientEnv } from "@/lib/env";
import { quizCatalog } from "@/lib/quiz";
import { nlCities } from "@/lib/seo/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const env = getClientEnv();
  const base = env.ok ? env.value.NEXT_PUBLIC_SITE_URL : "http://localhost:3000";
  const now = new Date();

  return [
    "",
    "/host",
    "/quizzes",
    "/compare/quizmaestro",
    "/builder",
    "/setup-check",
    "/status",
    ...quizCatalog.map((q) => `/quizzes/${q.slug}`),
    ...nlCities.map((city) => `/pubquiz-software/${city.slug}`),
  ].map((path) => ({ url: `${base}${path}`, lastModified: now }));
}
