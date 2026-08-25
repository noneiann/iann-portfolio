"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { NAV_ITEMS, SITE } from "@/lib/content";
import { useScrollToSection, useSectionScroll } from "@/lib/use-section-scroll";

// "Home" is the hero itself, which the initials on the left already link to.
const LINKS = NAV_ITEMS.filter((item) => item.id !== "hero");

export default function Nav() {
  const { activeId, pastHero } = useSectionScroll();
  const scrollToSection = useScrollToSection();
  const lenis = useLenis();
  const [menuRequested, setMenuRequested] = useState(false);

  // The bar fades out over the hero, taking its toggle with it, so the overlay
  // hangs off that same flag rather than tracking its own: there is no state
  // where the menu is showing but nothing on screen can dismiss it.
  const menuOpen = menuRequested && pastHero;

  // Lenis drives real window scroll, so stopping the instance — not a class on
  // <body> — is what holds the page still behind the overlay. Its stylesheet
  // puts `overflow: clip` on <html> while stopped, which covers native touch
  // scrolling as well as the wheel.
  useEffect(() => {
    if (!menuOpen || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuRequested(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavClick = (id: string) => (event: React.MouseEvent) => {
    // Lift the scroll lock first: Lenis ignores scrollTo() while stopped, and
    // the effect cleanup above wouldn't run until well after this handler.
    lenis?.start();
    setMenuRequested(false);
    scrollToSection(id)(event);
  };

  return (
    <>
      <nav
        aria-hidden={!pastHero}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 sm:px-12 sm:py-5 lg:px-32 ${
          pastHero
            ? "border-white/10 bg-[#05060a]/90"
            : "border-transparent bg-transparent"
        }`}
        style={{ opacity: pastHero ? 1 : 0, pointerEvents: pastHero ? "auto" : "none" }}
      >
        <a
          href="#hero"
          onClick={handleNavClick("hero")}
          className="py-2 text-white/70 transition-colors hover:text-white"
        >
          {SITE.initials}
        </a>

        {/* Five wide-tracked labels need roughly 480px of bar; below md they
            move into the overlay instead of overflowing off-screen. */}
        <ul className="hidden items-center gap-6 md:flex lg:gap-10">
          {LINKS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
                className={`block py-2 transition-colors ${
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

        <button
          type="button"
          onClick={() => setMenuRequested((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="-mr-2 px-2 py-2 uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* The overlay is the only navigation a phone gets: the bar's link row is
          hidden below md and the right-edge rail is desktop-only. It sits under
          the bar's z-index so the Close button stays reachable. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#05060a]/95 backdrop-blur-sm md:hidden"
          >
            <nav aria-label="Sections" className="h-full px-6 font-archivo">
              <ul className="flex h-full flex-col justify-center gap-1">
                {LINKS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={handleNavClick(item.id)}
                      aria-current={activeId === item.id ? "true" : undefined}
                      className={`flex items-baseline gap-4 py-3 text-3xl font-semibold uppercase tracking-tight transition-colors ${
                        activeId === item.id ? "text-[#8ea2ff]" : "text-white/70"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">
                        {item.index}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
