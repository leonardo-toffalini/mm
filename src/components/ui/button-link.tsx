import Link from "next/link";
import type { ComponentProps } from "react";
import { brass, BrassLayers, type Look } from "./brass";
import { LinkStatusIcon } from "./link-status-icon";

type LinkProps = ComponentProps<typeof Link> &
  Look & {
    /** Occasionally run a light around the edge to draw the eye (main CTA only). */
    nudge?: boolean;
  };

export function ButtonLink({ variant, size, nudge = false, className = "", children, ...props }: LinkProps) {
  return (
    <Link className={brass({ variant, size }, className)} {...props}>
      <BrassLayers nudge={nudge} />
      {children}
      <LinkStatusIcon />
    </Link>
  );
}
