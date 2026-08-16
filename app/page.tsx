import SiteShell from "@/components/SiteShell";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import { aboutFacts, aboutParagraphs, projects, socialLinks } from "@/lib/content";

export default function Home() {
  return (
    <SiteShell>
      <Hero />

      <Section id="about" label="01 / About" title="Building things that hold up.">
        <div className="space-y-6">
          {aboutParagraphs.map((paragraph, i) => (
            <p key={i} data-reveal className="text-lg leading-relaxed opacity-80">
              {paragraph}
            </p>
          ))}
        </div>

        <dl data-reveal className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
          {aboutFacts.map((fact) => (
            <div key={fact.label} className="bg-background p-5">
              <dt className="font-telemetry text-xs uppercase tracking-[0.2em] opacity-50">
                {fact.label}
              </dt>
              <dd className="mt-2 font-telemetry text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="projects" label="02 / Projects" title="Selected work.">
        <ul className="space-y-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10">
          {projects.map((project) => (
            <li key={project.title} data-reveal className="bg-background p-6 sm:p-8">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-relaxed opacity-70">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-foreground/20 px-3 py-1 font-telemetry text-xs uppercase tracking-wider opacity-60"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" label="03 / Contact" title="Let's talk.">
        <p data-reveal className="text-lg leading-relaxed opacity-80">
          The fastest way to reach me is email. I read everything, and I reply to anything
          that isn&apos;t a pitch deck.
        </p>

        <ul className="mt-10 space-y-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10">
          {socialLinks.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.href} data-reveal className="bg-background">
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between p-5 transition-opacity hover:opacity-60"
                >
                  <span className="font-telemetry text-sm uppercase tracking-[0.2em]">
                    {link.label}
                  </span>
                  <span aria-hidden className="font-telemetry text-sm opacity-40">
                    {external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>
    </SiteShell>
  );
}
