"use client";

import { useEffect } from "react";
import { preloadRoute } from "@/lib/preload";

// Warms a page's photos as soon as a link to it is hovered, focused or
// touched, the moment before it's clicked. One listener covers every link.
export function IntentPreload() {
  useEffect(() => {
    const onIntent = (e: Event) => {
      const link = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (link?.origin === location.origin) preloadRoute(link.href);
    };
    const events = ["pointerover", "focusin", "touchstart"];
    for (const type of events) document.addEventListener(type, onIntent, { passive: true });
    return () => {
      for (const type of events) document.removeEventListener(type, onIntent);
    };
  }, []);

  return null;
}
