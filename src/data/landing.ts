// Mock content for the landing page until a backend exists.
// Photos are from Unsplash (free to use under the Unsplash License).
import type { StaticImageData } from "next/image";
import beachBride from "@/assets/images/beach-bride.jpg";
import gownBed from "@/assets/images/gown-bed.jpg";
import gownHanger from "@/assets/images/gown-hanger.jpg";
import gownMannequin from "@/assets/images/gown-mannequin.jpg";
import gownMirror from "@/assets/images/gown-mirror.jpg";

export type Gown = {
  slug: string;
  name: string;
  silhouette: string;
  sizes: string;
  rentalFrom: number;
  image: StaticImageData;
};

export const studio = {
  gownCount: 64,
  rentalFrom: 260,
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
export const featuredGowns: Gown[] = [
  {
    slug: "seraphine",
    name: "Séraphine",
    silhouette: "Ball gown with cathedral train",
    sizes: "US 2–16",
    rentalFrom: 380,
    image: gownBed,
  },
  {
    slug: "aurelie",
    name: "Aurélie",
    silhouette: "Fit and flare, French lace",
    sizes: "US 0–14",
    rentalFrom: 290,
    image: gownMirror,
  },
  {
    slug: "celeste",
    name: "Céleste",
    silhouette: "Mermaid, beaded tulle",
    sizes: "US 2–12",
    rentalFrom: 340,
    image: gownHanger,
  },
  {
    slug: "margot",
    name: "Margot",
    silhouette: "Strapless crepe column",
    sizes: "US 0–18",
    rentalFrom: 260,
    image: gownMannequin,
  },
  {
    slug: "odette",
    name: "Odette",
    silhouette: "Backless A-line, soft tulle",
    sizes: "US 2–16",
    rentalFrom: 310,
    image: beachBride,
  },
];

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
