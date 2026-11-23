import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/lib/routes";

// A gown that isn't (or is no longer) in the collection.
export default function GownNotFound() {
  return (
    <>
      {/* Nested not-found files can't export metadata; React hoists this into the head. */}
      <title>Ez a ruha nincs a kollekcióban – Magic Moment</title>
      <SiteHeader intro={false} />
      <main id="main" data-tone="dark" className="film-grain relative isolate bg-inverse text-inverse-fg">
        <Container className="flex min-h-[80svh] flex-col justify-center pt-24 pb-16">
          <h1 className="-ml-[0.04em] max-w-3xl font-display text-5xl leading-none font-normal tracking-[-0.02em] text-balance lg:text-7xl">
            Ez a ruha nincs a kollekcióban
          </h1>
          <p className="mt-6 max-w-md text-lead text-pretty text-inverse-fg-muted">
            Lehet, hogy átneveztük, vagy már nem kölcsönözzük. Minden ruhánkat megtalálod a kollekcióban.
          </p>
          <TextLink href={routes.collection} className="mt-10 self-start text-inverse-fg">
            Vissza a kollekcióhoz
          </TextLink>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
