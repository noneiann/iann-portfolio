"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

const sectionIds = nav.map((item) => item.href.replace("#", ""));

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Condense the masthead once the reader leaves the title page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the section presently under the reader's eye.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    // "top" is observed as well so the highlight clears on the title page.
    const observed = ["top", ...sectionIds]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    observed.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Close the drawer on Escape, and lock the page behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`no-print sticky top-0 z-50 border-b transition-[background-color,border-color,padding] duration-300 ${
        scrolled || menuOpen
          ? "border-rule bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a
          href="#top"
          className="group flex items-baseline gap-3 whitespace-nowrap"
          aria-label={`${site.name} — back to top`}
        >
          <span className="label border border-rule px-1.5 py-1 text-ink-muted transition-colors group-hover:border-accent group-hover:text-accent">
            {site.monogram}
          </span>
          <span
            className={`font-display text-lg tracking-wide text-ink transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0 sm:opacity-100"
            }`}
          >
            {site.name}
          </span>
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="label flex items-center gap-7 text-ink-muted">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-link"
                    data-current={current === item.href.replace("#", "")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-rule text-ink-muted transition-colors hover:border-accent hover:text-accent md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Sections"
        hidden={!menuOpen}
        className="border-t border-rule bg-paper/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto max-w-6xl divide-y divide-rule px-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="label flex items-center justify-between py-4 text-ink-muted transition-colors hover:text-accent"
                data-current={current === item.href.replace("#", "")}
              >
                {item.label}
                <span aria-hidden="true" className="text-rule-strong">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
