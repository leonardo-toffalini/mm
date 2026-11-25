// The salon's real Kotapska gowns, named by their catalogue code. Photos are
// from kotapska.com (used with permission); each gown's full set is in
// src/assets/images/gowns/<code>/, only the first is shown for now.
// shortcut: prices and sizes are placeholders, replace with the salon's real ones.
// Room photos are from Unsplash (free to use under the Unsplash License).
import type { StaticImageData } from "next/image";
import lb2303 from "@/assets/images/gowns/2303/2303_1.jpg";
import lb2306 from "@/assets/images/gowns/2306/2306_1.jpg";
import lb2308 from "@/assets/images/gowns/2308/2308_1.jpg";
import lb2309 from "@/assets/images/gowns/2309/2309_1.jpg";
import lb2311 from "@/assets/images/gowns/2311/2311_1.jpg";
import lb2314 from "@/assets/images/gowns/2314/2314_1.jpg";
import lb2335 from "@/assets/images/gowns/2335/2335_1.jpg";
import d2404 from "@/assets/images/gowns/2404/2404_1.jpg";
import d2409 from "@/assets/images/gowns/2409/2409_1.jpg";
import d2410 from "@/assets/images/gowns/2410/2410_1.jpg";
import d2412 from "@/assets/images/gowns/2412/2412_1.jpg";
import d2416 from "@/assets/images/gowns/2416/2416_1.jpg";
import d2417 from "@/assets/images/gowns/2417/2417_1.jpg";
import d2422 from "@/assets/images/gowns/2422/2422_1.jpg";
import d2423 from "@/assets/images/gowns/2423/2423_1.jpg";
import d2430 from "@/assets/images/gowns/2430/2430_1.jpg";
import d2433 from "@/assets/images/gowns/2433/2433_1.jpg";
import d2434 from "@/assets/images/gowns/2434/2434_1.jpg";
import d2440 from "@/assets/images/gowns/2440/2440_1.jpg";
import lac2519 from "@/assets/images/gowns/2519/2519_1.jpg";
import f2601 from "@/assets/images/gowns/2601/2601_1.jpg";
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

export const gowns: Gown[] = [
  { ...bridal, slug: "f-2601", name: "F 2601", silhouette: "Mély kivágású csipke felsőrész, tüllszoknya uszállyal", image: f2601 },
  { ...bridal, slug: "d-2412", name: "D 2412", silhouette: "Ejtett vállú, virágrátétes A-vonalú tüll", image: d2412 },
  { ...bridal, slug: "lac-2519", name: "LAC 2519", silhouette: "Csipkés felsőrész, könnyed tüllszoknya", image: lac2519 },
  { ...bridal, slug: "d-2404", name: "D 2404", silhouette: "Csipkés sellő fazon, mély kivágással", image: d2404 },
  { ...bridal, slug: "d-2409", name: "D 2409", silhouette: "Vékony pántos csipkefűző, A-vonalú tüll", image: d2409 },
  { ...bridal, slug: "d-2410", name: "D 2410", silhouette: "Szívkivágású fűző, virágrátétes tüll", image: d2410 },
  { ...bridal, slug: "d-2416", name: "D 2416", silhouette: "Vékony pántos, mély V-kivágású szatén A-vonal", image: d2416 },
  { ...bridal, slug: "d-2417", name: "D 2417", silhouette: "Magas nyakú, hosszú ujjú csipke, tüllszoknya", image: d2417 },
  { ...bridal, slug: "d-2422", name: "D 2422", silhouette: "Fodros vállú, mély V-kivágású A-vonal", image: d2422 },
  { ...bridal, slug: "d-2423", name: "D 2423", silhouette: "Rövid csipkeujjú, mély V-kivágású A-vonal", image: d2423 },
  { ...bridal, slug: "d-2440", name: "D 2440", silhouette: "Háromnegyedes csipkeujjú hercegnős fazon", image: d2440 },
  { ...bridal, slug: "d-2430", name: "D 2430", silhouette: "Rövid csipkeujjú, bő tüllszoknya", image: d2430 },
  { ...bridal, slug: "d-2433", name: "D 2433", silhouette: "Mély V-kivágású csipke, lágy esésű A-vonal", image: d2433 },
  { ...bridal, slug: "d-2434", name: "D 2434", silhouette: "Vékony pántos csipkefűző, hercegnős tüll", image: d2434 },
  { ...bridal, slug: "lb-2335", name: "LB 2335", silhouette: "Hercegnős fazon, csipkés felsőrész áttetsző ujjakkal", image: lb2335 },
  { ...prom, slug: "lb-2303", name: "LB 2303", silhouette: "Csipkés felsőrész, A-vonalú tüllszoknya", image: lb2303 },
  { ...prom, slug: "lb-2306", name: "LB 2306", silhouette: "V-nyakú csipke felsőrész, könnyű tüllszoknya", image: lb2306 },
  { ...prom, slug: "lb-2309", name: "LB 2309", silhouette: "Széles pántos csipke felsőrész, A-vonalú tüll", image: lb2309 },
  { ...prom, slug: "lb-2308", name: "LB 2308", silhouette: "Mély V-kivágás, csipkerátétes tüll uszállyal", image: lb2308 },
  { ...maternity, slug: "lb-2311", name: "LB 2311", silhouette: "Rövid csipkeujjú, A-vonalú csipkeruha", image: lb2311 },
  { ...maternity, slug: "lb-2314", name: "LB 2314", silhouette: "V-nyakú, csipkés A-vonalú ruha", image: lb2314 },
];

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
