"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/content";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

export default function About() {
  return (
    <div id="about" className="relative w-full overflow-x-hidden">
      <div className="flex flex-col gap-10 px-6 py-20 font-archivo sm:gap-16 sm:px-12 sm:py-24 lg:px-32 lg:py-32">
        <motion.div
          {...revealOnScroll}
          variants={staggerContainer}
          className="grid w-full grid-cols-12 gap-x-6 gap-y-10 sm:gap-x-12"
        >
          <motion.div
            variants={fadeUp}
            className="col-span-12 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            01 / About
          </motion.div>

          <motion.div variants={fadeUp} className="col-span-12 md:col-span-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              BUILDING AT THE SEAMS
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="col-span-12 flex flex-col gap-6 md:col-span-5 md:col-start-8"
          >
            {ABOUT.focus.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="border-l border-white/10 pl-5">
                <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-white/40">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          {...revealOnScroll}
          variants={staggerContainer}
          className="grid w-full grid-cols-12 gap-x-6 gap-y-4 border-t border-white/10 pt-8 sm:gap-x-12"
        >
          {ABOUT.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="col-span-4 sm:col-span-2">
              <div className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
