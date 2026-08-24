import { education, experience, type RecordEntry } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

function Ledger({ entries }: { entries: RecordEntry[] }) {
  return (
    <ol className="border-t border-rule">
      {entries.map((entry, index) => (
        <Reveal key={`${entry.organisation}-${entry.title}`} delay={index * 60} as="li">
          <div className="group grid gap-4 border-b border-rule py-8 sm:grid-cols-12 sm:gap-8">
            <p className="label lining pt-1.5 text-ink-faint sm:col-span-3">{entry.period}</p>

            <div className="sm:col-span-9">
              <h4 className="font-display text-2xl leading-tight text-ink">{entry.title}</h4>
              <p className="label mt-2 text-accent">{entry.organisation}</p>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-muted">
                {entry.description}
              </p>

              {entry.details?.length ? (
                <ul className="mt-4 max-w-2xl space-y-2">
                  {entry.details.map((detail) => (
                    <li
                      key={detail}
                      className="relative pl-6 text-[0.95rem] leading-relaxed text-ink-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3.5 before:bg-rule-strong"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function Record() {
  return (
    <Section
      id="record"
      folio="IV"
      label="The record"
      title="Experience & education"
      lede="Where the practice was built — in industry, in the laboratory, and in the degree that started it."
    >
      <div className="space-y-16">
        <div>
          <Reveal>
            <h3 className="label mb-6 text-ink-faint">Professional experience</h3>
          </Reveal>
          <Ledger entries={experience} />
        </div>

        <div>
          <Reveal>
            <h3 className="label mb-6 text-ink-faint">Education</h3>
          </Reveal>
          <Ledger entries={education} />
        </div>
      </div>
    </Section>
  );
}
