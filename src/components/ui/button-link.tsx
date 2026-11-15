import Link from "next/link";
import type { ComponentProps } from "react";
import { LinkStatusIcon } from "./link-status-icon";
import { NudgeGlint } from "./nudge-glint";

// The primary button is polished brass: the accent colour with a metallic
// gradient and bevelled edges on top, plus a shine that sweeps to the arrow.
const variants = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-page)_60%,transparent),inset_0_-1px_0_color-mix(in_oklab,var(--color-fg)_30%,transparent)]",
};

// Trailing icon sits optically closer to the edge, so the right padding is smaller.
const sizes = {
  md: "h-11 gap-2 pl-5 pr-4 text-sm",
  lg: "h-14 gap-2.5 pl-7 pr-6 text-base",
};

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Occasionally run a light around the edge to draw the eye (main CTA only). */
  nudge?: boolean;
};

export function ButtonLink({ variant = "primary", size = "md", nudge = false, className = "", children, ...props }: Props) {
  return (
    <Link
      className={`group relative isolate inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-[background-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Metal: lighter towards the top, deeper towards the bottom. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-page)_45%,transparent)_0%,transparent_50%,color-mix(in_oklab,var(--color-fg)_22%,transparent)_100%)] mix-blend-soft-light"
      />
      {/* Shine: rests off to the left; on hover/focus it slides across and
          settles as a glint behind the arrow. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full motion-reduce:hidden">
        <span className="absolute inset-0 [transform:translateX(-110%)] bg-[linear-gradient(100deg,transparent_34%,color-mix(in_oklab,var(--color-page)_55%,transparent)_48%,transparent_62%)] transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.2,1)] group-hover:[transform:translateX(38%)] group-hover:duration-1100 group-focus-visible:[transform:translateX(38%)] group-focus-visible:duration-1100" />
      </span>
      {nudge && <NudgeGlint />}
      {/* A hairline "engraved" frame that appears on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[3px] rounded-full border border-on-accent/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {children}
      <LinkStatusIcon />
    </Link>
  );
}
