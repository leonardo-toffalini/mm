"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

const ease = "expo.out";
const xl = "(min-width: 1280px)";

// The intro plays only on a hard load, and scroll reveals only on a page's
// first visit: moving around the site (and the photo carried between a card
// and its gown page) shouldn't wait on motion already seen. Tracked by path
// change rather than per run, so React's dev double-run doesn't count twice.
const seen = new Set<string>();
let current = "";
let navigated = false;
let firstVisit = true;
function visit() {
  const path = location.pathname;
  if (path !== current) {
    if (current) navigated = true;
    firstVisit = !seen.has(path);
    seen.add(path);
    current = path;
  }
  return { hardLoad: !navigated, firstVisit };
}

/**
 * All page motion lives here, driven by data attributes on server-rendered
 * markup:
 *
 * - data-hero / data-hero-media / data-hero-content / data-hero-headline
 * - data-header, data-logo
 * - data-intro            hidden until the intro plays (see globals.css)
 * - data-reveal="heading" lines rise from a mask when scrolled into view
 * - data-reveal="item"    fades up, staggered with its neighbours
 * - data-reveal="media"   wipes open from the bottom, contents settle in
 * - data-parallax         drifts inside its (overflow-hidden) frame
 * - data-stroke-draw      brush-stroke path, drawn in as you scroll
 *
 * Nothing runs with prefers-reduced-motion; content is then simply visible.
 * Route changes animate separately, with view transitions (see globals.css).
 */
export function PageMotion() {
  useGSAP(() => {
    window.__motionReady = true;
    const { hardLoad, firstVisit } = visit();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.documentElement.classList.remove("has-motion");
      solidHeader();
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      if (hardLoad) intro();
      else gsap.set("[data-intro]", { visibility: "visible" });
      const undoReveals = firstVisit ? reveals() : undefined;
      heroScroll();
      header();
      solidHeader();
      parallax();

      return () => {
        undoReveals?.();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    // Strokes depend on which variant (wide or tall) is displayed.
    mm.add({ wide: xl, motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (context.conditions?.motion) return strokes();
    });
  });

  return null;
}

function intro() {
  gsap.set("[data-intro]", { visibility: "visible" });
  const tl = gsap.timeline({ defaults: { ease } });

  const media = document.querySelector("[data-hero-media]");
  if (media) {
    tl.fromTo(
      media,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
      0,
    ).from(media.querySelector("img"), { scale: 1.25, duration: 2.2 }, 0);
  }

  const headline = document.querySelector("[data-hero-headline]");
  if (headline) {
    SplitText.create(headline, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 160, duration: 1.3, stagger: 0.08, ease, delay: 0.35 }),
    });
  }

  tl.from("[data-intro='fade']", { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.8);
}

// The hero photo lags behind the scroll while the copy lifts and fades.
function heroScroll() {
  const hero = document.querySelector("[data-hero]");
  if (!hero?.querySelector("[data-hero-media]")) return;
  const scrollTrigger = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
  gsap.to("[data-hero-media]", { yPercent: 30, ease: "none", scrollTrigger });
  gsap.to("[data-hero-content]", {
    yPercent: -12,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: { ...scrollTrigger, end: "70% top" },
  });
}

// The wordmark starts large and settles into the header. It scales from the
// middle of its lowercase letters (origin-[0_62%]), not its box centre, so the
// letters the eye lines up with the nav never move as it grows or shrinks.
function header() {
  const logo = document.querySelector("[data-logo]");
  if (!logo) return;

  gsap.fromTo(
    logo,
    { scale: () => (innerWidth >= 1280 ? 1.6 : innerWidth < 768 ? 1.3 : 1) },
    {
      scale: 1,
      ease: "none",
      immediateRender: true,
      scrollTrigger: { start: 0, end: () => innerHeight * 0.4, scrub: 0.5, invalidateOnRefresh: true },
    },
  );
}

// The header turns solid once the hero has gone. Runs with reduced motion
// too: the transparent bar is unreadable over the light sections.
function solidHeader() {
  const bar = document.querySelector<HTMLElement>("[data-header]");
  if (!bar || !document.querySelector("[data-hero]")) return;

  ScrollTrigger.create({
    trigger: "[data-hero]",
    start: () => `bottom top+=${bar.offsetHeight}`,
    onEnter: () => bar.toggleAttribute("data-solid", true),
    onLeaveBack: () => bar.toggleAttribute("data-solid", false),
  });
}

function reveals() {
  for (const heading of gsap.utils.toArray<HTMLElement>("[data-reveal='heading']")) {
    SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 160,
          duration: 1.2,
          stagger: 0.1,
          ease,
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        }),
    });
  }

  // GSAP warns about empty targets, so skip what a page doesn't have.
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal='item']");
  if (items.length) revealItems(items);
  const media = gsap.utils.toArray<HTMLElement>("[data-reveal='media']");
  if (media.length) revealMedia(media);

  // The tweens that show items and media start later, from scroll callbacks,
  // outside the GSAP context, so reverting it alone would leave a page that
  // React keeps alive between routes stuck in the hidden start state.
  return () => {
    const shown = [...items, ...media, ...media.map((el) => el.firstElementChild!)];
    if (!shown.length) return;
    gsap.killTweensOf(shown);
    gsap.set(shown, { clearProps: "transform,opacity,visibility,clipPath" });
  };
}

