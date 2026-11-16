import Image from "next/image";
import heroImage from "@/assets/images/hero-veil.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { studio } from "@/data/landing";
import { routes } from "@/lib/routes";
import { formatPrice } from "@/lib/price";

export function Hero() {
  return (
    <section data-hero data-tone="dark" className="film-grain relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-inverse text-inverse-fg">
      <div data-hero-media data-intro className="absolute inset-0 -z-10">
        {/* Colour grade is baked into the file; only legibility shading is added here. */}
        <Image
          src={heroImage}
          alt="Csipkeruhás menyasszony, aki hosszú csipkefátyla szélét emeli"
          fill
          placeholder="blur"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          quality={85}
          className="object-cover object-[72%_35%]"
        />
        {/* Shade the left side and bottom, where the text sits, plus under the header. */}
        <div className="absolute inset-0 bg-gradient-to-r from-shade/90 via-shade/55 to-shade/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-shade/90 via-shade/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-shade/50 to-transparent" />
      </div>

      <Container data-hero-content className="pt-40 pb-12 lg:pb-16">
        <h1 data-hero-headline data-intro className="-ml-[0.04em] max-w-5xl text-[3.25rem] font-display leading-none font-normal tracking-[-0.02em] text-balance sm:text-7xl lg:text-[6.5rem]">
          Kölcsönözhető menyasszonyi ruhák, rád szabva
        </h1>
        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <p data-intro="fade" className="max-w-lg text-lead text-pretty text-inverse-fg-muted">
            Válassz {studio.gownCount} ruhánk közül, próbáld fel őket egy ingyenes, {studio.fittingMinutes} perces
            ruhapróbán, a kedvencedet pedig méretre igazítjuk. A kölcsönzés már{" "}
            <span className="tabular-nums">{formatPrice(studio.rentalFrom)}</span>-tól elérhető, a tisztítással együtt.
          </p>
          <div data-intro="fade" className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href={routes.booking} size="lg">
              Gyere el ruhapróbára
            </ButtonLink>
            <TextLink href={routes.collection} className="text-inverse-fg">
              Mind a {studio.gownCount} ruha
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
