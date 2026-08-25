"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    // `root` binds Lenis to the document, so it drives real window scroll and
    // renders no wrapper element of its own.
    <ReactLenis root options={{ lerp: 0.09 }}>
      {children}
    </ReactLenis>
  );
}
