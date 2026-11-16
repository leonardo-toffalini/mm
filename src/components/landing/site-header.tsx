import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

// The section links point at the home page so they work from every page.
const navItems = [
  { label: "Gowns", href: routes.collection },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Visit", href: "#visit" },
];

// Fixed over the hero; page motion makes the bar solid (data-solid) once the
// hero has scrolled away. The landing page also plays an entrance: the header
// fades in and the wordmark starts large. Other pages pass intro={false} so the
// header holds still (stepping between gowns would otherwise replay it on every
// page) and the booking button shows from the start. Pages with no photo hero
// to sit over (the gown page) pass solid so the bar is solid from the start.
// The booking page passes book={false}: its own steps are the booking action.
type Props = { intro?: boolean; solid?: boolean; book?: boolean };

export function SiteHeader({ intro = true, solid = false, book = true }: Props) {
  const fade = intro ? { "data-intro": "fade" } : {};
  return (
    <header data-header data-solid={solid || undefined} data-tone="dark" className="fixed inset-x-0 top-0 z-20 text-inverse-fg">
      <Container className="flex items-center justify-between gap-3 py-4">
        {/* Fade-in and scroll scaling animate separate elements so they don't clash. */}
        <div {...fade}>
          <Link
            href={routes.home}
            data-logo={intro || undefined}
            className="-ml-[0.03em] block origin-top-left whitespace-nowrap font-display text-2xl min-[375px]:text-3xl sm:text-4xl"
          >
            Magic Moment
          </Link>
        </div>
        <nav aria-label="Main" {...fade} className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="underline-offset-8 decoration-current/40 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* On the landing page the hero's own button is right below on phones,
            so the header button only fades in once the hero has gone (the inner
            div, because the intro animation writes inline opacity on the outer
            one). */}
        <div {...fade} hidden={!book}>
          {/* Only one gold booking button per view: the try-on list's takes over
              while it shows, and on wide screens the gown page has its own. */}
          <div
            className={
              intro
                ? "invisible opacity-0 transition-[opacity,visibility] duration-400 in-data-solid:visible in-data-solid:opacity-100 sm:visible sm:opacity-100"
                : `[[data-try-on]_&]:hidden ${solid ? "lg:hidden" : ""}`
            }
          >
            <ButtonLink href={routes.booking} nudge className="whitespace-nowrap">
              {/* The full label doesn't fit beside the wordmark on phones. */}
              <span className="sm:hidden">
                Book<span className="sr-only"> a fitting</span>
              </span>
              <span className="hidden sm:inline">Book a fitting</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
