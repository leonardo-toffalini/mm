import type { Metadata } from "next";
import { CollectionRooms } from "@/components/collection/collection-rooms";
import { TryOnTray } from "@/components/collection/try-on-tray";
import { ClosingCta } from "@/components/landing/closing-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { PageMotion } from "@/components/motion/page-motion";

export const metadata: Metadata = {
  title: "The collection — Magic Moment",
  description: "Bridal, prom and maternity gowns to rent, each tailored to fit you. Choose the ones to try on at your fitting.",
};

export default function CollectionPage() {
  return (
    <>
      <SiteHeader intro={false} />
      <main id="main" className="overflow-x-clip">
        <h1 className="sr-only">The collection</h1>
        <CollectionRooms />
        <ClosingCta />
      </main>
      <SiteFooter />
      <TryOnTray />
      <PageMotion />
    </>
  );
}
