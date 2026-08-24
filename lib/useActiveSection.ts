"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { NAV_ITEMS } from "@/lib/content";

/**
 * Tracks which section is currently under the reading line (40% down the
 * viewport) plus the raw scroll offset, so chrome like the nav and the section
 * indicator stay in sync off a single measurement pass.
 */
export function useActiveSection() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);
  const [scroll, setScroll] = useState(0);
  const boundsRef = useRef<{ id: string; top: number }[]>([]);

  const resolve = useCallback((offset: number) => {
    const bounds = boundsRef.current;
    if (!bounds.length) return;
    let current = bounds[0].id;
    for (const entry of bounds) {
      if (offset + window.innerHeight * 0.4 >= entry.top) current = entry.id;
    }
    setActiveId((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    const measure = () => {
      boundsRef.current = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.offsetTop : 0 };
      });
      // Lenis only emits on scroll, so seed state here — otherwise a reload
      // partway down the page starts with the first section marked active.
      setScroll(window.scrollY);
      resolve(window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [resolve]);

  useLenis(
    useCallback(
      (instance: { scroll: number }) => {
        setScroll(instance.scroll);
        resolve(instance.scroll);
      },
      [resolve],
    ),
  );

  return { activeId, scroll };
}

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -16 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );
}
