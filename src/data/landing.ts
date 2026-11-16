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
  hours: "Hétfő–szombat 10–18 óra, bejelentkezéssel",
  email: "hello@magicmoment.example",
};

// The first gown is shown as the large featured card.
export const featuredGowns: Gown[] = ["seraphine", "aurelie", "celeste", "margot", "odette"].map(
  (slug) => findGown(slug)!,
);

export const steps = [
  {
    when: "Első alkalom",
    title: "Akár öt ruhát is felpróbálhatsz",
    body: `Ingyenes, ${studio.fittingMinutes} perces ruhapróba a szalonban, sietség nélkül. Anyukádat, a tanúdat is hozhatod, összesen legfeljebb ${studio.guests} főt.`,
  },
  {
    when: "Második alkalom",
    title: "Utolsó igazítás",
    body: "Nagyjából két héttel az esküvő előtt varrónőnk pontosan rád szabja a ruhát.",
  },
  {
    when: "Harmadik alkalom",
    title: "Átveszed, viseled, visszahozod",
    body: `Két nappal az esküvő előtt veheted át, és összesen ${studio.rentalDays} napig lehet nálad. A tisztítás benne van az árban.`,
  },
];

export const testimonials = [
  {
    quote:
      "Négy ruhát próbáltam fel, és a harmadiknál elsírtam magam. Mivel rám szabták, olyan volt, mintha mindig is az enyém lett volna.",
    name: "Zsófia",
    gown: "Aurélie",
    date: "2026. június",
  },
  {
    quote:
      "A próba nyugodt és bensőséges volt. Anyukám és a húgom is eljött, és senki sem siettetett minket.",
    name: "Hanna",
    gown: "Margot",
    date: "2025. szeptember",
  },
  {
    quote:
      "Egy kétmillió forintos ruhát viseltem 170 ezer forintért, és most nem porosodik a szekrényemben.",
    name: "Réka",
    gown: "Céleste",
    date: "2026. április",
  },
];
