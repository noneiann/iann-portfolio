import { expertise } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export function Expertise() {
  return (
    <Section
      id="expertise"
      folio="II"
      label="Index of capabilities"
      title="What I work with"
      lede="Four bodies of practice, listed as they are used: research and training on one side, the engineering that carries it into production on the other."
    >
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {expertise.map((group, index) => (
          <Reveal key={group.title} delay={index * 70}>
            <article className="group h-full bg-paper-raised px-7 py-8 transition-colors duration-300 hover:bg-paper-sunken">
              <div className="flex items-baseline gap-3">
                <span className="label lining text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-ink">{group.title}</h3>
              </div>

              <p className="mt-4 text-pretty text-[0.975rem] leading-relaxed text-ink-muted">
                {group.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="label border border-rule px-2.5 py-1.5 text-ink-soft transition-colors group-hover:border-rule-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
