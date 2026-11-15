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
 */
export function PageMotion() {
  useGSAP(() => {
    window.__motionReady = true;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.documentElement.classList.remove("has-motion");
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      intro();
      heroScroll();
      header();
      reveals();
      parallax();

      return () => {
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
  if (!hero) return;
  const scrollTrigger = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
  gsap.to("[data-hero-media]", { yPercent: 30, ease: "none", scrollTrigger });
  gsap.to("[data-hero-content]", {
    yPercent: -12,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: { ...scrollTrigger, end: "70% top" },
  });
}

// The wordmark starts large and settles into the header; the header turns
// solid once the hero has gone.
function header() {
  const bar = document.querySelector<HTMLElement>("[data-header]");
  const logo = document.querySelector("[data-logo]");
  if (!bar || !logo) return;

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

  const items = gsap.utils.toArray<HTMLElement>("[data-reveal='item']");
  gsap.set(items, { y: 40, autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1, ease }),
  });

  const media = gsap.utils.toArray<HTMLElement>("[data-reveal='media']");
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
// its start as the section scrolls past. Long off-screen runs are skipped by
// starting and stopping the draw where the line is actually on screen.
function strokes() {
  const paths = gsap.utils.toArray<SVGPathElement>("[data-stroke-draw]");
  for (const path of paths) {
    const svg = path.ownerSVGElement;
    if (!svg || getComputedStyle(svg).display === "none") continue;

    // With a "1 1" dash, an offset of -s shows the path from s to its end, so
    // moving s from the last on-screen point to the first draws it in. Set
    // directly from scroll progress (Lenis already smooths the scroll); the
    // on-screen range is re-measured whenever ScrollTrigger refreshes.
    let [first, last] = [0, 1];
    const draw = (progress: number) => {
      path.style.strokeDashoffset = String(-(last - (last - first) * progress));
    };
    path.style.strokeDasharray = "1 1";
    ScrollTrigger.create({
      trigger: svg.parentElement,
      start: "top 80%",
      end: "bottom 35%",
      onRefresh: (self) => {
        [first, last] = onScreenRange(path);
        draw(self.progress);
      },
      onUpdate: (self) => draw(self.progress),
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

// The fractions of the path's length (0 = start, 1 = end) between which it is
// within the viewport horizontally.
function onScreenRange(path: SVGPathElement): [number, number] {
  const matrix = path.getScreenCTM();
  if (!matrix) return [0, 1];
  const length = path.getTotalLength();
  let first = 1;
  let last = 0;
  for (let i = 0; i <= 400; i++) {
    const s = i / 400;
    const point = path.getPointAtLength(s * length);
    const x = matrix.a * point.x + matrix.c * point.y + matrix.e;
    if (x >= 0 && x <= innerWidth) {
      first = Math.min(first, s);
      last = Math.max(last, s);
    }
  }
  return first <= last ? [first, last] : [0, 1];
}
