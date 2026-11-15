import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

const navItems = [
  { label: "Gowns", href: "#gowns" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

// Fixed over the hero; page motion enlarges the wordmark at the top and makes
// the bar solid (data-solid) once the hero has scrolled away.
export function SiteHeader() {
  return (
    <header data-header data-tone="dark" className="fixed inset-x-0 top-0 z-20 text-inverse-fg">
      <Container className="flex items-center justify-between py-4">
        {/* Fade-in and scroll scaling animate separate elements so they don't clash. */}
        <div data-intro="fade">
          <Link
            href={routes.home}
            data-logo
            className="-ml-[0.03em] block origin-top-left font-display text-3xl sm:text-4xl"
          >
            Magic Moment
          </Link>
        </div>
        <nav aria-label="Main" data-intro="fade" className="hidden items-center gap-8 md:flex">
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
        {/* On phones the hero's own button is right below, so the header stays clean. */}
        <div data-intro="fade" className="hidden sm:block">
          <ButtonLink href={routes.booking} nudge>
            Book a fitting
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
