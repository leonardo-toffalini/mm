import { CalendarCheck, Scissors, ShoppingBag } from "lucide-react";
import { BrushStroke } from "@/components/ui/brush-stroke";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/data/landing";

const icons = [CalendarCheck, Scissors, ShoppingBag];

// Hand-placed paths for the brush stroke. It reaches past this section on both
// sides and sits behind the page, so it slips under the gown cards above and
// the review cards below. viewBox units are roughly pixels at 1440px wide.
// Wide (1280px and up, where the layout is fixed): this section spans
// y 260–857, the steps' text ends near 730 and the reviews heading starts near
// 985; the gown cards above end near 132. The stroke enters from the left in
// the gap below the steps, rises between steps 2 and 3, loops once beside the
// heading and leaves off the right edge above it.
// Both ends run far past the 1500px-wide, centred stroke box so the line
// reaches the screen edges even on ultrawide screens (clears ~6000px).
const wideStroke: [number, number][] = [
  [-2300, 975], [-1500, 962], [-900, 948], [-420, 930], [-150, 915],
  [100, 885], [350, 870], [600, 868], [800, 855],
  [890, 815], [912, 730], [918, 640], [940, 560], [1030, 470], [1150, 380],
  [1205, 280], [1200, 190], [1140, 145], [1080, 195], [1085, 310], [1160, 410],
  [1270, 440], [1370, 395], [1470, 320], [1620, 255], [1900, 215], [2400, 190],
  [3000, 175], [3800, 165],
];
// Tall (below 1280px, anchored to a 400px band on the right): this section
// spans y 200–1330, the stacked steps end near 1090 and the reviews heading
// starts near 1426. Same gesture without the loop, which has no room here:
// in from the far left below the steps, across, then up the right edge.
const tallStroke: [number, number][] = [
  [-1100, 1270], [-600, 1262], [-200, 1250], [60, 1245], [230, 1225],
  [330, 1160], [362, 1040], [366, 880], [358, 720], [345, 560], [352, 420],
  [372, 300], [350, 170], [320, 40], [310, -120],
];

export function HowItWorks() {
  return (
    // Not isolated: the stroke's -z-10 puts it behind the whole page.
    // Stroke heights are set explicitly: an SVG otherwise sizes itself from its
    // aspect ratio and ignores a bottom offset.
    <section id="how-it-works" className="relative scroll-mt-[72px] pt-24 pb-52 text-tint-fg xl:py-32">
      <BrushStroke
        points={wideStroke}
        size={[1500, 1120]}
        width={80}
        preserveAspectRatio="xMidYMid slice"
        className="absolute -top-[260px] left-1/2 -z-10 hidden h-[calc(100%+520px)] w-full max-w-[1500px] -translate-x-1/2 overflow-visible text-tint xl:block"
      />
      <BrushStroke
        points={tallStroke}
        size={[400, 1640]}
        width={48}
        preserveAspectRatio="xMidYMid slice"
        className="absolute -top-[200px] right-0 -z-10 h-[calc(100%+510px)] w-full max-w-[400px] overflow-visible text-tint xl:hidden"
      />
      <Container>
        <SectionHeading tone="tint" title="Háromszor találkozunk, az első ruhapróbától az esküvőig" />
        <ol className="mt-16 grid gap-14 xl:grid-cols-3 xl:gap-10">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} data-reveal="item">
                <Icon aria-hidden size={24} strokeWidth={1.75} className="text-tint-fg-muted" />
                <p className="mt-6 text-sm tabular-nums text-tint-fg-muted">{step.when}</p>
                <h3 className="mt-1 font-serif text-2xl font-medium">{step.title}</h3>
                <p className="mt-3 max-w-xs text-pretty leading-relaxed text-tint-fg-muted">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
