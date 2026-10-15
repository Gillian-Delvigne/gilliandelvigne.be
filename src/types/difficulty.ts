import type { AXES } from "@/content/difficulty";

export type Axis = (typeof AXES)[number];

export type Level = 0 | 1 | 2 | 3 | 4;

export type Profile = Record<Axis, Level>;

export type AxisLabels = Record<Axis, string>;
