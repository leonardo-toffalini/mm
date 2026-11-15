import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkStatusIcon } from "@/components/ui/link-status-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { featuredGowns, studio, type Gown } from "@/data/landing";
import { routes } from "@/lib/routes";

export function FeaturedCollection() {
  const [featured, ...rest] = featuredGowns;
  return (
    <section id="gowns" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          title={`Five of our ${studio.gownCount} gowns, each tailored to fit you`}
          action={<TextLink href={routes.collection}>See all {studio.gownCount} gowns</TextLink>}
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <li className="col-span-2 lg:row-span-2">
            <GownCard gown={featured} featured />
          </li>
          {rest.map((gown) => (
            <li key={gown.slug}>
              <GownCard gown={gown} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function GownCard({ gown, featured = false }: { gown: Gown; featured?: boolean }) {
  return (
    <Link
      href={routes.gown(gown.slug)}
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
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover"
          />
        </div>
      </div>
      <div data-reveal="item" className="px-2 pt-4 pb-2 sm:px-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className={`font-serif font-medium ${featured ? "text-3xl" : "text-2xl"}`}>{gown.name}</h3>
          <p className="text-sm tabular-nums text-fg">from ${gown.rentalFrom}</p>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 text-sm text-fg-muted">
          <p className="text-pretty">
            {gown.silhouette}
            <span className="hidden sm:inline"> · {gown.sizes}</span>
          </p>
          <span className="hidden shrink-0 sm:block">
            <LinkStatusIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
