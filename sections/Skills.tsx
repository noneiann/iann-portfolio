"use client";

import { motion } from "framer-motion";
import { SKILL_GROUPS } from "@/lib/content";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

export default function Skills() {
  return (
    <div id="skills" className="relative w-screen overflow-x-hidden">
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid w-full grid-cols-12 gap-x-12 gap-y-10 p-16 font-archivo sm:gap-y-14 sm:p-32"
      >
        <motion.div variants={fadeUp} className="col-span-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            02 / Skills
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            TOOLS I REACH FOR
          </h2>
        </motion.div>

        {SKILL_GROUPS.map((group) => (
          <motion.div key={group.title} variants={fadeUp} className="col-span-12 sm:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8ea2ff]">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white sm:text-sm"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
