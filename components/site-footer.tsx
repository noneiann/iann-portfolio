import { contact, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-rule px-6 py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="ornament mb-10">
          <span className="shrink-0 text-xl leading-none text-rule-strong">❦</span>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl tracking-wide text-ink">{site.name}</p>
            <p className="label mt-3 text-ink-faint">{site.role}</p>
          </div>

          <nav aria-label="Elsewhere" className="no-print">
            <ul className="label flex flex-wrap gap-x-6 gap-y-3 text-ink-muted sm:justify-end">
              {contact.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rule-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#top" className="rule-link">
                  Back to top ↑
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="label lining mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Set in Cormorant Garamond, EB Garamond & IBM Plex Mono</span>
        </div>
      </div>
    </footer>
  );
}
