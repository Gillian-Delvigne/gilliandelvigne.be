import type { AXES, LEVELS } from "@/content/difficulty";

export type Axis = (typeof AXES)[number];

export type Level = (typeof LEVELS)[number];

export type Profile = Record<Axis, Level>;

export type AxisLabels = Record<Axis, string>;
