import Image from "next/image";
import closingImage from "@/assets/images/closing-ring.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { studio } from "@/data/landing";
import { routes } from "@/lib/routes";

export function ClosingCta() {
  return (
    <section data-tone="dark" className="film-grain relative isolate overflow-hidden bg-inverse text-inverse-fg">
      <div className="absolute inset-0 -z-10">
        <div data-parallax className="absolute inset-x-0 -inset-y-[10%]">
          <Image
            src={closingImage}
            alt=""
            fill
            placeholder="blur"
            sizes="100vw"
            quality={85}
            className="object-cover object-[75%_50%]"
          />
        </div>
        {/* The photo is already dark on the left; this only evens it out behind the text. */}
        <div className="absolute inset-0 bg-gradient-to-r from-shade/70 via-shade/30 to-transparent" />
        {/* On narrow screens the text runs over the bright satin, so shade more. */}
        <div className="absolute inset-0 bg-shade/60 md:hidden" />
      </div>
      <Container className="flex flex-col items-start py-28 lg:py-40">
        <h2 data-reveal="heading" className="-ml-[0.04em] max-w-3xl text-5xl font-display leading-none font-normal tracking-[-0.02em] text-balance lg:text-7xl">
          Gyere el egy{" "}
          {/* Kept on one line so the number never ends a line on its own. */}
          <span className="whitespace-nowrap">{studio.fittingMinutes} perces</span> ruhapróbára
        </h2>
        <p data-reveal="item" className="mt-6 max-w-md text-lead text-pretty text-inverse-fg-muted">
          Hétfőtől szombatig várunk a szalonban. Akár öt ruhát is felpróbálhatsz az esküvődre vagy a
          szalagavatódra, legfeljebb {studio.guests} fős társasággal, és mire hazaindulsz, tudni fogod,
          melyik ruhák közül választasz.
        </p>
        {/* While the try-on list shows, its own button books (with the chosen gowns). */}
        <ButtonLink href={routes.booking} size="lg" data-reveal="item" className="mt-10 [[data-try-on]_&]:hidden">
          Ruhapróbát foglalok
        </ButtonLink>
      </Container>
    </section>
  );
}
