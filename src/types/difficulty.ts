import type { AXES } from "@/content/difficulty";

/* Types of the difficulty notation only: this file holds no value and
   disappears at compile time. The values (AXES, MAX_LEVEL, PROFILES) live in
   content/difficulty.ts; the drawing lives in lib/hexagon.geometry.ts. */

export type Axis = (typeof AXES)[number];

/** Keep in step with MAX_LEVEL in content/difficulty.ts: a type cannot be
    derived from a number without contortions, so the two are paired by hand. */
export type Level = 0 | 1 | 2 | 3 | 4;

export type Profile = Record<Axis, Level>;

/** The translated name of each axis, keyed so that a missing one fails tsc. */
export type AxisLabels = Record<Axis, string>;
