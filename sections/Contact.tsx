"use client";

import { motion } from "framer-motion";
import { SITE, SOCIALS } from "@/lib/content";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";

export default function Contact() {
  return (
    <div id="contact" className="relative flex min-h-dvh w-screen flex-col justify-between overflow-x-hidden p-16 font-archivo sm:p-32">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        05 / Contact
      </div>

      <motion.div {...revealOnScroll} variants={staggerContainer} className="flex flex-col gap-8">
        <motion.div variants={fadeUp}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Get in touch
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 block text-4xl font-semibold tracking-tight text-white transition-colors hover:text-[#8ea2ff] sm:text-7xl"
          >
            {SITE.email}
          </a>
        </motion.div>

        <motion.p variants={fadeUp} className="max-w-md text-sm text-white/50 sm:text-base">
          Open to new opportunities and interesting problems. Reach out and I&apos;ll get back to
          you.
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href={social.href} className="transition-colors hover:text-white">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {SITE.name} &mdash; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
