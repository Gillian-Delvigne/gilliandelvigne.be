import type { Axis } from "@/types/navigation";
export const TRAIL_WIDTH = 1000;
export const TRAIL_BREADTH = 40;
export const CENTER_LINE = TRAIL_BREADTH / 2;
export const AMPLITUDE = 6;

const handleAxis = (pos: number, gap: number, axis: Axis) =>
    axis === "x" ? `${pos} ${gap}` : `${gap} ${pos}`;

/** Evenly spread stations: the centre of each grid column. */
export const stationAt = (i: number, count: number) =>
    ((i + 0.5) / count) * TRAIL_WIDTH;

/**
 * A SINGLE `d`, built from n-1 segments: equal width (evenly spread
  * stations) and the same relative control-point formula throughout.
 */
export const buildTrail = (count: number, axis: Axis) =>
    Array.from({ length: count }, (_, i) => stationAt(i, count)).reduce(
        (d, pos, i, xs) => {
            if (i === 0) return `M ${handleAxis(pos, CENTER_LINE, axis)}`;
            const prev = xs[i - 1];
            const w = pos - prev;
            return `${d} C ${handleAxis(prev + 0.3 * w, CENTER_LINE - AMPLITUDE, axis)},
			${handleAxis(prev + 0.7 * w, CENTER_LINE + AMPLITUDE, axis)},
			${handleAxis(pos, CENTER_LINE, axis)}`;
        },
        "",
    );
