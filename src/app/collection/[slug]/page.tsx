import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GownStage } from "@/components/collection/gown-stage";
import { TryOnTray } from "@/components/collection/try-on-tray";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { PageMotion } from "@/components/motion/page-motion";
import { findGown, gowns } from "@/data/gowns";

// Every real gown is prerendered (below), so navigating to one is instant.
// Unknown slugs must render on request to return a 404, and those aren't
// expected to be instant, so skip instant-navigation validation here.
export const instant = false;

export function generateStaticParams() {
  return gowns.map((gown) => ({ slug: gown.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[slug]">): Promise<Metadata> {
  const gown = findGown((await params).slug);
  if (!gown) return {};
  return {
    title: `${gown.name} — Magic Moment`,
    description: `${gown.silhouette}, sizes ${gown.sizes}, from $${gown.rentalFrom} to rent. Try it on at a free fitting.`,
  };
}

// params is awaited outside any Suspense boundary so unknown gowns get a real
// 404 (with Cache Components, dynamicParams isn't available to reject them).
export default async function GownPage({ params }: PageProps<"/collection/[slug]">) {
  const gown = findGown((await params).slug);
  if (!gown) notFound();

  return (
    <>
      <SiteHeader intro={false} solid />
      <main id="main">
        <GownStage gown={gown} />
      </main>
      <SiteFooter />
      <TryOnTray />
      <PageMotion />
    </>
  );
}
