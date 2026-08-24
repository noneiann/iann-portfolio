import { contact, site } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export function Contact() {
  const primary = contact.links.find((link) => link.primary) ?? contact.links[0];

  return (
    <Section id="contact" folio="V" label="Correspondence" title={contact.heading}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="text-pretty text-lg leading-relaxed text-ink-soft">{contact.invitation}</p>

          {primary ? (
            <a
              href={primary.href}
              className="font-display rule-link mt-8 inline-block break-all text-3xl text-ink sm:text-4xl"
            >
              {primary.value}
            </a>
          ) : null}
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5">
          <dl className="divide-y divide-rule border-y border-rule">
            {contact.links.map((link) => (
              <div key={link.href} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="label text-ink-faint">{link.label}</dt>
                <dd className="text-right">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rule-link break-all text-ink-soft"
                  >
                    {link.value}
                  </a>
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="label text-ink-faint">Location</dt>
              <dd className="text-right text-ink-soft">{site.location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
