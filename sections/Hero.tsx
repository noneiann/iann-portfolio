"use client";

import { motion } from "framer-motion";
import Scene from "@/components/Scene";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
    return (
        <div id="hero" className="relative h-dvh w-full overflow-x-hidden">

             {/* Backdrop: the canvas plus the scrim that darkens the viewport edges.
                      Fixed so both stay put while the sections scroll over them. */}
                  <div className="pointer-events-none absolute inset-0 z-0">
                    <Scene />
                    <div className="absolute inset-0 bg-linear-to-b from-[#05060a]/85 via-transparent to-[#05060a]/85" />
                  </div>
            <motion.div
                initial="hidden"
                animate="show"
                variants={staggerContainer}
                className="relative z-20 flex h-full flex-col justify-between px-6 py-20 font-archivo sm:px-12 sm:py-24 lg:px-32 lg:py-32"
            >
                <motion.header variants={fadeUp} className="max-w-lg">
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        REY IANN TIGLEY
                    </h1>
                    <p className="mt-4 text-sm text-white/50 sm:text-base">
                        Software engineer working across interfaces,
                        infrastructure, and the seams in between.
                    </p>
                </motion.header>

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Scroll
                    </span>

                    <div className="w-full text-left sm:max-w-md sm:text-right">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Currently
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            AVAILABLE FOR WORK
                        </h2>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
