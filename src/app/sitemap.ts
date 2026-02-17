import type { MetadataRoute } from "next";
import { envClient } from "@/lib/env";
import { quizCatalog } from "@/lib/quiz";
import { nlCities } from "@/lib/seo/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = envClient.NEXT_PUBLIC_SITE_URL;
  const now = new Date();

  return [
    "",
    "/host",
    "/quizzes",
    "/compare/quizmaestro",
    "/builder",
    "/setup-check",
    ...quizCatalog.map((q) => `/quizzes/${q.slug}`),
    ...nlCities.map((city) => `/pubquiz-software/${city.slug}`),
  ].map((path) => ({ url: `${base}${path}`, lastModified: now }));
}
