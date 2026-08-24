"use client";

import { NAV_ITEMS, SITE } from "@/lib/content";
import { useActiveSection, useScrollToSection } from "@/lib/useActiveSection";

export default function Nav() {
  const { activeId, scroll } = useActiveSection();
  const scrollToSection = useScrollToSection();

  const visible = scroll > (typeof window === "undefined" ? Infinity : window.innerHeight * 0.6);

  const onNavClick = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-16 py-5 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 sm:px-32 ${
        visible
          ? "border-white/10 bg-[#05060a]/90"
          : "border-transparent bg-transparent"
      }`}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <a
        href="#hero"
        onClick={onNavClick("hero")}
        className="text-white/70 transition-colors hover:text-white"
      >
        {SITE.initials}
      </a>

      <ul className="flex items-center gap-6 sm:gap-10">
        {NAV_ITEMS.filter((item) => item.id !== "hero").map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavClick(item.id)}
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
