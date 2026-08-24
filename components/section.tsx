import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  /** Folio number printed before the section name, e.g. "II". */
  folio: string;
  label: string;
  title: string;
  /** Optional standfirst beneath the section title. */
  lede?: string;
  children: ReactNode;
  className?: string;
};

/** A ruled section opening, set like the head of a chapter. */
export function Section({
  id,
  folio,
  label,
  title,
  lede,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative z-10 px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="ornament label lining mb-10 text-ink-faint">
            <span className="shrink-0">
              <span className="text-accent">{folio}</span>
              <span className="mx-2 text-rule-strong">·</span>
              {label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="font-display emboss text-balance text-4xl leading-[1.1] text-display-ink sm:text-5xl">
            {title}
          </h2>
        </Reveal>

        {lede ? (
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-muted">{lede}</p>
          </Reveal>
        ) : null}

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
