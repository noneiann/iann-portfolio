import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/SmoothScroll";
import { EXPERIENCE, SITE, SKILL_GROUPS, SOCIALS } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const TITLE = `${SITE.name} — ${SITE.role}`;

export const metadata: Metadata = {
  // Anchors every relative URL below (and the generated OG/Twitter images) to
  // the real origin, so crawlers and link unfurlers get absolute URLs.
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    // Any future route can set a bare title and still get the name appended.
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    SITE.name,
    "software engineer",
    "full-stack developer",
    "Next.js developer",
    "React Native developer",
    "computer vision",
    "machine learning",
    "portfolio",
    "Iligan City",
    "Philippines",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: SITE.name,
    title: TITLE,
    description: SITE.description,
    url: SITE.url,
    locale: "en_US",
    firstName: "Rey Iann",
    lastName: "Tigley",
    username: "noneiann",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google show the full-size OG image and an untruncated snippet
      // instead of its conservative defaults.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  // Paints the browser chrome (mobile Safari/Chrome) to match the page instead
  // of leaving a white bar above a near-black site.
  themeColor: "#05060a",
  colorScheme: "dark",
};

/**
 * schema.org Person, so search engines can attach the name, role, employer and
 * profile links to a knowledge-panel entity rather than guessing from the copy.
 * Built from the same content module the page renders, so it cannot go stale.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: SITE.initials,
  url: SITE.url,
  image: `${SITE.url}/opengraph-image`,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iligan City",
    addressCountry: "PH",
  },
  worksFor: [
    ...new Set(EXPERIENCE.map((role) => role.company)),
  ].map((name) => ({ "@type": "Organization", name })),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mindanao State University — Iligan Institute of Technology",
  },
  knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
  // Only real profile URLs belong in sameAs; placeholder hrefs would point
  // crawlers back at the page itself.
  sameAs: SOCIALS.map((social) => social.href).filter((href) =>
    href.startsWith("http"),
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Framer Motion server-renders every reveal target with an inline
            `opacity:0`, and only clears it once the client animation runs. With
            scripting off, that never happens and the page paints blank — the
            copy is in the DOM (so text-only crawlers still read it) but nothing
            is visible. This restores the content wrapper; the fixed nav and the
            section rail are deliberately left out, since they stay aria-hidden
            until scrolled and their links duplicate the page anchors. */}
        <noscript>
          <style>{`main > div [style*="opacity:0"] {
  opacity: 1 !important;
  transform: none !important;
}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
