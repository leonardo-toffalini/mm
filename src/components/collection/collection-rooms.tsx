"use client";

import { ArrowDownUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { gownsIn, orderQuery, orders, rooms, sortGowns, type Order, type Room } from "@/data/gowns";
import { studio } from "@/data/landing";
import { useOrder } from "@/lib/use-order";
import { GownCard } from "./gown-card";

/**
 * The collection walked room by room: each occasion opens on a full-bleed
 * photo, followed by its gowns. A bar that sticks below the header jumps
 * between rooms, shows which one you're in, and sorts every room by price.
 * The chosen order lives in the URL (?sort=), so it survives opening a gown
 * and coming back, and the gown pages step through gowns in the same order.
 */
export function CollectionRooms() {
  const [order, setOrder] = useOrder();
  const [current, setCurrent] = useState(rooms[0].occasion);

  // Arriving from a gown page (/collection?sort=…#slug): the browser jumps to
  // the card before the URL's order is applied, so jump again once it is.
  useEffect(() => {
    const card = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (card?.matches("li")) requestAnimationFrame(() => card.scrollIntoView({ block: "start" }));
  }, []);

  // The current room is the one (opener or gowns) crossing the middle band
  // of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent((entry.target as HTMLElement).dataset.room as Room["occasion"]);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const el of document.querySelectorAll("[data-room]")) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rooms are siblings of the bar, not wrapped, so the bar stays stuck
  // through all of them.
  return (
    <div>
      {rooms.map((room, i) => (
        <Fragment key={room.occasion}>
          <RoomOpener room={room} first={i === 0} />
          {i === 0 && <RoomBar current={current} order={order} onOrder={setOrder} />}
          <section
            data-room={room.occasion}
            aria-labelledby={`${room.occasion}-title`}
            className="pt-10 pb-24 lg:pt-14 lg:pb-32"
          >
            <Container>
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                {sortGowns(gownsIn(room.occasion), order).map((gown, i, list) => {
                  // In two columns, a room with an odd count leads with one wide
                  // card so it doesn't end on a lone one.
                  const wide = i === 0 && list.length % 2 === 1;
                  return (
                    // id: the gown page's back link returns to this card.
                    <li key={gown.slug} id={gown.slug} className={`scroll-mt-[160px] ${wide ? "max-md:col-span-2" : ""}`}>
                      <GownCard
                        gown={gown}
                        query={orderQuery(order)}
                        sizes={`(min-width: 1280px) 400px, (min-width: 768px) 33vw, ${wide ? "100vw" : "50vw"}`}
                      />
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        </Fragment>
      ))}
    </div>
  );
}

function RoomOpener({ room, first }: { room: Room; first: boolean }) {
  const gowns = gownsIn(room.occasion);
  const from = Math.min(...gowns.map((g) => g.rentalFrom));
  // The first room stands in for the page's hero (see page-motion.tsx): it
  // plays the intro and the header turns solid once it has gone.
  const motion = first
    ? {
        section: { "data-hero": "" },
        media: { "data-hero-media": "", "data-intro": "" },
        content: { "data-hero-content": "" },
        title: { "data-hero-headline": "", "data-intro": "" },
        text: { "data-intro": "fade" },
      }
    : { section: {}, media: { "data-parallax": "" }, content: {}, title: { "data-reveal": "heading" }, text: { "data-reveal": "item" } };

  return (
    <div
      {...motion.section}
      id={room.occasion}
      data-room={room.occasion}
      data-tone="dark"
      className={`film-grain relative isolate flex scroll-mt-[132px] flex-col justify-end overflow-hidden bg-inverse text-inverse-fg ${first ? "min-h-[78svh]" : "min-h-[56svh]"}`}
    >
      <div className="absolute inset-0 -z-10">
        <div {...motion.media} className={`absolute inset-x-0 ${first ? "inset-y-0" : "-inset-y-[10%]"}`}>
          <Image
            src={room.image}
            alt={room.imageAlt}
            fill
            placeholder="blur"
            sizes="100vw"
            quality={85}
            priority={first}
            className="object-cover"
            style={{ objectPosition: room.focus }}
          />
        </div>
        {/* Shade the left side and bottom, where the text sits. */}
        <div className="absolute inset-0 bg-gradient-to-r from-shade/85 via-shade/45 to-shade/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-shade/85 via-shade/20 to-transparent" />
        {first && <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-shade/50 to-transparent" />}
      </div>
      <Container {...motion.content} className="pt-40 pb-12 lg:pb-16">
        <h2
          {...motion.title}
          id={`${room.occasion}-title`}
          className="-ml-[0.04em] font-display text-[4rem] leading-none font-normal tracking-[-0.02em] sm:text-8xl lg:text-[6.5rem]"
        >
          {room.name}
        </h2>
        <div {...motion.text}>
          <p className="mt-6 max-w-lg text-lead text-pretty text-inverse-fg-muted">{room.intro}</p>
          <p className="mt-3 text-sm tabular-nums text-inverse-fg">
            {gowns.length} gowns · from ${from} for {studio.rentalDays} days, tailoring and cleaning included
          </p>
        </div>
      </Container>
    </div>
  );
}

type BarProps = { current: Room["occasion"]; order: Order; onOrder: (order: Order) => void };

// Sticks just below the fixed header, which is 76px tall.
function RoomBar({ current, order, onOrder }: BarProps) {
  return (
    <div className="sticky top-[76px] z-10 border-b border-fg/10 bg-page/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-2 sm:gap-4">
        <nav aria-label="Rooms" className="flex items-baseline gap-3 sm:gap-8">
          {rooms.map((room) => {
            const active = room.occasion === current;
            return (
              <a
                key={room.occasion}
                href={`#${room.occasion}`}
                aria-current={active ? "location" : undefined}
                className={`flex items-baseline gap-1.5 border-b-2 pb-0.5 font-serif text-base font-medium transition-colors min-[360px]:text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:text-2xl ${active ? "border-fg" : "border-transparent text-fg-muted hover:text-fg"}`}
              >
                {room.name}
                <span className="hidden font-sans text-xs tabular-nums sm:inline">{gownsIn(room.occasion).length}</span>
              </a>
            );
          })}
        </nav>
        <label className="flex items-center gap-2 text-sm">
          {/* On phones there's no room for the word, so an icon says "sort". */}
          <span className="sr-only text-fg-muted sm:not-sr-only">Sort</span>
          <span className="relative flex items-center">
            <ArrowDownUp aria-hidden size={16} strokeWidth={1.75} className="pointer-events-none absolute left-2.5 max-[359px]:hidden sm:hidden" />
            <select
              value={order}
              onChange={(e) => onOrder(e.target.value as Order)}
              className="cursor-pointer appearance-none rounded-full bg-surface py-2 pr-7 pl-3.5 text-[13px] font-medium sm:text-sm min-[360px]:pl-8 text-fg transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:pr-9 sm:pl-4"
            >
              {Object.entries(orders).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden size={16} strokeWidth={1.75} className="pointer-events-none absolute right-2.5 sm:right-3" />
          </span>
        </label>
      </Container>
    </div>
  );
}
