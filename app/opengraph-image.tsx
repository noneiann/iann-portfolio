import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Sampled from globals.css so the card and the site cannot drift apart. */
const BACKGROUND = "#05060a";
const FOREGROUND = "#ededed";
const ACCENT = "#8ea2ff";
const MUTED = "rgba(237,237,237,0.45)";
const HAIRLINE = "rgba(237,237,237,0.14)";

const DISPLAY = "Archivo";

/**
 * Pulls Archivo as TTF at build time — the same face `next/font` serves to the
 * page, so the card is set in the site's own type. The card is prerendered, so
 * this runs once during `next build`; if the network is unavailable the card
 * still renders in the generator's default face rather than failing the build.
 */
async function loadDisplayFont() {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${DISPLAY}:wght@400;600`,
      {
        // An older UA makes Google serve TTF, which the image generator can read.
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; rv:1.0) Gecko/20100101 Firefox/1.0",
        },
      },
    ).then((res) => res.text());

    const urls = [
      ...css.matchAll(
        /src:\s*url\((https:[^)]+)\)\s*format\('(?:truetype|opentype)'\)/g,
      ),
    ].map((match) => match[1]);

    if (urls.length === 0) return [];

    const weights = [400, 600] as const;
    return await Promise.all(
      urls.slice(0, 2).map(async (url, index) => ({
        name: DISPLAY,
        data: await fetch(url).then((res) => res.arrayBuffer()),
        weight: weights[index] ?? 400,
        style: "normal" as const,
      })),
    );
  } catch {
    return [];
  }
}

/** Shared by the Twitter card, which re-exports this module. */
export default async function OpenGraphImage() {
  const fonts = await loadDisplayFont();
  const domain = SITE.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          padding: "72px 80px",
          fontFamily: DISPLAY,
          position: "relative",
        }}
      >
        {/* The hero's edge scrim, flattened into a single pass the image
            generator can draw. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(135deg, rgba(142,162,255,0.16) 0%, rgba(5,6,10,0) 55%)",
          }}
        />

        {/* Running head — the site's mono eyebrow, letter-spaced the same way. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 7,
            textTransform: "uppercase",
            color: MUTED,
            borderBottom: `1px solid ${HAIRLINE}`,
            paddingBottom: 28,
          }}
        >
          <span>Portfolio</span>
          <span>
            {SITE.location} · {SITE.timezone}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 600,
              letterSpacing: -3,
              textTransform: "uppercase",
              color: FOREGROUND,
              lineHeight: 1.02,
            }}
          >
            {SITE.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 760,
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        {/* Foot — accent rule echoing the favicon, then the site's dividers. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 3, background: ACCENT, width: 120 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 28,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>{domain}</span>
            <span style={{ color: ACCENT }}>{SITE.availability}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
