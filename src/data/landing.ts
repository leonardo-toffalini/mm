// Landing page content.
import { findGown, gownsIn, type Gown } from "./gowns";

export type { Gown };

export const studio = {
  rentalFrom: Math.min(...gownsIn("bridal").map((g) => g.rentalFrom)),
  fittingMinutes: 90,
  rentalDays: 5,
  guests: 3,
  rating: 5,
  reviewCount: 71,
  address: "Király utca 87.",
  city: "1077 Budapest",
  hours: "Hétfő–péntek 10–18, szombat 10–13 óra, bejelentkezéssel",
  phone: "+36 20 986 3390",
  email: "info@eliteszalon.hu",
  mapsUrl: "https://maps.app.goo.gl/9JgviQajiUBwJV1h9",
};

// The first gown is shown as the large featured card.
export const featuredGowns: Gown[] = ["f-2601", "d-2412", "d-2416", "d-2417", "lb-2335"].map(
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

// Real Google reviews (Maps, November 2026), quoted word for word; longer
// ones are cut to their most fitting sentences. Dates are approximate:
// Google only shows "egy hónapja" and the like.
export const testimonials = [
  {
    quote:
      "Maximálisan elégedett vagyok a szalonnal! Rendkívül figyelmes, segítőkész szolgáltatásban volt részem minden ruhapróbán.",
    name: "Anna",
    date: "2026. november",
  },
  {
    quote:
      "Már első alkalommal sikerült megtalálnom náluk az álomruhámat a szalagavatómra! Gyönyörű ruhák, hatalmas választék.",
    name: "Judit",
    date: "2026. október",
  },
  {
    quote:
      "Több szalonban voltam a ruhakeresés során, de egyben sem találkoztam ilyen barátságos hozzáállással és szinte családias hangulattal.",
    name: "Lili",
    date: "2026. szeptember",
  },
];
