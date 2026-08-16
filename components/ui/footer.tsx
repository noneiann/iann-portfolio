'use client'

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useIntro } from "../IntroProvider";
import { socialLinks } from "@/lib/content";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { IntroDone } = useIntro();

  // Runs synchronously before the browser paints — hides it with zero flash.
  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { opacity: 0, y: 16 });
  }, []);

  // Reacts to the intro finishing — reveals it.
  useEffect(() => {
    if (!ref.current || !IntroDone) return;
    gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
  }, [IntroDone]);

  return (
    <footer
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-10 backdrop-blur px-6 py-4"
    >
      <nav aria-label="Social links" className="flex gap-6 items-center font-telemetry text-xs uppercase tracking-[0.2em]">
                {socialLinks.map(link => {
                    const external = link.href.startsWith("http");
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="hover:opacity-70 transition-opacity"
                        >
                            {link.label}
                        </a>
                    )
                })}
            </nav>
    </footer>
  );
}