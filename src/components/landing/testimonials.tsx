import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { studio, testimonials } from "@/data/landing";

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          title={`Rated ${studio.rating} out of 5 by ${studio.reviewCount} brides`}
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} data-reveal="item">
              <figure className="flex h-full flex-col justify-between gap-10 rounded-card bg-surface p-8">
                {/* Hanging opening quote keeps the text edge aligned. */}
                <blockquote className="-indent-[0.4em] font-serif text-2xl leading-snug text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-fg-muted">
                    {" "}
                    · wore {t.gown}, {t.date}
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
