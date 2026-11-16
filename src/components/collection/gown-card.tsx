import Image from "next/image";
import Link from "next/link";
import { LinkStatusIcon } from "@/components/ui/link-status-icon";
import type { Gown } from "@/data/gowns";
import { routes } from "@/lib/routes";

type Props = {
  gown: Gown;
  featured?: boolean;
  /** Image `sizes` for the card's width in its grid. */
  sizes: string;
  /** Appended to the gown link, e.g. the collection's chosen order. */
  query?: string;
};

// A paper swatch: the photo framed in sand, name and price beneath.
export function GownCard({ gown, featured = false, sizes, query = "" }: Props) {
  return (
    <Link
      href={routes.gown(gown.slug) + query}
      className="group flex h-full flex-col rounded-card bg-surface p-card transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <div
        data-reveal="media"
        className={`relative overflow-hidden rounded-card-inner bg-surface-hover ${featured ? "aspect-[3/4] lg:aspect-auto lg:flex-1" : "aspect-[3/4]"}`}
      >
        {/* Taller than the frame so the parallax drift never shows an edge. */}
        <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
          <Image
            src={gown.image}
            alt={`${gown.name}: ${gown.silhouette}`}
            fill
            placeholder="blur"
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: gown.focus }}
          />
        </div>
      </div>
      <div data-reveal="item" className="px-2 pt-4 pb-2 sm:px-3">
        {/* Narrow cards stack name and price so every card in a row matches. */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-3">
          <h3 className={`font-serif font-medium ${featured ? "text-3xl" : "text-2xl"}`}>{gown.name}</h3>
          <p className="text-sm tabular-nums text-fg">from ${gown.rentalFrom}</p>
        </div>
        <div className="mt-1 flex items-end justify-between gap-3 text-sm text-fg-muted">
          <p className="text-pretty">
            {gown.silhouette}
            <span className="hidden sm:inline"> · {gown.sizes}</span>
            <span className="block sm:hidden">{gown.sizes}</span>
          </p>
          <span className="shrink-0 text-fg">
            <LinkStatusIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
