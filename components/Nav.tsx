"use client";

import { NAV_ITEMS, SITE } from "@/lib/content";
import { useScrollToSection, useSectionScroll } from "@/lib/use-section-scroll";

export default function Nav() {
  const { activeId, pastHero } = useSectionScroll();
  const scrollToSection = useScrollToSection();

  return (
    <nav
      aria-hidden={!pastHero}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-16 py-5 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 sm:px-32 ${
        pastHero
          ? "border-white/10 bg-[#05060a]/90"
          : "border-transparent bg-transparent"
      }`}
      style={{ opacity: pastHero ? 1 : 0, pointerEvents: pastHero ? "auto" : "none" }}
    >
      <a
        href="#hero"
        onClick={scrollToSection("hero")}
        className="text-white/70 transition-colors hover:text-white"
      >
        {SITE.initials}
      </a>

      <ul className="flex items-center gap-6 sm:gap-10">
        {NAV_ITEMS.filter((item) => item.id !== "hero").map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={scrollToSection(item.id)}
              className={`transition-colors ${
                activeId === item.id
                  ? "text-[#8ea2ff]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
