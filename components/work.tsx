import { projects } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export function Work() {
  return (
    <Section
      id="work"
      folio="III"
      label="Selected work"
      title="Projects, catalogued"
      lede="A sample of systems built end to end — model, service and interface. Each entry states what it does, what it took, and what it measured."
    >
      <div className="border-t border-rule">
        {projects.map((project, index) => (
          <Reveal key={project.no} delay={index * 50}>
            <article className="group grid gap-6 border-b border-rule py-10 transition-colors duration-300 hover:bg-paper-raised/70 sm:py-12 lg:grid-cols-12 lg:gap-10">
              {/* Folio + year */}
              <div className="lg:col-span-2">
                <div className="flex items-baseline gap-4 lg:block">
                  <span className="font-display lining block text-4xl leading-none text-rule-strong transition-colors duration-300 group-hover:text-accent">
                    {project.no}
                  </span>
                  <span className="label lining mt-3 block text-ink-faint">{project.year}</span>
                </div>
              </div>

              {/* Body */}
              <div className="lg:col-span-7">
                <p className="label text-accent">{project.kicker}</p>
                <h3 className="font-display mt-3 text-3xl leading-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-soft">
                  {project.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="relative pl-6 text-[0.975rem] leading-relaxed text-ink-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3.5 before:bg-rule-strong"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                {project.links?.length ? (
                  <div className="no-print mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label rule-link inline-flex items-center gap-2 text-ink-muted"
                      >
                        {link.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Plate: metric + stack */}
              <div className="lg:col-span-3">
                {project.metric ? (
                  <div className="border border-rule bg-paper-raised px-5 py-5">
                    <p className="font-display lining text-3xl leading-none text-accent">
                      {project.metric.value}
                    </p>
                    <p className="label mt-3 text-ink-faint">{project.metric.label}</p>
                  </div>
                ) : null}

                <ul className={`flex flex-wrap gap-x-2 gap-y-2 ${project.metric ? "mt-5" : ""}`}>
                  {project.stack.map((tool, toolIndex) => (
                    <li key={tool} className="label text-ink-faint">
                      {tool}
                      {toolIndex < project.stack.length - 1 ? (
                        <span aria-hidden="true" className="ml-2 text-rule-strong">
                          ·
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
