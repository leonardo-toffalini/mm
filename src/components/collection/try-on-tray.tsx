"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { findGown, orderQuery } from "@/data/gowns";
import { routes } from "@/lib/routes";
import { announce, TRY_ON_LIMIT, useTryOn } from "@/lib/try-on";
import { useOrder } from "@/lib/use-order";

/**
 * The try-on list, docked at the bottom of the screen once it has a gown in
 * it: the chosen gowns and the way to book a fitting with them. While it
 * shows, it is the page's booking action, so the other gold booking buttons
 * step aside (they hide under html[data-try-on]).
 */
export function TryOnTray() {
  const { list, toggle } = useTryOn();
  const [order] = useOrder();
  const gowns = list.map(findGown).filter((g) => g !== undefined);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-try-on", gowns.length > 0);
    return () => document.documentElement.removeAttribute("data-try-on");
  }, [gowns.length]);

  return (
    <>
      {/* Always present, so additions and removals are read out. */}
      <p id="try-on-status" role="status" className="sr-only" />
      {gowns.length > 0 && (
        <aside
          aria-label="Your try-on list"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-fg/10 bg-page/95 pb-[env(safe-area-inset-bottom)] text-fg backdrop-blur-md"
        >
          <Container className="flex h-[72px] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <p className="shrink-0 text-sm">
                <span className="font-medium">
                  <span className="hidden sm:inline">Your try-on list · </span>
                  <span className="tabular-nums">
                    {gowns.length} of {TRY_ON_LIMIT}
                  </span>
                </span>
                <span className="text-fg-muted sm:hidden"> chosen</span>
              </p>
              {/* On phones the count stands in for the photos; each gown's own
                  page adds or removes it. */}
              <ul className="hidden min-w-0 gap-3 sm:flex">
                {gowns.map((g) => (
                  <li key={g.slug} className="group relative shrink-0">
                    <Link
                      href={routes.gown(g.slug) + orderQuery(order)}
                      title={g.name}
                      className="relative block h-12 w-9 overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      <Image src={g.image} alt={g.name} fill sizes="36px" className="object-cover" style={{ objectPosition: g.focus }} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        toggle(g.slug);
                        announce(`${g.name} removed from your try-on list.`);
                      }}
                      aria-label={`Remove ${g.name} from your try-on list`}
                      // after: widens the tap area to 44px around the small badge.
                      className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full after:absolute after:-inset-2.5 bg-fg text-page opacity-70 transition-opacity group-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"
                    >
                      <X aria-hidden size={12} strokeWidth={2} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <ButtonLink href={`${routes.booking}?gowns=${gowns.map((g) => g.slug).join(",")}`} className="shrink-0 whitespace-nowrap">
              <span className="sm:hidden">Book with these</span>
              <span className="hidden sm:inline">Book a fitting with these</span>
            </ButtonLink>
          </Container>
        </aside>
      )}
    </>
  );
}
