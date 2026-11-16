"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { gownsIn, orderQuery, rooms, sortGowns, type Gown } from "@/data/gowns";
import { studio } from "@/data/landing";
import { routes } from "@/lib/routes";
import { useOrder } from "@/lib/use-order";
import { GownKeys } from "./gown-keys";
import { TryOnToggle } from "./try-on-toggle";
import { formatPrice } from "@/lib/price";

/**
 * One gown at a time, nearly full height on a dark stage, like standing at
 * the fitting mirror. Arrows (and the arrow keys) step through the other
 * gowns in the same room, in the order the visitor chose on the collection;
 * the strip below jumps straight to one.
 */
export function GownStage({ gown }: { gown: Gown }) {
  const [order] = useOrder();
  const room = rooms.find((r) => r.occasion === gown.occasion)!;
  const roomGowns = sortGowns(gownsIn(gown.occasion), order);
  // By slug: the gown prop arrives from the server as a copy, not the same object.
  const index = roomGowns.findIndex((g) => g.slug === gown.slug);
  const prev = roomGowns[(index - 1 + roomGowns.length) % roomGowns.length];
  const next = roomGowns[(index + 1) % roomGowns.length];
  const query = orderQuery(order);
  const href = (g: Gown) => routes.gown(g.slug) + query;
  const back = (
    <Link
      href={`${routes.collection}${query}#${gown.slug}`}
      className="group inline-flex items-center gap-1.5 self-start text-sm font-medium text-inverse-fg-muted transition-colors hover:text-inverse-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
    >
      <ArrowLeft aria-hidden size={16} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
      Az összes {room.gownKind}
    </Link>
  );

  return (
    <section data-tone="dark" className="film-grain relative isolate bg-inverse text-inverse-fg">
      <GownKeys prev={href(prev)} next={href(next)} />
      {/* While the try-on list is docked at the bottom, the stage gives up its height. */}
      <Container className="flex min-h-svh flex-col pt-24 pb-4 [[data-try-on]_&]:min-h-[calc(100svh_-_72px)]">
        {/* On wide screens the back link heads the details column instead. */}
        <div className="lg:hidden">{back}</div>

        {/* Stacked on phones and tablets. From 1024px the details sit left of
            the photo. The photo's size depends only on the screen, so the
            arrows beside it never move between gowns. */}
        <div className="mt-6 grid flex-1 items-center gap-8 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-2 lg:gap-x-12">
          <div className="flex items-center justify-center gap-6 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <StepLink href={href(prev)} label={`Előző ruha: ${prev.name}`} direction="prev" />
            <div
              data-intro
              // On phones the photo is capped below half the screen so the price and
              // sizes reach the first screen. On wide screens it takes the
              // screen height left after the header and the
              // strip (about 210px), capped so the details keep at least 320px
              // of the (at most 80rem) page width beside it.
              className="relative aspect-[3/4] h-[46svh] overflow-hidden rounded-card bg-shade sm:h-[min(70svh,820px)] lg:h-[min(calc(100svh_-_210px),900px,calc((min(100vw,80rem)_-_592px)*4/3))] lg:[[data-try-on]_&]:h-[min(calc(100svh_-_282px),900px,calc((min(100vw,80rem)_-_592px)*4/3))]"
            >
              <Image
                src={gown.image}
                alt={`${gown.name}: ${gown.silhouette}`}
                fill
                placeholder="blur"
                priority
                sizes="(min-width: 640px) 600px, 100vw"
                quality={85}
                className="object-cover"
                style={{ objectPosition: gown.focus }}
              />
              {/* On phones the arrows sit on the photo. */}
              <div className="absolute inset-x-3 bottom-3 flex justify-between lg:hidden">
                <StepLink href={href(prev)} label={`Előző ruha: ${prev.name}`} direction="prev" overlay />
                <StepLink href={href(next)} label={`Következő ruha: ${next.name}`} direction="next" overlay />
              </div>
            </div>
            <StepLink href={href(next)} label={`Következő ruha: ${next.name}`} direction="next" />
          </div>

          {/* The name scales with its own column (cqi), so long names like
              "Séraphine" always fit beside the photo. */}
          <div className="@container lg:col-start-1 lg:row-start-1 lg:self-end">
            <div className="mb-10 hidden lg:block">{back}</div>
            <h1
              data-hero-headline
              data-intro
              className="-ml-[0.04em] font-display text-[3.25rem] leading-none font-normal tracking-[-0.02em] text-balance sm:text-7xl lg:text-[clamp(2.5rem,21cqi,5.5rem)]"
            >
              {gown.name}
            </h1>
            <p data-intro="fade" className="mt-5 max-w-xs text-lead text-pretty text-inverse-fg-muted">
              {gown.silhouette}
            </p>
          </div>

          <div data-intro="fade" className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className="text-lg tabular-nums">{formatPrice(gown.rentalFrom)}-tól</p>
            <p className="mt-2 text-inverse-fg-muted">Méret: {gown.sizes}</p>
            <p className="mt-1 text-inverse-fg-muted">
              {studio.rentalDays} napra, igazítással és tisztítással együtt
            </p>
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <TryOnToggle slug={gown.slug} name={gown.name} />
              {/* The try-on list's own button takes over booking while it shows. */}
              <ButtonLink href={routes.booking} size="lg" className="[[data-try-on]_&]:hidden">
                Ruhapróbát foglalok
              </ButtonLink>
            </div>
          </div>
        </div>

        <nav aria-label={`${room.name} kategória ruhái`} className="mt-8 flex items-center gap-4">
          <p className="shrink-0 text-sm tabular-nums text-inverse-fg-muted">
            {index + 1}/{roomGowns.length}
          </p>
          <ul data-strip className="-my-2 flex gap-2 overflow-x-auto py-2 pl-1 [scrollbar-width:none]">
            {roomGowns.map((g) => {
              const current = g.slug === gown.slug;
              return (
                <li key={g.slug} className="shrink-0">
                  <Link
                    href={href(g)}
                    aria-current={current ? "page" : undefined}
                    aria-label={g.name}
                    title={g.name}
                    className={`relative block h-16 w-12 overflow-hidden rounded-lg transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${current ? "ring-2 ring-inverse-fg ring-offset-2 ring-offset-inverse" : "opacity-55 hover:opacity-100 focus-visible:opacity-100"}`}
                  >
                    <Image src={g.image} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: g.focus }} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

type StepProps = { href: string; label: string; direction: "prev" | "next"; overlay?: boolean };

function StepLink({ href, label, direction, overlay = false }: StepProps) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      aria-label={label}
      className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${overlay ? "bg-shade/60 text-inverse-fg backdrop-blur-sm hover:bg-shade/80" : "hidden border border-inverse-fg/30 hover:border-inverse-fg hover:bg-inverse-fg/10 lg:grid"}`}
    >
      <Icon aria-hidden size={20} strokeWidth={1.75} />
    </Link>
  );
}
