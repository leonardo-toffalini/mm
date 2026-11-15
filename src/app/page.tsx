import { ClosingCta } from "@/components/landing/closing-cta";
import { FeaturedCollection } from "@/components/landing/featured-collection";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonials } from "@/components/landing/testimonials";
import { PageMotion } from "@/components/motion/page-motion";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* Clip sideways overflow (decorative strokes) without affecting vertical flow. */}
      <main className="overflow-x-clip">
        <Hero />
        <FeaturedCollection />
        <HowItWorks />
        <Testimonials />
        <ClosingCta />
      </main>
      <SiteFooter />
      <PageMotion />
    </>
  );
}
