import { GownCard } from "@/components/collection/gown-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { featuredGowns, studio } from "@/data/landing";
import { routes } from "@/lib/routes";

export function FeaturedCollection() {
  const [featured, ...rest] = featuredGowns;
  return (
    <section id="gowns" className="scroll-mt-[72px] py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Néhány kedvenc a kollekcióból"
          action={<TextLink href={routes.collection}>Mind a {studio.gownCount} ruha</TextLink>}
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <li className="col-span-2 lg:row-span-2">
            <GownCard gown={featured} featured sizes="(min-width: 1024px) 50vw, 100vw" />
          </li>
          {rest.map((gown) => (
            <li key={gown.slug}>
              <GownCard gown={gown} sizes="(min-width: 1024px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
