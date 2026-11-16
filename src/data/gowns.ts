// Mock collection until a backend exists: names, prices and sizes are
// placeholders. Photos are from Unsplash (free to use under the Unsplash
// License); the source of each is noted beside it.
import type { StaticImageData } from "next/image";
import beachBride from "@/assets/images/beach-bride.jpg";
import gownBed from "@/assets/images/gown-bed.jpg";
import gownHanger from "@/assets/images/gown-hanger.jpg";
import gownLaceMermaid from "@/assets/images/gown-lace-mermaid.jpg";
import gownLaceSleeves from "@/assets/images/gown-lace-sleeves.jpg";
import gownMannequin from "@/assets/images/gown-mannequin.jpg";
import gownMirror from "@/assets/images/gown-mirror.jpg";
import gownOffShoulder from "@/assets/images/gown-off-shoulder.jpg";
import gownSatinAline from "@/assets/images/gown-satin-aline.jpg";
import maternityEmpire from "@/assets/images/maternity-empire.jpg";
import maternityLace from "@/assets/images/maternity-lace.jpg";
import maternityWhite from "@/assets/images/maternity-white.jpg";
import promLilac from "@/assets/images/prom-lilac-ballgown.jpg";
import promPink from "@/assets/images/prom-pink-tulle.jpg";
import promSlip from "@/assets/images/prom-slip.jpg";
import roomBridal from "@/assets/images/room-bridal.jpg";
import roomMaternity from "@/assets/images/room-maternity.jpg";
import roomProm from "@/assets/images/room-prom.jpg";

export type Occasion = "bridal" | "prom" | "maternity";

export type Gown = {
  slug: string;
  name: string;
  occasion: Occasion;
  silhouette: string;
  sizes: string;
  rentalFrom: number;
  image: StaticImageData;
  /** CSS object-position, for photos whose subject isn't centred. */
  focus?: string;
};

export type Room = {
  occasion: Occasion;
  name: string;
  /** The room's gowns in a phrase, singular: "Az összes menyasszonyi ruha". */
  gownKind: string;
  intro: string;
  image: StaticImageData;
  imageAlt: string;
  focus?: string;
};

// In page order: bridal leads.
export const rooms: Room[] = [
  {
    occasion: "bridal",
    name: "Esküvő",
    gownKind: "menyasszonyi ruha",
    intro: "Hercegnős, csipkés és könnyed A-vonalú ruhák, mindegyiket a nagy nap előtt rád igazítjuk.",
    image: roomBridal, // unsplash.com/photos/EeDaZ4So3R0
    imageAlt: "Csipkés menyasszonyi ruha háta, bevont gombok sorával",
    focus: "60% 40%",
  },
  {
    occasion: "prom",
    name: "Szalagavató",
    gownKind: "szalagavatós ruha",
    intro: "Szatén, tüll és bő szoknyák a nagy estére, úgy igazítva, hogy egész éjjel táncolhass bennük.",
    image: roomProm, // unsplash.com/photos/7dCbl4BfoRc
    imageAlt: "Báli ruhás barátnők egymás mellett, csuklójukon virágdísszel",
    focus: "50% 85%", // low enough to show the dresses, not just the corsages
  },
  {
    occasion: "maternity",
    name: "Kismama",
    gownKind: "kismama menyasszonyi ruha",
    intro: "Empire vonalú, lágy esésű ruhák, amelyeket közvetlenül az esküvő előtt igazítunk rád, hogy akkor is tökéletesen álljanak.",
    image: roomMaternity, // unsplash.com/photos/r5b5CzrePow
    imageAlt: "Fehér ruhás kismama a tengerparti sziklákon ül naplementekor",
    focus: "45% 50%",
  },
];

