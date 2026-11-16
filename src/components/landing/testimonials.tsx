import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { studio, testimonials } from "@/data/landing";

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-[72px] py-24 lg:py-32">
      <Container>
        <SectionHeading
          title={`${studio.reviewCount} menyasszony értékelése: ${studio.rating.toLocaleString("hu-HU")} / 5`}
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} data-reveal="item">
              <figure className="flex h-full flex-col justify-between gap-10 rounded-card bg-surface p-8">
                {/* Hanging opening quote keeps the text edge aligned. */}
                <blockquote className="-indent-[0.4em] font-serif text-2xl leading-snug text-pretty">
                  &bdquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-fg-muted">
                    {" "}
                    · {t.gown}, {t.date}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
