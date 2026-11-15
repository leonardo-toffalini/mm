"use client";

import { useEffect, useRef } from "react";

// Seconds of active time on the site at which to nudge: soon after arriving,
// then less and less often, then never again this session.
const schedule = [10, 40, 120, 240];
const storageKey = "mm-nudge";

type State = { seconds: number; shown: number };

/**
 * A light that orbits the edge of its (pill-shaped, `relative`) parent button
 * now and then, so a visitor notices the main call to action without being
 * pestered. Active time is counted only while the tab is visible and is kept
 * for the browser session, so it carries over between pages. Hovering or
 * focusing the button ends the nudging for the session.
 */
export function NudgeGlint() {
  const ring = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    const button = el?.parentElement;
    if (!el || !button || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = read();
    if (state.shown >= schedule.length) return;

    const stop = () => {
      state.shown = schedule.length;
      write(state);
      clearInterval(timer);
    };

    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      state.seconds += 1;
      if (state.seconds >= schedule[state.shown]) {
        state.shown += 1;
        glint(el);
      }
      write(state);
      if (state.shown >= schedule.length) clearInterval(timer);
    }, 1000);

    button.addEventListener("pointerenter", stop);
    button.addEventListener("focusin", stop);
    return () => {
      clearInterval(timer);
      button.removeEventListener("pointerenter", stop);
      button.removeEventListener("focusin", stop);
    };
  }, []);

  return <span ref={ring} aria-hidden className="glint-ring pointer-events-none absolute -inset-px rounded-full opacity-0" />;
}

function glint(el: HTMLElement) {
  el.animate(
    [
      { "--glint-angle": "0deg", opacity: 0 },
      { opacity: 1, offset: 0.15 },
      { opacity: 1, offset: 0.8 },
      { "--glint-angle": "360deg", opacity: 0 },
    ],
    { duration: 2200, easing: "cubic-bezier(0.45, 0, 0.25, 1)" },
  );
}

function read(): State {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (typeof saved?.seconds === "number" && typeof saved?.shown === "number") return saved;
  } catch {}
  return { seconds: 0, shown: 0 };
}

function write(state: State) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch {}
}