export const gowns: Gown[] = [
  {
    slug: "seraphine",
    name: "Séraphine",
    occasion: "bridal",
    silhouette: "Hercegnős fazon, katedrális uszállyal",
    sizes: "34–48",
    rentalFrom: 190_000,
    image: gownBed,
  },
  {
    slug: "aurelie",
    name: "Aurélie",
    occasion: "bridal",
    silhouette: "Trombita fazon, francia csipke",
    sizes: "32–46",
    rentalFrom: 145_000,
    image: gownMirror,
  },
  {
    slug: "celeste",
    name: "Céleste",
    occasion: "bridal",
    silhouette: "Sellő fazon, gyöngyhímzéses tüll",
    sizes: "34–44",
    rentalFrom: 170_000,
    image: gownHanger,
  },
  {
    slug: "margot",
    name: "Margot",
    occasion: "bridal",
    silhouette: "Pánt nélküli, egyenes vonalú krepp",
    sizes: "32–50",
    rentalFrom: 130_000,
    image: gownMannequin,
  },
  {
    slug: "odette",
    name: "Odette",
    occasion: "bridal",
    silhouette: "Nyitott hátú, A-vonalú, puha tüll",
    sizes: "34–48",
    rentalFrom: 155_000,
    image: beachBride,
  },
  {
    slug: "juliette",
    name: "Juliette",
    occasion: "bridal",
    silhouette: "Pánt nélküli, A-vonalú szatén",
    sizes: "32–48",
    rentalFrom: 165_000,
    image: gownSatinAline, // unsplash.com/photos/HJWLIFZfozg
  },
  {
    slug: "isadora",
    name: "Isadora",
    occasion: "bridal",
    silhouette: "Csipkés sellő fazon, rövid uszállyal",
    sizes: "34–46",
    rentalFrom: 210_000,
    image: gownLaceMermaid, // unsplash.com/photos/0kd8P7rYk0A
  },
  {
    slug: "rosalind",
    name: "Rosalind",
    occasion: "bridal",
    silhouette: "Ejtett vállú csipke, bő szoknyarész",
    sizes: "32–50",
    rentalFrom: 150_000,
    image: gownOffShoulder, // unsplash.com/photos/so48cPZInjQ
    focus: "50% 25%",
  },
  {
    slug: "colette",
    name: "Colette",
    occasion: "bridal",
    silhouette: "Hosszú ujjú, testhez simuló csipke",
    sizes: "34–48",
    rentalFrom: 180_000,
    image: gownLaceSleeves, // unsplash.com/photos/j4__wyKtjJk
  },
  {
    slug: "lavande",
    name: "Lavande",
    occasion: "prom",
    silhouette: "Levendulaszínű, bő szoknyás, virágrátétekkel",
    sizes: "32–46",
    rentalFrom: 110_000,
    image: promLilac, // unsplash.com/photos/1N3L5vzgtxw
  },
  {
    slug: "camille",
    name: "Camille",
    occasion: "prom",
    silhouette: "Púderrózsaszín tüll, ejtett vállal",
    sizes: "32–48",
    rentalFrom: 90_000,
    image: promPink, // unsplash.com/photos/uGViIpoEEoE
  },
  {
    slug: "iris",
    name: "Iris",
    occasion: "prom",
    silhouette: "Ferdén szabott, kombiné fazonú szatén",
    sizes: "32–44",
    rentalFrom: 70_000,
    image: promSlip, // unsplash.com/photos/kyGHtudTPiw
    focus: "52% 60%",
  },
  {
    slug: "elodie",
    name: "Élodie",
    occasion: "maternity",
    silhouette: "Empire vonalú csipke midiruha",
    sizes: "34–50",
    rentalFrom: 140_000,
    image: maternityLace, // unsplash.com/photos/xdWc2cX_U8I
    focus: "62% 50%",
  },
  {
    slug: "clemence",
    name: "Clémence",
    occasion: "maternity",
    silhouette: "Átlapolt sifon, harangujjal",
    sizes: "34–52",
    rentalFrom: 125_000,
    image: maternityWhite, // unsplash.com/photos/wFKoYkJxjxM
  },
  {
    slug: "noemie",
    name: "Noémie",
    occasion: "maternity",
    silhouette: "Rakott, empire vonalú ruha",
    sizes: "36–52",
    rentalFrom: 120_000,
    image: maternityEmpire, // unsplash.com/photos/b6nm9mLAiL8
  },
];

export const gownsIn = (occasion: Occasion) => gowns.filter((g) => g.occasion === occasion);

export const orders = {
  featured: "Ajánlott",
  asc: "Ár: növekvő",
  desc: "Ár: csökkenő",
};
export type Order = keyof typeof orders;

export const isOrder = (value: unknown): value is Order => typeof value === "string" && value in orders;

export function sortGowns(list: Gown[], order: Order) {
  if (order === "featured") return list;
  const sign = order === "asc" ? 1 : -1;
  return [...list].sort((a, b) => sign * (a.rentalFrom - b.rentalFrom));
}

/** The query string that carries a chosen order between pages. */
export const orderQuery = (order: Order) => (order === "featured" ? "" : `?sort=${order}`);

export const findGown = (slug: string) => gowns.find((g) => g.slug === slug);
