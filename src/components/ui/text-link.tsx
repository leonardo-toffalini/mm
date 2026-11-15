import Link from "next/link";
import type { ComponentProps } from "react";
import { LinkStatusIcon } from "./link-status-icon";

export function TextLink({ className = "", children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex items-center gap-1.5 font-medium underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus ${className}`}
      {...props}
    >
      {children}
      <LinkStatusIcon />
    </Link>
  );
}
