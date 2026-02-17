import type { MetadataRoute } from "next";
import { envClient } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = envClient.NEXT_PUBLIC_SITE_URL;
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/host`, lastModified: new Date() },
  ];
}
