"use client";

import { NAV_ITEMS } from "@/lib/content";
import { useScrollToSection, useSectionScroll } from "@/lib/use-section-scroll";

export default function SectionIndicator() {
  // Shares the nav's reveal point via `pastHero`, so both pieces of chrome
  // arrive together instead of stacking two separate fades over the hero.
  const { activeId, pastHero } = useSectionScroll();
  const scrollToSection = useScrollToSection();

  return (
    <nav
      aria-label="Section navigation"
      aria-hidden={!pastHero}
      className={`fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 md:block ${
        pastHero ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
      style={{ pointerEvents: pastHero ? "auto" : "none" }}
    >
      <ul className="flex flex-col items-end gap-5">
        {NAV_ITEMS.map((item, index) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={scrollToSection(item.id)}
                aria-current={active ? "true" : undefined}
                className="group flex items-center justify-end gap-3"
              >
                <span
                  className={`font-mono text-[10px] uppercase leading-none tracking-[0.3em] transition-all duration-300 ${
                    active
                      ? "text-[#8ea2ff] opacity-100"
                      : "text-white/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {String(index).padStart(2, "0")} {item.label}
                </span>
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ${
                    active
                      ? "w-8 bg-[#8ea2ff]"
                      : "w-4 bg-white/25 group-hover:w-6 group-hover:bg-white/60"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
