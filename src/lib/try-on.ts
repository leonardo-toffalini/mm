"use client";

import { useSyncExternalStore } from "react";

// The gowns a visitor wants to try on at their fitting, kept in this browser
// (no accounts). Capped at the number a fitting covers.
export const TRY_ON_LIMIT = 5;

const key = "mm-try-on";
const changed = "mm-try-on-change";
const empty: string[] = [];

let cache: { raw: string | null; list: string[] } = { raw: null, list: empty };

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {}
  // Same snapshot for the same stored value, as useSyncExternalStore needs.
  if (raw !== cache.raw) {
    let list = empty;
    try {
      const parsed: unknown = JSON.parse(raw ?? "[]");
      if (Array.isArray(parsed)) list = parsed.filter((s): s is string => typeof s === "string").slice(0, TRY_ON_LIMIT);
    } catch {}
    cache = { raw, list };
  }
  return cache.list;
}

function write(list: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {}
  dispatchEvent(new Event(changed));
}

function subscribe(onChange: () => void) {
  addEventListener(changed, onChange);
  addEventListener("storage", onChange); // other tabs
  return () => {
    removeEventListener(changed, onChange);
    removeEventListener("storage", onChange);
  };
}

// Read out a change to screen readers via the live region in the tray.
export function announce(message: string) {
  const status = document.getElementById("try-on-status");
  if (status) status.textContent = message;
}

export function useTryOn() {
  const list = useSyncExternalStore(subscribe, read, () => empty);
  return {
    list,
    has: (slug: string) => list.includes(slug),
    full: list.length >= TRY_ON_LIMIT,
    toggle: (slug: string) => {
      const current = read();
      if (current.includes(slug)) write(current.filter((s) => s !== slug));
      else if (current.length < TRY_ON_LIMIT) write([...current, slug]);
    },
  };
}
