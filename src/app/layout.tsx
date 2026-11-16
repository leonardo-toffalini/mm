import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Jost } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

// Display face for the big headlines and the wordmark: a free (OFL) vintage
// serif. SOFT and WONK give it its rounded, 70s character (see globals.css).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Magic Moment — Bridal Gown Rental",
  description:
    "Designer bridal gowns to rent, fitted to you by appointment. Fall in love with the dress, not the price tag.",
};

// Runs before first paint: marks the page as animated (unless the visitor asks
// for reduced motion) so intro elements can start hidden without a flash. If
// the motion code hasn't started within 4s, everything is shown anyway.
const motionBootstrap = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("has-motion");setTimeout(function(){if(!window.__motionReady)d.classList.remove("has-motion")},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      {/* Padding at the bottom while the try-on list is docked there. */}
      <body className="min-h-full flex flex-col font-sans [[data-try-on]_&]:pb-[72px]">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-page px-4 py-2 font-medium text-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
