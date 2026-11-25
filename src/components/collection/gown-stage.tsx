"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useSyncExternalStore, ViewTransition, type RefObject } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { gownsIn, orderQuery, rooms, sortGowns, type Gown } from "@/data/gowns";
import { studio } from "@/data/landing";
import { routes } from "@/lib/routes";
import { useOrder } from "@/lib/use-order";
import { GownKeys, step } from "./gown-keys";
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
  const photo = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  // Which photo shows; a new gown starts on its first.
  const [view, setView] = useState({ slug: gown.slug, i: 0 });
  const shown = view.slug === gown.slug ? view.i : 0;
  const setShown = (i: number) => setView({ slug: gown.slug, i });

  // Jumps the photo track to one photo, fading it in, as the picks beside the frame do.
  const pick = (i: number) => {
    const el = track.current;
    if (!el || i === shown) return;
    const slide = photoSlide(el, i);
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "instant" });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    slide.animate([{ opacity: reduce ? 0.6 : 0.3 }, { opacity: 1 }], { duration: 250, easing: "ease-out" });
  };

  // After a step, the new gown slides in from the side the visitor moved
  // towards (only fading with reduced motion). Arriving from a card instead
  // morphs the card's photo into this one (the ViewTransition below).
  useLayoutEffect(() => {
    const direction = step.direction;
    step.direction = 0;
    if (!direction || !photo.current) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    photo.current.animate(
      reduce
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ opacity: 0, transform: `translateX(${direction * 8}%)` }, { opacity: 1, transform: "none" }],
      { duration: reduce ? 200 : 500, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
  }, [gown.slug]);
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
            {/* From 1024px the gown's photos stand as prints beside the frame. */}
            <div className="flex items-end gap-3">
              {/* Grows from the gown's card, and back into it. */}
              <ViewTransition name={`gown-${gown.slug}`} share="gown-morph" default="none">
                <div
                  ref={photo}
                  data-intro
                  // On phones the photo is capped below half the screen so the price and
                  // sizes reach the first screen. On wide screens it takes the
                  // screen height left after the header and the
                  // strip (about 210px), capped so the details keep at least 320px
                  // of the (at most 80rem) page width beside it, after the arrows
                  // and the photo picks.
                  className="relative aspect-[3/4] h-[46svh] overflow-hidden rounded-card bg-shade sm:h-[min(70svh,820px)] lg:h-[min(calc(100svh_-_210px),900px,calc((min(100vw,80rem)_-_652px)*4/3))] lg:[[data-try-on]_&]:h-[min(calc(100svh_-_282px),900px,calc((min(100vw,80rem)_-_652px)*4/3))]"
                >
                  {/* Keyed so each gown opens on its first photo. */}
                  <GownPhotos key={gown.slug} gown={gown} track={track} shown={shown} onShown={setShown} />
                  {/* On phones the arrows sit on the photo. */}
                  <div className="absolute inset-x-3 bottom-3 flex justify-between lg:hidden">
                    <StepLink href={href(prev)} label={`Előző ruha: ${prev.name}`} direction="prev" overlay />
                    <StepLink href={href(next)} label={`Következő ruha: ${next.name}`} direction="next" overlay />
                  </div>
                </div>
              </ViewTransition>
              <PhotoPicks gown={gown} shown={shown} onPick={pick} />
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
            {roomGowns.map((g, i) => {
              const current = g.slug === gown.slug;
              return (
                <li key={g.slug} className="shrink-0">
                  <Link
                    href={href(g)}
                    onNavigate={() => (step.direction = i < index ? -1 : 1)}
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

type PhotosProps = {
  gown: Gown;
  track: RefObject<HTMLUListElement | null>;
  shown: number;
  onShown: (i: number) => void;
};

/**
 * The gown's photos side by side in the frame, one at a time: swiped (or
 * scrolled with a trackpad) sideways, snapping to each. The arrows beside
 * the frame belong to stepping between gowns, so the photos get no arrows
 * of their own. Below 1024px a mark per photo along the top shows where you
 * are and jumps to one; wider, the picks beside the frame do that.
 */
function GownPhotos({ gown, track, shown, onShown }: PhotosProps) {
  const count = gown.photos.length;
  const loops = count > 1;
  // The copy of the last photo before the first is left out of the server's
  // HTML, which can't scroll past it, and added once the page runs.
  const running = useSyncExternalStore(noSubscribe, () => true, () => false);
  const settle = useRef(0);

  // Start on the real first photo, past the copy of the last.
  useLayoutEffect(() => {
    const el = track.current;
    const first = el && photoSlide(el, 0);
    if (running && loops && first) el.scrollTo({ left: first.offsetLeft, behavior: "instant" });
  }, [running, loops, track]);

  const show = (i: number) => {
    const el = track.current;
    const slide = el && photoSlide(el, i);
    if (!slide) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: slide.offsetLeft, behavior: reduce ? "instant" : "smooth" });
  };

  const onScroll = (el: HTMLUListElement) => {
    const slide = el.children[Math.round(el.scrollLeft / el.clientWidth)] as HTMLElement | undefined;
    if (!slide) return;
    onShown(Number(slide.dataset.photo));
    // Landing on a copy at either end jumps, unseen, to the photo it copies,
    // so swiping on from the last photo carries on to the first and back.
    clearTimeout(settle.current);
    if (slide.dataset.copy === undefined) return;
    settle.current = window.setTimeout(() => {
      const real = photoSlide(el, Number(slide.dataset.photo));
      if (real) el.scrollTo({ left: real.offsetLeft, behavior: "instant" });
    }, 120);
  };

  const slides = loops
    ? [
        ...(running ? [{ src: gown.photos[count - 1], photo: count - 1, copy: true }] : []),
        ...gown.photos.map((src, photo) => ({ src, photo, copy: false })),
        { src: gown.photos[0], photo: 0, copy: true },
      ]
    : gown.photos.map((src, photo) => ({ src, photo, copy: false }));

  return (
    <>
      <ul
        ref={track}
        onScroll={(e) => onScroll(e.currentTarget)}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map(({ src, photo, copy }) => (
          <li
            key={`${copy ? "copy" : "photo"}-${photo}`}
            data-photo={photo}
            data-copy={copy || undefined}
            className="relative h-full w-full shrink-0 snap-start snap-always"
            aria-hidden={copy || photo !== shown || undefined}
          >
            <Image
              src={src}
              alt={copy ? "" : photo === 0 ? `${gown.name}: ${gown.silhouette}` : `${gown.name}, ${photo + 1}. fotó`}
              fill
              placeholder="blur"
              priority={!copy && photo === 0}
              // The other photos load before they're swiped or hovered to.
              loading={!copy && photo === 0 ? undefined : "eager"}
              sizes="(min-width: 640px) 600px, 100vw"
              quality={85}
              className="object-cover"
              style={{ objectPosition: gown.focus }}
            />
          </li>
        ))}
      </ul>
      {gown.photos.length > 1 && (
        <div className="lg:hidden">
          {/* Keeps the marks legible over bright skies. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-shade/45 to-transparent" />
          <div role="group" aria-label={`${gown.name} fotói`} className="absolute inset-x-3 top-2 flex gap-1.5 sm:inset-x-4 sm:top-3">
            {gown.photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => show(i)}
                aria-label={`${i + 1}. fotó`}
                aria-current={i === shown || undefined}
                className="group/mark h-6 flex-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"
              >
                <span
                  className={`block h-0.5 rounded-full transition-[background-color,height] duration-300 ease-out group-hover/mark:h-1 ${i === shown ? "bg-inverse-fg" : "bg-inverse-fg/40 group-hover/mark:bg-inverse-fg/70"}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const noSubscribe = () => () => {};

/** The track's slide for a photo: the real one, never an end copy. */
const photoSlide = (track: HTMLElement, i: number) =>
  track.querySelector<HTMLElement>(`[data-photo="${i}"]:not([data-copy])`);

/**
 * From 1024px: the gown's photos as small prints standing beside the frame,
 * like a contact sheet. Hovering (or focusing) one shows it in the frame.
 */
function PhotoPicks({ gown, shown, onPick }: { gown: Gown; shown: number; onPick: (i: number) => void }) {
  if (gown.photos.length < 2) return null;
  return (
    <ul aria-label={`${gown.name} fotói`} className="hidden flex-col gap-2 lg:flex">
      {gown.photos.map((src, i) => {
        const current = i === shown;
        return (
          <li key={i}>
            <button
              type="button"
              onPointerEnter={(e) => e.pointerType === "mouse" && onPick(i)}
              onFocus={() => onPick(i)}
              onClick={() => onPick(i)}
              aria-label={`${i + 1}. fotó`}
              aria-current={current || undefined}
              className={`relative block h-16 w-12 overflow-hidden rounded-lg transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${current ? "ring-2 ring-inverse-fg ring-offset-2 ring-offset-inverse" : "opacity-55 hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: gown.focus }} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

type StepProps = { href: string; label: string; direction: "prev" | "next"; overlay?: boolean };

function StepLink({ href, label, direction, overlay = false }: StepProps) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      onNavigate={() => (step.direction = direction === "prev" ? -1 : 1)}
      aria-label={label}
      className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${overlay ? "bg-shade/60 text-inverse-fg backdrop-blur-sm hover:bg-shade/80" : "hidden border border-inverse-fg/30 hover:border-inverse-fg hover:bg-inverse-fg/10 lg:grid"}`}
    >
      <Icon aria-hidden size={20} strokeWidth={1.75} />
    </Link>
  );
}
