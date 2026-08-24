"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_EVENT = "themechange";

/**
 * The theme lives on <html data-theme>, written by the inline script in
 * app/layout.tsx before first paint. This subscribes to that external state
 * rather than mirroring it into component state.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** The server always renders the light plate; the client corrects after hydration. */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or blocked storage — the choice simply won't persist.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light paper" : "Switch to dark paper"}
      title={isDark ? "Light paper" : "Dark paper"}
      className={`no-print grid size-9 place-items-center rounded-full border border-rule text-ink-muted transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {isDark ? (
        // Sun, engraved
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="12"
              y1="2.75"
              x2="12"
              y2="5.25"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              transform={`rotate(${angle} 12 12)`}
            />
          ))}
        </svg>
      ) : (
        // Crescent moon
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
