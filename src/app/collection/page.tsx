import type { Metadata } from "next";
import { CollectionRooms } from "@/components/collection/collection-rooms";
import { TryOnTray } from "@/components/collection/try-on-tray";
import { ClosingCta } from "@/components/landing/closing-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { PageMotion } from "@/components/motion/page-motion";

export const metadata: Metadata = {
  title: "A kollekció – Magic Moment",
  description: "Menyasszonyi, kismama és szalagavatós ruhák kölcsönzése. Válaszd ki, melyiket szeretnéd felpróbálni a ruhapróbán.",
};

export default function CollectionPage() {
  return (
    <>
      <SiteHeader intro={false} />
      <main id="main" className="overflow-x-clip">
        <h1 className="sr-only">A kollekció</h1>
        <CollectionRooms />
        <ClosingCta />
      </main>
      <SiteFooter />
      <TryOnTray />
      <PageMotion />
    </>
  );
}
