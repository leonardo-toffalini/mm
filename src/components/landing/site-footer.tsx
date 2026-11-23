import Link from "next/link";
import { Container } from "@/components/ui/container";
import { studio } from "@/data/landing";
import { routes } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer id="visit" data-tone="dark" className="bg-inverse py-16 text-inverse-fg-muted">
      <Container className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-3xl text-inverse-fg">Magic Moment</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Menyasszonyi, kismama és szalagavatós ruhák kölcsönzése.
          </p>
        </div>
        <address className="text-sm not-italic leading-7">
          <p className="text-inverse-fg">Látogass el a szalonba</p>
          <a href={studio.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-inverse-fg hover:underline">
            <span className="block">{studio.address}</span>
            <span className="block">{studio.city}</span>
          </a>
          <p>{studio.hours}</p>
          <a href={`tel:${studio.phone.replaceAll(" ", "")}`} className="block underline-offset-4 hover:text-inverse-fg hover:underline">
            {studio.phone}
          </a>
          <a href={`mailto:${studio.email}`} className="underline-offset-4 hover:text-inverse-fg hover:underline">
            {studio.email}
          </a>
        </address>
      </Container>
      <Container>
        <p className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <span>© Magic Moment. Fotók: Unsplash.</span>
          <Link href={routes.privacy} className="underline-offset-4 hover:text-inverse-fg hover:underline">
            Adatvédelem
          </Link>
          <Link href={`${routes.privacy}#impresszum`} className="underline-offset-4 hover:text-inverse-fg hover:underline">
            Impresszum
          </Link>
        </p>
      </Container>
    </footer>
  );
}
