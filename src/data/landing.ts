// Mock content for the landing page until a backend exists.
import { findGown, gowns, gownsIn, type Gown } from "./gowns";

export type { Gown };

export const studio = {
  gownCount: gowns.length,
  rentalFrom: Math.min(...gownsIn("bridal").map((g) => g.rentalFrom)),
  fittingMinutes: 90,
  rentalDays: 5,
  guests: 3,
  rating: 4.9,
  reviewCount: 312,
  address: "14 Rosewood Lane, Suite 2",
  city: "Portland, OR",
  hours: "Tue–Sat, 10am–6pm, by appointment",
  email: "hello@magicmoment.example",
};

// The first gown is shown as the large featured card.
export const featuredGowns: Gown[] = ["seraphine", "aurelie", "celeste", "margot", "odette"].map(
  (slug) => findGown(slug)!,
);

export const steps = [
  {
    when: "Visit 1",
    title: "Try on up to five gowns",
    body: `A free ${studio.fittingMinutes}-minute private fitting with a stylist. Bring up to ${studio.guests} guests.`,
  },
  {
    when: "Visit 2",
    title: "Final alterations",
    body: "About two weeks before the wedding, our seamstress tailors your gown to fit you exactly.",
  },
  {
    when: "Visit 3",
    title: "Collect, wear, return",
    body: `Pick it up two days before. You have ${studio.rentalDays} days in total, and cleaning is included.`,
  },
];

export const testimonials = [
  {
    quote:
      "I tried on four gowns and cried at the third. Having it tailored to me made it feel like it was always mine.",
    name: "Sofia",
    gown: "Aurélie",
    date: "June 2026",
  },
  {
    quote:
      "The fitting was relaxed and private. My mum and sister came along and nobody rushed us.",
    name: "Hannah",
    gown: "Margot",
    date: "September 2025",
  },
  {
    quote:
      "I wore a $4,000 designer gown for $340, and there's nothing sitting in my closet afterwards.",
    name: "Amara",
    gown: "Céleste",
    date: "April 2026",
  },
];
