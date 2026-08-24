import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f4efe3";
const INK = "#1f1b16";
const INK_MUTED = "#5d5449";
const RULE = "#cec3ad";
const ACCENT = "#7b2d26";
/** Matches --navy in globals.css, sampled from the portrait. */
const NAVY = "#123660";

const FONT_FAMILY = "EB Garamond";

/**
 * Fetches the display face as TTF at build time. The card is prerendered, so
 * this runs once during `next build`; if the network is unavailable the card
 * still renders in the generator's default face rather than failing the build.
 */
async function loadDisplayFont() {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(FONT_FAMILY)}:wght@400;600`,
      {
        // An older UA makes Google serve TTF, which the image generator can read.
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:1.0) Gecko/20100101 Firefox/1.0",
        },
      },
    ).then((res) => res.text());

    const urls = [
      ...css.matchAll(/src:\s*url\((https:[^)]+)\)\s*format\('(?:truetype|opentype)'\)/g),
    ].map((match) => match[1]);

    if (urls.length === 0) return [];

    const weights = [400, 600] as const;
    const faces = await Promise.all(
      urls.slice(0, 2).map(async (url, index) => ({
        name: FONT_FAMILY,
        data: await fetch(url).then((res) => res.arrayBuffer()),
        weight: weights[index] ?? 400,
        style: "normal" as const,
      })),
    );
    return faces;
  } catch {
    return [];
  }
}

/** The share card, set like a title page. */
export default async function OpenGraphImage() {
  const fonts = await loadDisplayFont();
  const domain = site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "64px 72px",
          border: `2px solid ${ACCENT}`,
          fontFamily: FONT_FAMILY,
        }}
      >
        {/* Running head */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: INK_MUTED,
            borderBottom: `1px solid ${RULE}`,
            paddingBottom: 24,
          }}
        >
          <span>Portfolio</span>
          <span>Est. {site.graduationYear}</span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: NAVY,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>

          <div style={{ display: "flex", marginTop: 32, height: 2, background: RULE }} />

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            {site.role}
          </div>
        </div>

        {/* Foot */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 24,
            fontSize: 24,
            color: INK_MUTED,
          }}
        >
          <span>{domain}</span>
          <span style={{ letterSpacing: 4, color: INK }}>{site.monogram}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
