'use client'

import { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section({
    id,
    label,
    title,
    children,
}: {
    id: string;
    label: string;
    title: string;
    children: ReactNode;
}) {
    const ref = useRef<HTMLElement>(null);

    // Everything marked [data-reveal] inside fades up as the section enters view.
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
        if (!targets.length) return;

        gsap.set(targets, { opacity: 0, y: 24 });

        const tween = gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 70%",
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <section id={id} ref={ref} className="mx-auto min-h-screen max-w-3xl px-6 py-32">
            <p data-reveal className="font-telemetry text-xs uppercase tracking-[0.3em] opacity-50">
                {label}
            </p>
            <h2 data-reveal className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
            </h2>
            <div className="mt-12">{children}</div>
        </section>
    );
}
