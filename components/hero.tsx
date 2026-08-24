import { hero, site } from "@/content/site";
import { Reveal } from "@/components/reveal";

/** The title page: name set large, rules above and below, a small statistics plate. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[92svh] flex-col justify-center px-6 pb-20 pt-28 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Running head */}
        <Reveal>
          <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-rule pb-4 text-ink-faint">
            <span>{hero.eyebrow}</span>
            <span className="text-right">{site.location}</span>
          </div>
        </Reveal>

        {/* Name */}
        <Reveal delay={80}>
          <h1 className="mt-10 sm:mt-14">
            <span className="sr-only">{site.name}</span>
            <span
              aria-hidden="true"
              className="font-display emboss block text-balance text-[clamp(2.75rem,10vw,7rem)] font-light uppercase leading-[0.95] tracking-[0.06em] text-display-ink"
            >
              {site.name}
            </span>
          </h1>
        </Reveal>

        {/* Double rule with the discipline line between */}
        <Reveal delay={140}>
          <div className="mt-8">
            <div className="h-px w-full bg-rule-strong" />
            <p className="label lining py-3 text-ink-muted">{site.role}</p>
            <div className="h-px w-full bg-rule" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={200} className="lg:col-span-7">
            <p className="font-display text-balance text-2xl leading-snug text-ink sm:text-[1.75rem]">
              {hero.headline}
            </p>
            <p className="mt-6 max-w-xl text-pretty text-ink-muted">{hero.intro}</p>

            <div className="no-print mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="label group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 text-paper transition-colors hover:border-accent hover:bg-accent"
              >
                Selected work
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="label inline-flex items-center gap-3 border border-rule-strong px-6 py-3.5 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </Reveal>

          {/* Statistics plate, ruled like a ledger */}
          <Reveal delay={260} className="lg:col-span-5">
            <dl className="divide-y divide-rule border-y border-rule lg:mt-2">
              {hero.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <dd className="font-display lining text-4xl leading-none text-accent">
                    {fact.value}
                  </dd>
                  <dt className="label max-w-[60%] text-right text-ink-faint">{fact.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="no-print pointer-events-none absolute inset-x-0 bottom-8 mx-auto hidden w-full max-w-5xl px-6 sm:block"
      >
        <div className="label flex items-center gap-3 text-ink-faint">
          <span className="h-px w-10 bg-rule-strong" />
          Scroll
        </div>
      </div>
    </section>
  );
}
