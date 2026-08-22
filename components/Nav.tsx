"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { NAV_ITEMS, SITE } from "@/lib/content";

export default function Nav() {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
  const [visible, setVisible] = useState(false);
  const boundsRef = useRef<{ id: string; top: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      boundsRef.current = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.offsetTop : 0 };
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onScroll = useCallback((instance: { scroll: number }) => {
    const scroll = instance.scroll;
    setVisible(scroll > window.innerHeight * 0.6);

    const bounds = boundsRef.current;
    if (!bounds.length) return;
    let current = bounds[0].id;
    for (const entry of bounds) {
      if (scroll + window.innerHeight * 0.4 >= entry.top) current = entry.id;
    }
    setActiveId((prev) => (prev === current ? prev : current));
  }, []);

  useLenis(onScroll);

  const scrollToSection = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -16 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
