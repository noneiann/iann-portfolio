// Shared Framer Motion variants — kept in one place so every section
// animates on the same rhythm instead of drifting apart over time.

import { Variants } from "framer-motion";

// Fades a block up into place. Applied to section headings/copy and to
// individual items inside a staggerContainer.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Wrap a list of fadeUp children in this to have them reveal one after
// another instead of all at once.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

// Scroll-triggered reveal props shared by section-level wrappers: animate
// once, slightly before the element is fully in view.
export const revealOnScroll = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;
