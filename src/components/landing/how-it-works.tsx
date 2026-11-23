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
// heading in the shape of a heart and leaves off the right edge above it.
// Both ends run far past the 1500px-wide, centred stroke box so the line
// reaches the screen edges even on ultrawide screens (clears ~6000px).
const wideStroke: [number, number][] = [
  [-2300, 975], [-1500, 962], [-900, 948], [-420, 930], [-150, 915],
  [100, 885], [350, 870], [600, 868], [800, 855],
  [890, 815], [912, 730], [918, 650], [940, 575], [1010, 505],
  // Heart: in through the bottom tip (1110, 455), up the right side, over
  // both lobes with a dip at the cleft, down the left side and back out
  // through the tip, so the crossing is the point of the heart. It fits the
  // box right of the heading (ends x 821), under the cards (end y 129) and
  // above step 3 (starts y 550).
  [1110, 455], [1192, 389], [1249, 316], [1258, 238], [1221, 184], [1167, 176],
  [1126, 209], [1110, 250], [1094, 209], [1053, 176], [999, 184], [962, 238],
  [971, 316], [1028, 389], [1110, 455], [1200, 495],
  [1300, 480], [1400, 420], [1520, 340], [1650, 270], [1900, 215], [2400, 190],
  [3000, 175], [3800, 165],
];
// Tall (below 1280px, anchored to a 400px band on the right): this section
// spans y 200–1330, the stacked steps end near 1090 and the reviews heading
// starts near 1426. In from the far left below the steps, a smaller heart in
// the gap under them (step text ends by y 1167 and the reviews heading starts
// at 1419 across 320–1279px; at 320px only x 54–346 shows), then up the
// right edge.
const tallStroke: [number, number][] = [
  [-1100, 1382], [-600, 1382], [-200, 1382], [60, 1382], [140, 1378],
  [200, 1360], [247, 1322], [280, 1280], [285, 1235], [263, 1205], [233, 1200],
  [209, 1219], [200, 1242], [191, 1219], [167, 1200], [137, 1205], [115, 1235],
  [120, 1280], [153, 1322], [200, 1360], [252, 1385],
  [318, 1378], [352, 1315], [362, 1200], [362, 1040], [366, 880], [358, 720], [345, 560], [352, 420],
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
