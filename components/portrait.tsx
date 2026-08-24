import Image from "next/image";
import portrait from "@/public/portrait.png";
import { about, site } from "@/content/site";

/**
 * The portrait is a cut-out mounted on the paper and printed as warm
 * monochrome (see `.portrait-plate` in globals.css), so it reads as an
 * archival plate rather than a colour photograph dropped onto the page.
 */
export function Portrait() {
  return (
    <figure>
      <div className="portrait-plate border border-navy/35 bg-paper-raised p-3 shadow-[var(--card-shadow)]">
        <Image
          src={portrait}
          alt={about.portrait.alt}
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 88vw"
          placeholder="blur"
          className="h-auto w-full"
        />
      </div>

      <figcaption className="label mt-3 flex items-baseline justify-between gap-4 text-ink-faint">
        <span>{site.name}</span>
        <span className="text-right">{about.portrait.caption}</span>
      </figcaption>
    </figure>
  );
}
