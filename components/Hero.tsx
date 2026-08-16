'use client'

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useIntro } from "@/components/IntroProvider";

export default function Hero() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const hintRef = useRef<HTMLParagraphElement>(null);
    const { setIntroDone } = useIntro();

    useLayoutEffect(() => {
        const heading = headingRef.current;
        const subtitle = subtitleRef.current;
        const hint = hintRef.current;
        if (!heading || !subtitle || !hint) return;

        // Hidden state applied by JS only, pre-paint — the server-rendered
        // markup stays visible for crawlers and no-JS users.
        gsap.set(heading, { opacity: 0 });
        gsap.set([subtitle, hint], { opacity: 0, y: 16 });

        const intro = gsap.timeline({ onComplete: () => setIntroDone() });
        intro
            .to(heading, { opacity: 1, duration: 0.9, ease: "power2.out" })
            .to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
            .to(hint, { opacity: 0.5, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.1");

        return () => {
            intro.kill();
        };
    }, [setIntroDone]);

    return (
        <section
            id="hero"
            className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
            <h1 ref={headingRef} className="text-5xl font-bold tracking-tight sm:text-7xl">
                REY IANN TIGLEY
            </h1>
            <p
                ref={subtitleRef}
                className="mt-5 font-telemetry text-xs uppercase tracking-[0.35em] opacity-60 sm:text-sm"
            >
                Software Engineer
            </p>
            <p ref={hintRef} className="mt-20 font-telemetry text-xs uppercase tracking-[0.25em]">
                Scroll
            </p>
        </section>
    );
}