function revealItems(items: HTMLElement[]) {
  gsap.set(items, { y: 40, autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1, ease }),
  });
}

function revealMedia(media: HTMLElement[]) {
  gsap.set(media, { clipPath: "inset(100% 0% 0% 0%)" });
  ScrollTrigger.batch(media, {
    start: "top 92%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.12, ease });
      gsap.from(
        batch.map((el) => el.firstElementChild),
        { scale: 1.2, duration: 1.8, stagger: 0.12, ease },
      );
    },
  });
}

function parallax() {
  for (const layer of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
    gsap.fromTo(
      layer,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
}

// Draws each visible brush stroke from its end (under the gown cards) towards
// its start as the page scrolls, each part appearing as it passes a line
// DRAW_LINE down the viewport, so the drawing keeps pace with the reader on
// any screen size. Stretches that run across or back up the page (the heart,
// the long side runs) have no such moment, so they draw at a steady pace.
const DRAW_LINE = 0.9;
// Scroll (px) per px of line for those stretches.
const ACROSS = 0.22;

function strokes() {
  const paths = gsap.utils.toArray<SVGPathElement>("[data-stroke-draw]");
  for (const path of paths) {
    const svg = path.ownerSVGElement;
    if (!svg || getComputedStyle(svg).display === "none") continue;

    // With an "L L" dash, an offset of -s*L shows the path from s to its end.
    // Real lengths, not pathLength: iPad Safari mishandles pathLength dashes.
    // The schedule is re-measured whenever ScrollTrigger refreshes.
    const length = path.getTotalLength();
    let headAt: (scroll: number) => number = () => 1;
    const draw = (scroll: number) => {
      path.style.strokeDashoffset = String(-headAt(scroll) * length);
    };
    path.style.strokeDasharray = `${length} ${length}`;
    ScrollTrigger.create({
      trigger: svg,
      start: "top bottom",
      end: "bottom top",
      onRefresh: (self) => {
        headAt = drawSchedule(path, self.scroll());
        draw(self.scroll());
      },
      onUpdate: (self) => draw(self.scroll()),
    });
  }
  // Clear inline dashes when the breakpoint or motion preference changes.
  return () => {
    for (const path of paths) {
      path.style.removeProperty("stroke-dasharray");
      path.style.removeProperty("stroke-dashoffset");
    }
  };
}

// Maps a scroll position to how far back from its end (as a fraction of its
// length) the path is drawn. Each point would ideally be drawn as it reaches
// the draw line, but the head only moves one way and at most 1/ACROSS px of
// line per px of scroll. Holding points back until they reach the line makes a
// loop that rises up the page (the heart) draw late, near the top of the
// screen; pulling them forward makes it draw early, below the fold. The
// schedule is the average of the two. Parts off the sides of the screen cost
// nothing and are never drawn.
function drawSchedule(path: SVGPathElement, scroll: number): (scroll: number) => number {
  const matrix = path.getScreenCTM();
  if (!matrix) return () => 0;
  const length = path.getTotalLength();
  const points: { s: number; x: number; y: number }[] = [];
  for (let i = 0; i <= 400; i++) {
    const s = i / 400;
    const { x, y } = path.getPointAtLength(s * length);
    points.push({
      s,
      x: matrix.a * x + matrix.c * y + matrix.e,
      y: matrix.b * x + matrix.d * y + matrix.f + scroll,
    });
  }
  const onScreen = (p: { x: number }) => p.x >= 0 && p.x <= innerWidth;
  const first = points.findIndex(onScreen);
  if (first === -1) return () => 0;
  const last = points.findLastIndex(onScreen);

  const lead = DRAW_LINE * innerHeight;
  const gap = (i: number) => {
    const [a, b] = [points[i], points[i + 1]];
    return onScreen(a) ? Math.hypot(a.x - b.x, a.y - b.y) * ACROSS : 0;
  };
  // due[k] is when points[last - k] is drawn; never decreasing.
  const late = [points[last].y - lead];
  for (let i = last - 1; i >= first; i--) late.push(Math.max(late.at(-1)! + gap(i), points[i].y - lead));
  const early = [points[first].y - lead];
  for (let i = first + 1; i <= last; i++) early.push(Math.min(early.at(-1)! - gap(i - 1), points[i].y - lead));
  early.reverse();
  const due = late.map((t, k) => (t + early[k]) / 2);

  return (now) => {
    if (now < due[0]) return points[last].s;
    const k = due.findIndex((t) => t > now);
    if (k === -1) return points[first].s;
    // Between points[last - k + 1] (due[k - 1]) and points[last - k] (due[k]).
    const f = (now - due[k - 1]) / (due[k] - due[k - 1]);
    return points[last - k + 1].s - f / 400;
  };
}
