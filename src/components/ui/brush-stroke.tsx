import type { ComponentProps } from "react";

type Point = [number, number];

type Props = Omit<ComponentProps<"svg">, "viewBox" | "points"> & {
  /** Hand-placed points the stroke passes through, in viewBox units. */
  points: Point[];
  /** viewBox width and height. */
  size: [number, number];
  /** Stroke width, in viewBox units. */
  width: number;
};

/**
 * A brush-like stroke: an even-width, round-capped line along a smooth curve
 * through `points`. The curve is computed on the server, so it ships as a
 * single static path.
 *
 * The path is marked `data-stroke-draw` with pathLength 1 so page motion can
 * dash it to draw the stroke in; only the drawn part ever shows, so places
 * where the line crosses itself appear only when the line gets there.
 */
export function BrushStroke({ points, size, width, ...props }: Props) {
  const line = catmullRom(points, 28);
  return (
    <svg viewBox={`0 0 ${size[0]} ${size[1]}`} aria-hidden {...props}>
      <path
        data-stroke-draw
        d={`M${line.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Smooth curve through every point (uniform Catmull-Rom).
function catmullRom(points: Point[], samples: number): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    for (let s = 0; s < samples; s++) {
      const t = s / samples;
      const t2 = t * t;
      const t3 = t2 * t;
      const at = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([at(p0[0], p1[0], p2[0], p3[0]), at(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}
