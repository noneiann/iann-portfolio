"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { NAV_ITEMS } from "@/lib/content";

// Lenis hands its own instance to scroll callbacks; we only read these two
// fields, so type structurally instead of importing the class.
type ScrollState = { scroll: number; limit: number };

/**
 * Scroll-spy shared by the top nav and the right-edge rail so both agree on
 * which section is current. Section tops are measured once and cached rather
 * than read per frame — a getBoundingClientRect() per section on every scroll
 * tick forces a layout flush 60 times a second. A ResizeObserver on <body>
 * re-measures when anything below actually changes height (fonts landing,
 * viewport resize, content reflow).
 */
export function useSectionScroll() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
  const [progress, setProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const boundsRef = useRef<{ id: string; top: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      boundsRef.current = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top + window.scrollY : 0 };
      });
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const onScroll = useCallback(({ scroll, limit }: ScrollState) => {
    setPastHero(scroll > window.innerHeight * 0.6);
    setProgress(limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0);

    const bounds = boundsRef.current;
    if (!bounds.length) return;

    // A section counts as current once its top passes 40% down the viewport.
    const line = scroll + window.innerHeight * 0.4;
    let current = bounds[0].id;
    for (const entry of bounds) {
      if (line >= entry.top) current = entry.id;
    }
    setActiveId((prev) => (prev === current ? prev : current));
  }, []);

  useLenis(onScroll);

  return { activeId, progress, pastHero };
}

/** Click handler factory that smooth-scrolls to a section by id. */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -16 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );
}
