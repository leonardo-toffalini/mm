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
          {/* One string, so line splitting keeps "90-minute" together. */}
          {`Book your free ${studio.fittingMinutes}-minute fitting`}
        </h2>
        <p data-reveal="item" className="mt-6 max-w-md text-lead text-pretty text-inverse-fg-muted">
          Tuesday to Saturday at our Portland studio. Bring up to {studio.guests} guests and leave
          with your shortlist.
        </p>
        <ButtonLink href={routes.booking} size="lg" data-reveal="item" className="mt-10">
          Choose a time
        </ButtonLink>
      </Container>
    </section>
  );
}
