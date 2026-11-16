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
  intro: string;
  image: StaticImageData;
  imageAlt: string;
  focus?: string;
};

// In page order: bridal leads.
export const rooms: Room[] = [
  {
    occasion: "bridal",
    name: "Bridal",
    intro: "Ball gowns, lace sheaths and soft A-lines, each tailored to you before the day.",
    image: roomBridal, // unsplash.com/photos/EeDaZ4So3R0
    imageAlt: "The lace back of a wedding gown, with a row of covered buttons",
    focus: "60% 40%",
  },
  {
    occasion: "prom",
    name: "Prom",
    intro: "Satin, tulle and full skirts for the night, fitted so you can dance in them.",
    image: roomProm, // unsplash.com/photos/7dCbl4BfoRc
    imageAlt: "A row of friends in prom dresses wearing wrist corsages",
    focus: "50% 85%", // low enough to show the dresses, not just the corsages
  },
  {
    occasion: "maternity",
    name: "Maternity",
    intro: "Empire waists and soft drapes, altered close to the day so they fit as you are then.",
    image: roomMaternity, // unsplash.com/photos/r5b5CzrePow
    imageAlt: "A pregnant woman in a white gown sitting on rocks by the sea at sunset",
    focus: "45% 50%",
  },
];

export const gowns: Gown[] = [
  {
    slug: "seraphine",
    name: "Séraphine",
    occasion: "bridal",
    silhouette: "Ball gown with cathedral train",
    sizes: "US 2–16",
    rentalFrom: 380,
    image: gownBed,
  },
  {
    slug: "aurelie",
    name: "Aurélie",
    occasion: "bridal",
    silhouette: "Fit and flare, French lace",
    sizes: "US 0–14",
    rentalFrom: 290,
    image: gownMirror,
  },
  {
    slug: "celeste",
    name: "Céleste",
    occasion: "bridal",
    silhouette: "Mermaid, beaded tulle",
    sizes: "US 2–12",
    rentalFrom: 340,
    image: gownHanger,
  },
  {
    slug: "margot",
    name: "Margot",
    occasion: "bridal",
    silhouette: "Strapless crepe column",
    sizes: "US 0–18",
    rentalFrom: 260,
    image: gownMannequin,
  },
  {
    slug: "odette",
    name: "Odette",
    occasion: "bridal",
    silhouette: "Backless A-line, soft tulle",
    sizes: "US 2–16",
    rentalFrom: 310,
    image: beachBride,
  },
  {
    slug: "juliette",
    name: "Juliette",
    occasion: "bridal",
    silhouette: "Strapless satin A-line",
    sizes: "US 0–16",
    rentalFrom: 330,
    image: gownSatinAline, // unsplash.com/photos/HJWLIFZfozg
  },
  {
    slug: "isadora",
    name: "Isadora",
    occasion: "bridal",
    silhouette: "Lace mermaid with chapel train",
    sizes: "US 2–14",
    rentalFrom: 420,
    image: gownLaceMermaid, // unsplash.com/photos/0kd8P7rYk0A
  },
  {
    slug: "rosalind",
    name: "Rosalind",
    occasion: "bridal",
    silhouette: "Off-shoulder lace, full skirt",
    sizes: "US 0–18",
    rentalFrom: 300,
    image: gownOffShoulder, // unsplash.com/photos/so48cPZInjQ
    focus: "50% 25%",
  },
  {
    slug: "colette",
    name: "Colette",
    occasion: "bridal",
    silhouette: "Long-sleeve lace sheath",
    sizes: "US 2–16",
    rentalFrom: 360,
    image: gownLaceSleeves, // unsplash.com/photos/j4__wyKtjJk
  },
  {
    slug: "lavande",
    name: "Lavande",
    occasion: "prom",
    silhouette: "Lavender ball gown, appliqué flowers",
    sizes: "US 0–14",
    rentalFrom: 220,
    image: promLilac, // unsplash.com/photos/1N3L5vzgtxw
  },
  {
    slug: "camille",
    name: "Camille",
    occasion: "prom",
    silhouette: "Blush tulle, off-shoulder",
    sizes: "US 0–16",
    rentalFrom: 180,
    image: promPink, // unsplash.com/photos/uGViIpoEEoE
  },
  {
    slug: "iris",
    name: "Iris",
    occasion: "prom",
    silhouette: "Bias-cut satin slip",
    sizes: "US 0–12",
    rentalFrom: 140,
    image: promSlip, // unsplash.com/photos/kyGHtudTPiw
    focus: "52% 60%",
  },
  {
    slug: "elodie",
    name: "Élodie",
    occasion: "maternity",
    silhouette: "Empire-waist lace midi",
    sizes: "US 2–18",
    rentalFrom: 280,
    image: maternityLace, // unsplash.com/photos/xdWc2cX_U8I
    focus: "62% 50%",
  },
  {
    slug: "clemence",
    name: "Clémence",
    occasion: "maternity",
    silhouette: "Chiffon wrap, bell sleeves",
    sizes: "US 2–20",
    rentalFrom: 250,
    image: maternityWhite, // unsplash.com/photos/wFKoYkJxjxM
  },
  {
    slug: "noemie",
    name: "Noémie",
    occasion: "maternity",
    silhouette: "Pleated empire gown",
    sizes: "US 4–20",
    rentalFrom: 240,
    image: maternityEmpire, // unsplash.com/photos/b6nm9mLAiL8
  },
];

export const gownsIn = (occasion: Occasion) => gowns.filter((g) => g.occasion === occasion);

export const orders = {
  featured: "Our picks",
  asc: "Price: low",
  desc: "Price: high",
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
