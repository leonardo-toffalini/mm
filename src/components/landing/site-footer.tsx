import { Container } from "@/components/ui/container";
import { studio } from "@/data/landing";

export function SiteFooter() {
  return (
    <footer id="visit" data-tone="dark" className="bg-inverse py-16 text-inverse-fg-muted">
      <Container className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-3xl text-inverse-fg">Magic Moment</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Bridal, prom and maternity gowns to rent, tailored to fit you.
          </p>
        </div>
        <address className="text-sm not-italic leading-7">
          <p className="text-inverse-fg">Visit the studio</p>
          <p>{studio.address}</p>
          <p>{studio.city}</p>
          <p>{studio.hours}</p>
          <a href={`mailto:${studio.email}`} className="underline-offset-4 hover:text-inverse-fg hover:underline">
            {studio.email}
          </a>
        </address>
      </Container>
      <Container>
        <p className="mt-16 text-xs">© Magic Moment. Photography via Unsplash.</p>
      </Container>
    </footer>
  );
}
