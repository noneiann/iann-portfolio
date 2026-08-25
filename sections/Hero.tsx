"use client";

import { motion } from "framer-motion";
import Scene from "@/components/Scene";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
    return (
        <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">

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
                className="relative z-20 flex h-full flex-col justify-between p-16 font-archivo sm:p-32"
            >
                <motion.header variants={fadeUp} className="max-w-lg">
                    <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        REY IANN TIGLEY
                    </h1>
                    <p className="mt-4 text-sm text-white/50 sm:text-base">
                        Software engineer working across interfaces,
                        infrastructure, and the seams in between.
                    </p>
                </motion.header>

                <motion.div variants={fadeUp} className="flex items-end justify-between gap-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Scroll
                    </span>

                    <div className="max-w-md text-right">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Currently
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            AVAILABLE FOR WORK
                        </h2>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
