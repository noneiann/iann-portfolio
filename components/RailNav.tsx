'use client'

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/SmoothScroll";
import { navLinks } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function RailNav({ activeIndex }: { activeIndex: number | null }) {
    const railRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    useLayoutEffect(() => {
        const rail = railRef.current;
        const fill = fillRef.current;
        if (!rail || !fill) return;

        // Hidden until you scroll away from the hero.
        gsap.set(rail, { opacity: 0, x: 24 });
        gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

        // The "scrollbar" itself — fill tracks overall document progress.
        const progress = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                gsap.set(fill, { scaleY: self.progress });
            },
        });

        // Reveal / hide the rail as the hero leaves and re-enters view.
        const reveal = ScrollTrigger.create({
            trigger: "#hero",
            start: "bottom 75%",
            onEnter: () => gsap.to(rail, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(rail, { opacity: 0, x: 24, duration: 0.4, ease: "power2.in" }),
        });

        return () => {
            progress.kill();
            reveal.kill();
        };
    }, []);

    function goTo(id: string) {
        const target = document.getElementById(id);
        if (!target) return;
        if (lenis) lenis.scrollTo(target, { duration: 1.2 });
        else target.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div
            ref={railRef}
            className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 sm:block"
        >
            <nav aria-label="Section navigation" className="flex items-stretch gap-4">
                <ul className="flex flex-col gap-7 text-right">
                    {navLinks.map((link, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <li key={link.id}>
                                <button
                                    type="button"
                                    onClick={() => goTo(link.id)}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`font-telemetry text-[0.65rem] uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-100 ${
                                        isActive ? "opacity-100" : "opacity-40"
                                    }`}
                                >
                                    {link.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Track + fill: the dynamic scrollbar. */}
                <div className="relative w-px bg-foreground/20" aria-hidden>
                    <div ref={fillRef} className="absolute inset-x-0 top-0 h-full bg-foreground" />
                </div>
            </nav>
        </div>
    );
}
