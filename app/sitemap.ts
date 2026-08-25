import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// One page, so one entry. The sections are anchors on that page, not routes;
// listing them here would only report duplicate URLs to crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
