import type { MetadataRoute } from "next";
import { insurances } from "@/config/insurances";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...insurances.map((i) => ({ url: `${site.url}/seguros/${i.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
