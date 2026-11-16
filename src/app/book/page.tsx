import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "Ruhapróba foglalása – Magic Moment",
  description: "Ingyenes, 90 perces ruhapróba a szalonban. Válassz időpontot, hozz magaddal legfeljebb 3 főt, és próbáld fel a kiválasztott ruhákat.",
};

export default function BookPage() {
  return (
    <>
      <SiteHeader intro={false} solid book={false} />
      <main id="main">
        <BookingFlow />
      </main>
      <SiteFooter />
    </>
  );
}
