import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// Makes the site installable and gives Android/Chrome a branded splash and
// home-screen icon instead of a screenshot of the page.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.role}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05060a",
    theme_color: "#05060a",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
