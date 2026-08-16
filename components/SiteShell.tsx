'use client'

import { useLayoutEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "@/lib/content";
import Scene from "@/components/Scene";
import RailNav from "@/components/RailNav";

gsap.registerPlugin(ScrollTrigger);

export default function SiteShell({ children }: { children: ReactNode }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // One trigger per section decides which rail item is active.
    useLayoutEffect(() => {
        const triggers = navLinks.map((link, i) => {
            const el = document.getElementById(link.id);
            if (!el) return null;

            return ScrollTrigger.create({
                trigger: el,
                start: "top center",
                end: "bottom center",
                onToggle: (self) => {
                    if (self.isActive) setActiveIndex(i);
                },
                // Scrolling back above the first section clears the selection.
                onLeaveBack: () => {
                    if (i === 0) setActiveIndex(null);
                },
            });
        });

        // Fonts and images settle after first paint — re-measure once they have.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") refresh();
        else window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            triggers.forEach((t) => t?.kill());
        };
    }, []);

    return (
        <>
            <Scene activeIndex={activeIndex} itemCount={navLinks.length} />
            <RailNav activeIndex={activeIndex} />
            {children}
        </>
    );
}
