import { about } from "@/content/site";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" folio="I" label="Colophon" title="About the work">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-7">
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 80}>
              <p
                className={
                  index === 0
                    ? "text-pretty text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-accent"
                    : "text-pretty leading-relaxed text-ink-soft"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <div className="mx-auto max-w-sm lg:mx-0 lg:max-w-none">
            <Portrait />
          </div>

          {about.pullQuote ? (
            <figure className="mt-10 border-l-2 border-navy bg-paper-raised/60 px-7 py-8 shadow-[var(--card-shadow)]">
              <blockquote className="font-display text-balance text-2xl italic leading-snug text-ink">
                “{about.pullQuote.text}”
              </blockquote>
              <figcaption className="label mt-5 text-ink-faint">
                {about.pullQuote.attribution}
              </figcaption>
            </figure>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
