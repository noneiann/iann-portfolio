"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/content";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

export default function Experience() {
  return (
    <div id="experience" className="relative w-full overflow-x-hidden">
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid w-full grid-cols-12 gap-x-6 gap-y-10 px-6 py-20 font-archivo sm:gap-x-12 sm:gap-y-14 sm:px-12 sm:py-24 lg:px-32 lg:py-32"
      >
        <motion.div variants={fadeUp} className="col-span-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            03 / Experience
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            WHERE I&apos;VE BEEN
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="col-span-12 flex flex-col">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.id}
              variants={fadeUp}
              className={`grid grid-cols-12 gap-x-6 gap-y-3 border-white/10 py-8 ${
                i === 0 ? "" : "border-t"
              }`}
            >
              <div className="col-span-12 lg:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {job.period}
                </span>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {job.location}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {job.role}
                  </h3>
                  <span className="text-sm text-[#8ea2ff] sm:text-base">
                    {job.company}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                  {job.description}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-white/40 sm:text-base"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
