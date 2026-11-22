import { ClosingCta } from "@/components/landing/closing-cta";
import { FeaturedCollection } from "@/components/landing/featured-collection";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonials } from "@/components/landing/testimonials";
import { PageMotion } from "@/components/motion/page-motion";
import { studio } from "@/data/landing";
import { siteUrl } from "@/lib/routes";

// Business details for search engines (Google's local results and Maps).
const business = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Magic Moment",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  telephone: studio.phone,
  email: studio.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.address,
    postalCode: studio.city.split(" ")[0],
    addressLocality: "Budapest",
    addressCountry: "HU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 47.5053494, longitude: 19.0692495 },
  hasMap: studio.mapsUrl,
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "13:00" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      {/* Clip sideways overflow (decorative strokes) without affecting vertical flow. */}
      <main id="main" className="overflow-x-clip">
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
