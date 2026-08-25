"use client";

import { motion } from "framer-motion";
import { CONTACT, SITE, SOCIALS } from "@/lib/content";
import { fadeUp, revealOnScroll, staggerContainer } from "@/lib/motion";
import { useScrollToSection } from "@/lib/use-section-scroll";

export default function Contact() {
  const scrollToSection = useScrollToSection();

  return (
    <div
      id="contact"
      className="relative flex min-h-dvh w-full flex-col justify-between overflow-x-hidden px-6 py-20 font-archivo sm:px-12 sm:py-24 lg:px-32 lg:py-32"
    >
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid w-full grid-cols-12 gap-x-6 gap-y-10 sm:gap-x-12"
      >
        <motion.div
          variants={fadeUp}
          className="col-span-12 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          05 / Contact
        </motion.div>

        {/* Left: the closing statement. The address itself lives in the
            channel list on the right, so it isn't said twice. */}
        <motion.div variants={fadeUp} className="col-span-12 lg:col-span-6">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {CONTACT.heading}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
            {CONTACT.blurb}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ea2ff]/60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8ea2ff]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
              {CONTACT.status}
            </span>
          </div>
        </motion.div>

        {/* Right: every way to reach me, one row each, address first. */}
        <motion.div
          variants={staggerContainer}
          className="col-span-12 lg:col-span-5 lg:col-start-8"
        >
          <motion.a
            variants={fadeUp}
            href={`mailto:${SITE.email}`}
            className="group flex items-end justify-between gap-6 border-b border-white/10 pb-5 transition-colors hover:border-[#8ea2ff]/50"
          >
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Email
              </span>
              <span className="mt-2 block text-base font-semibold tracking-tight text-white transition-colors group-hover:text-[#8ea2ff] sm:text-xl lg:text-2xl">
                {SITE.email}
              </span>
            </span>
            <span
              aria-hidden
              className="pb-1 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#8ea2ff]"
            >
              &rarr;
            </span>
          </motion.a>

          <ul className="flex flex-col">
            {SOCIALS.map((social) => (
              <motion.li key={social.label} variants={fadeUp}>
                <a
                  href={social.href}
                  target={social.href.startsWith("#") ? undefined : "_blank"}
                  rel={social.href.startsWith("#") ? undefined : "noreferrer"}
                  className="group flex flex-col items-start gap-1 border-b border-white/10 py-4 transition-colors hover:border-white/30 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition-colors group-hover:text-white/70">
                    {social.label}
                  </span>
                  <span className="flex items-center gap-3 text-sm text-white/60 transition-colors group-hover:text-white sm:text-base">
                    {social.value}
                    <span
                      aria-hidden
                      className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70"
                    >
                      &rarr;
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:tracking-[0.3em]">
        <p>
          {SITE.location} &mdash; {SITE.timezone}
        </p>
        <p>
          {SITE.name} &copy; {new Date().getFullYear()}
        </p>
        <a
          href="#hero"
          onClick={scrollToSection("hero")}
          className="transition-colors hover:text-white"
        >
          Back to top &uarr;
        </a>
      </div>
    </div>
  );
}
