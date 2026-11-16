import { getImageProps, type StaticImageData } from "next/image";
import { preload } from "react-dom";
import heroImage from "@/assets/images/hero-veil.jpg";
import { findGown, gownsIn, rooms } from "@/data/gowns";
import { routes } from "@/lib/routes";

// <Link> already prefetches each route's page; this warms the photos it opens
// on, so they don't start downloading only once the page has rendered. Each
// image must use the same sizes and quality as on its page, or the browser
// downloads a different file.
type Photo = { src: StaticImageData; sizes: string; quality?: number };

function photosFor(path: string): Photo[] {
  if (path === routes.home) return [{ src: heroImage, sizes: "100vw", quality: 85 }];
  if (path === routes.collection) {
    // shortcut: assumes the default order, so with another sort chosen the
    // wide mobile card may differ; fine since every card is preloaded anyway.
    const room = rooms[0];
    const list = gownsIn(room.occasion);
    return [
      { src: room.image, sizes: "100vw", quality: 85 },
      ...list.map((g, i) => ({
        src: g.image,
        sizes: `(min-width: 1280px) 400px, (min-width: 768px) 33vw, ${i === 0 && list.length % 2 === 1 ? "100vw" : "50vw"}`,
      })),
    ];
  }
  const gown = path.startsWith(routes.gown("")) && findGown(path.slice(routes.gown("").length));
  return gown ? [{ src: gown.image, sizes: "(min-width: 640px) 600px, 100vw", quality: 85 }] : [];
}

const warmed = new Set<string>();

/** Starts downloading the photos the page at `href` opens on (once per page). */
export function preloadRoute(href: string) {
  const { pathname } = new URL(href, location.href);
  if (warmed.has(pathname)) return;
  warmed.add(pathname);
  for (const { src, sizes, quality } of photosFor(pathname)) {
    const { props } = getImageProps({ src, alt: "", fill: true, sizes, quality });
    preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes });
  }
}
