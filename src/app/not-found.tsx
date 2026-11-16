import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/lib/routes";

// Any address that isn't a page; unknown gowns have their own (collection/[slug]).
export default function NotFound() {
  return (
    <>
      <SiteHeader intro={false} />
      <main id="main" data-tone="dark" className="film-grain relative isolate bg-inverse text-inverse-fg">
        <Container className="flex min-h-[80svh] flex-col justify-center pt-24 pb-16">
          <h1 className="-ml-[0.04em] max-w-3xl font-display text-5xl leading-none font-normal tracking-[-0.02em] text-balance lg:text-7xl">
            Ez az oldal nem létezik
          </h1>
          <p className="mt-6 max-w-md text-lead text-pretty text-inverse-fg-muted">
            Lehet, hogy elírás van a címben, vagy az oldal már megszűnt.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href={routes.home} className="text-inverse-fg">
              Vissza a főoldalra
            </TextLink>
            <TextLink href={routes.collection} className="text-inverse-fg">
              A kollekció
            </TextLink>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
