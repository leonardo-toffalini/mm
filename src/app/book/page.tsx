import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "Book a fitting — Magic Moment",
  description: "Book a free 90-minute private fitting. Choose a time, bring up to 3 guests, and try on the gowns you picked.",
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
