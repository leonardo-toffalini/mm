// The salon's real Kotapska gowns, named by their catalogue code. Photos are
// from kotapska.com (used with permission), stored in
// src/assets/images/gowns/<code>/.
// shortcut: prices and sizes are placeholders, replace with the salon's real ones.
// Room photos are from Unsplash (free to use under the Unsplash License).
import type { StaticImageData } from "next/image";
import lb2303_1 from "@/assets/images/gowns/2303/2303_1.jpg";
import lb2303_2 from "@/assets/images/gowns/2303/2303_2.jpg";
import lb2303_3 from "@/assets/images/gowns/2303/2303_3.jpg";
import lb2306_1 from "@/assets/images/gowns/2306/2306_1.jpg";
import lb2306_2 from "@/assets/images/gowns/2306/2306_2.jpg";
import lb2306_3 from "@/assets/images/gowns/2306/2306_3.jpg";
import lb2308_1 from "@/assets/images/gowns/2308/2308_1.jpg";
import lb2308_2 from "@/assets/images/gowns/2308/2308_2.jpg";
import lb2308_3 from "@/assets/images/gowns/2308/2308_3.jpg";
import lb2309_1 from "@/assets/images/gowns/2309/2309_1.jpg";
import lb2309_2 from "@/assets/images/gowns/2309/2309_2.jpg";
import lb2309_3 from "@/assets/images/gowns/2309/2309_3.jpg";
import lb2311_1 from "@/assets/images/gowns/2311/2311_1.jpg";
import lb2311_2 from "@/assets/images/gowns/2311/2311_2.jpg";
import lb2311_3 from "@/assets/images/gowns/2311/2311_3.jpg";
import lb2311_4 from "@/assets/images/gowns/2311/2311_4.jpg";
import lb2314_1 from "@/assets/images/gowns/2314/2314_1.jpg";
import lb2314_2 from "@/assets/images/gowns/2314/2314_2.jpg";
import lb2314_3 from "@/assets/images/gowns/2314/2314_3.jpg";
import lb2335_1 from "@/assets/images/gowns/2335/2335_1.jpg";
import lb2335_2 from "@/assets/images/gowns/2335/2335_2.jpg";
import lb2335_3 from "@/assets/images/gowns/2335/2335_3.jpg";
import d2404_1 from "@/assets/images/gowns/2404/2404_1.jpg";
import d2404_2 from "@/assets/images/gowns/2404/2404_2.jpg";
import d2404_3 from "@/assets/images/gowns/2404/2404_3.jpg";
import d2409_1 from "@/assets/images/gowns/2409/2409_1.jpg";
import d2409_2 from "@/assets/images/gowns/2409/2409_2.jpg";
import d2409_3 from "@/assets/images/gowns/2409/2409_3.jpg";
import d2410_1 from "@/assets/images/gowns/2410/2410_1.jpg";
import d2410_2 from "@/assets/images/gowns/2410/2410_2.jpg";
import d2410_3 from "@/assets/images/gowns/2410/2410_3.jpg";
import d2412_1 from "@/assets/images/gowns/2412/2412_1.jpg";
import d2412_2 from "@/assets/images/gowns/2412/2412_2.jpg";
import d2412_3 from "@/assets/images/gowns/2412/2412_3.jpg";
import d2416_1 from "@/assets/images/gowns/2416/2416_1.jpg";
import d2416_2 from "@/assets/images/gowns/2416/2416_2.jpg";
import d2416_3 from "@/assets/images/gowns/2416/2416_3.jpg";
import d2416_4 from "@/assets/images/gowns/2416/2416_4.jpg";
import d2417_1 from "@/assets/images/gowns/2417/2417_1.jpg";
import d2417_2 from "@/assets/images/gowns/2417/2417_2.jpg";
import d2417_3 from "@/assets/images/gowns/2417/2417_3.jpg";
import d2422_1 from "@/assets/images/gowns/2422/2422_1.jpg";
import d2422_2 from "@/assets/images/gowns/2422/2422_2.jpg";
import d2422_3 from "@/assets/images/gowns/2422/2422_3.jpg";
import d2423_1 from "@/assets/images/gowns/2423/2423_1.jpg";
import d2423_2 from "@/assets/images/gowns/2423/2423_2.jpg";
import d2423_3 from "@/assets/images/gowns/2423/2423_3.jpg";
import d2430_1 from "@/assets/images/gowns/2430/2430_1.jpg";
import d2430_2 from "@/assets/images/gowns/2430/2430_2.jpg";
import d2430_3 from "@/assets/images/gowns/2430/2430_3.jpg";
import d2433_1 from "@/assets/images/gowns/2433/2433_1.jpg";
import d2433_2 from "@/assets/images/gowns/2433/2433_2.jpg";
import d2433_3 from "@/assets/images/gowns/2433/2433_3.jpg";
import d2434_1 from "@/assets/images/gowns/2434/2434_1.jpg";
import d2434_2 from "@/assets/images/gowns/2434/2434_2.jpg";
import d2434_3 from "@/assets/images/gowns/2434/2434_3.jpg";
import d2440_1 from "@/assets/images/gowns/2440/2440_1.jpg";
import d2440_2 from "@/assets/images/gowns/2440/2440_2.jpg";
import d2440_3 from "@/assets/images/gowns/2440/2440_3.jpg";
import lac2519_1 from "@/assets/images/gowns/2519/2519_1.jpg";
import lac2519_2 from "@/assets/images/gowns/2519/2519_2.jpg";
import lac2519_3 from "@/assets/images/gowns/2519/2519_3.jpg";
import lac2519_4 from "@/assets/images/gowns/2519/2519_4.jpg";
import f2601_1 from "@/assets/images/gowns/2601/2601_1.jpg";
import f2601_2 from "@/assets/images/gowns/2601/2601_2.jpg";
import f2601_3 from "@/assets/images/gowns/2601/2601_3.jpg";
import f2601_4 from "@/assets/images/gowns/2601/2601_4.jpg";
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
  /** The card and thumbnail photo: the first of `photos`. */
  image: StaticImageData;
  /** Every catalogue photo, in the catalogue's order. */
  photos: StaticImageData[];
  /** CSS object-position, for photos whose subject isn't centred. */
  focus?: string;
  /** A second room the gown is also shown in. */
  alsoIn?: Occasion;
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

