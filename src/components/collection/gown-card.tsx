import Image from "next/image";
import Link from "next/link";
import { LinkStatusIcon } from "@/components/ui/link-status-icon";
import type { Gown } from "@/data/gowns";
import { routes } from "@/lib/routes";
import { formatPrice } from "@/lib/price";

type Props = {
  gown: Gown;
  featured?: boolean;
  /** Image `sizes` for the card's width in its grid. */
  sizes: string;
  /** Appended to the gown link, e.g. the collection's chosen order. */
  query?: string;
};

// The photo is the card: name, price and fit are set over an olive-ink shade
// with film grain, like the room openers.
export function GownCard({ gown, featured = false, sizes, query = "" }: Props) {
  return (
    <Link
      href={routes.gown(gown.slug) + query}
      data-tone="dark"
      className={`group @container film-grain relative isolate flex h-full flex-col justify-end overflow-hidden rounded-card bg-inverse text-inverse-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus ${featured ? "aspect-[3/4] lg:aspect-auto" : "aspect-[3/4]"}`}
    >
      <div data-reveal="media" className="absolute inset-0 -z-10">
        {/* Taller than the frame so the parallax drift never shows an edge. */}
        <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
          <Image
            src={gown.image}
            alt={`${gown.name}: ${gown.silhouette}`}
            fill
            placeholder="blur"
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: gown.focus }}
          />
        </div>
        {/* Reaches higher on narrow cards, where the text takes up more of it. */}
        <div className="absolute inset-0 bg-linear-to-t from-shade/95 via-shade/70 via-50% to-transparent to-90% @xs:via-35% @xs:to-70%" />
      </div>
      <div data-reveal="item" className={`p-3 sm:p-5 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-serif leading-tight font-medium ${featured ? "text-3xl lg:text-4xl" : "text-xl sm:text-2xl"}`}>
            {gown.name}
          </h3>
          <span className="shrink-0">
            <LinkStatusIcon />
          </span>
        </div>
        <p className="mt-1 text-sm tabular-nums">{formatPrice(gown.rentalFrom)}-tól</p>
        <p className="mt-1 text-sm text-inverse-fg-muted">
          <span className="line-clamp-1">{gown.silhouette}</span>
          <span className="tabular-nums">Méret: {gown.sizes}</span>
        </p>
      </div>
    </Link>
  );
}
