"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useLinkStatus } from "next/link";

// Must render inside a <Link>. Shows a spinner while that link is navigating.
export function LinkStatusIcon() {
  const { pending } = useLinkStatus();
  const Icon = pending ? LoaderCircle : ArrowRight;
  return (
    <Icon
      aria-hidden
      size={18}
      strokeWidth={1.75}
      className={
        pending
          ? "animate-spin motion-reduce:animate-none"
          : "transition-transform duration-200 group-hover:translate-x-0.5"
      }
    />
  );
}