const bridal = { occasion: "bridal", sizes: "34–46", rentalFrom: 150_000 } as const;
const prom = { occasion: "prom", sizes: "32–44", rentalFrom: 90_000 } as const;
const maternity = { occasion: "maternity", alsoIn: "bridal", sizes: "34–50", rentalFrom: 130_000 } as const;

export const gowns: Gown[] = ([
  { ...bridal, slug: "f-2601", name: "F 2601", silhouette: "Mély kivágású csipke felsőrész, tüllszoknya uszállyal", photos: [f2601_1, f2601_2, f2601_3, f2601_4] },
  { ...bridal, slug: "d-2412", name: "D 2412", silhouette: "Ejtett vállú, virágrátétes A-vonalú tüll", photos: [d2412_1, d2412_2, d2412_3] },
  { ...bridal, slug: "lac-2519", name: "LAC 2519", silhouette: "Csipkés felsőrész, könnyed tüllszoknya", photos: [lac2519_1, lac2519_2, lac2519_3, lac2519_4] },
  { ...bridal, slug: "d-2404", name: "D 2404", silhouette: "Csipkés sellő fazon, mély kivágással", photos: [d2404_1, d2404_2, d2404_3] },
  { ...bridal, slug: "d-2409", name: "D 2409", silhouette: "Vékony pántos csipkefűző, A-vonalú tüll", photos: [d2409_1, d2409_2, d2409_3] },
  { ...bridal, slug: "d-2410", name: "D 2410", silhouette: "Szívkivágású fűző, virágrátétes tüll", photos: [d2410_1, d2410_2, d2410_3] },
  { ...bridal, slug: "d-2416", name: "D 2416", silhouette: "Vékony pántos, mély V-kivágású szatén A-vonal", photos: [d2416_1, d2416_2, d2416_3, d2416_4] },
  { ...bridal, slug: "d-2417", name: "D 2417", silhouette: "Magas nyakú, hosszú ujjú csipke, tüllszoknya", photos: [d2417_1, d2417_2, d2417_3] },
  { ...bridal, slug: "d-2422", name: "D 2422", silhouette: "Fodros vállú, mély V-kivágású A-vonal", photos: [d2422_1, d2422_2, d2422_3] },
  { ...bridal, slug: "d-2423", name: "D 2423", silhouette: "Rövid csipkeujjú, mély V-kivágású A-vonal", photos: [d2423_1, d2423_2, d2423_3] },
  { ...bridal, slug: "d-2440", name: "D 2440", silhouette: "Háromnegyedes csipkeujjú hercegnős fazon", photos: [d2440_1, d2440_2, d2440_3] },
  { ...bridal, slug: "d-2430", name: "D 2430", silhouette: "Rövid csipkeujjú, bő tüllszoknya", photos: [d2430_1, d2430_2, d2430_3] },
  { ...bridal, slug: "d-2433", name: "D 2433", silhouette: "Mély V-kivágású csipke, lágy esésű A-vonal", photos: [d2433_1, d2433_2, d2433_3] },
  { ...bridal, slug: "d-2434", name: "D 2434", silhouette: "Vékony pántos csipkefűző, hercegnős tüll", photos: [d2434_1, d2434_2, d2434_3] },
  { ...bridal, slug: "lb-2335", name: "LB 2335", silhouette: "Hercegnős fazon, csipkés felsőrész áttetsző ujjakkal", photos: [lb2335_1, lb2335_2, lb2335_3] },
  { ...prom, slug: "lb-2303", name: "LB 2303", silhouette: "Csipkés felsőrész, A-vonalú tüllszoknya", photos: [lb2303_1, lb2303_2, lb2303_3] },
  { ...prom, slug: "lb-2306", name: "LB 2306", silhouette: "V-nyakú csipke felsőrész, könnyű tüllszoknya", photos: [lb2306_1, lb2306_2, lb2306_3] },
  { ...prom, slug: "lb-2309", name: "LB 2309", silhouette: "Széles pántos csipke felsőrész, A-vonalú tüll", photos: [lb2309_1, lb2309_2, lb2309_3] },
  { ...prom, slug: "lb-2308", name: "LB 2308", silhouette: "Mély V-kivágás, csipkerátétes tüll uszállyal", photos: [lb2308_1, lb2308_2, lb2308_3] },
  { ...maternity, slug: "lb-2311", name: "LB 2311", silhouette: "Rövid csipkeujjú, A-vonalú csipkeruha", photos: [lb2311_1, lb2311_2, lb2311_3, lb2311_4] },
  { ...maternity, slug: "lb-2314", name: "LB 2314", silhouette: "V-nyakú, csipkés A-vonalú ruha", photos: [lb2314_1, lb2314_2, lb2314_3] },
] satisfies Omit<Gown, "image">[]).map((g) => ({ ...g, image: g.photos[0] }));

export const gownsIn = (occasion: Occasion) => gowns.filter((g) => g.occasion === occasion || g.alsoIn === occasion);

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
