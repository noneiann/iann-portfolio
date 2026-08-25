"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/content";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

export default function Projects() {
  return (
    <div id="projects" className="relative w-full overflow-x-hidden">
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid w-full grid-cols-12 gap-x-6 gap-y-10 px-6 py-20 font-archivo sm:gap-x-12 sm:gap-y-14 sm:px-12 sm:py-24 lg:px-32 lg:py-32"
      >
        <motion.div variants={fadeUp} className="col-span-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            04 / Projects
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            SELECTED WORK
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="col-span-12 flex flex-col gap-6">
          {PROJECTS.map((project) => (
            <motion.a
              key={project.id}
              href={project.href}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#8ea2ff]/40 sm:p-8 lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {project.index}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {project.year}
                </span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#8ea2ff] sm:text-3xl lg:text-4xl">
                {project.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                {project.blurb}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
