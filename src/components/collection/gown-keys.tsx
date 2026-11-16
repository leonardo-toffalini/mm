"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// The left and right arrow keys step to the previous and next gown.
export function GownKeys({ prev, next }: { prev: string; next: string }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if ((e.target as HTMLElement).closest("input, select, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") router.push(prev);
      if (e.key === "ArrowRight") router.push(next);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [router, prev, next]);

  // Keep the current gown's thumbnail in view in the strip (it scrolls
  // sideways on narrow screens). Scrolls only the strip, never the page.
  useEffect(() => {
    const strip = document.querySelector<HTMLElement>("[data-strip]");
    const current = strip?.querySelector<HTMLElement>("[aria-current='page']");
    if (!strip || !current) return;
    const s = strip.getBoundingClientRect();
    const c = current.getBoundingClientRect();
    strip.scrollLeft += c.left - s.left - (s.width - c.width) / 2;
  }, [prev, next]);

  return null;
}
