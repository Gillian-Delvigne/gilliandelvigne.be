import { CAREER_START } from "@/data/timeline";
import type { Field } from "@/content/fields";
import { yearOf } from "@/lib/yearOf";

export const TIMELINE_WIDTH = 1080;
export const TIMELINE_HEIGHT = 320;
export const GUT = 150;
export const PAD = 20;
export const AXIS_HEIGHT = 270;
export const CIRCLE_RADIUS = 5;
export const AXIS_START = Math.floor(yearOf(CAREER_START));
export const TICK_LENGTH = 4;
export const TICK_LABEL_OFFSET = 20;
export const LINE_TITLE_OFFSET = 2;
export const LINE_SUBTITLE_OFFSET = 12;
export const STAGE_PAD = 4;
export const LABEL_NAME_SIZE = 12.8;
export const LABEL_NAME_LEADING = 1.15;
export const LABEL_NAME_LINES = 2;
export const LABEL_PERIOD_SIZE = 10.24;
export const LABEL_PERIOD_LEADING = 1.45;
export const LABEL_GAP = 8;
export const LABEL_BOX_HEIGHT =
    LABEL_NAME_LINES * LABEL_NAME_SIZE * LABEL_NAME_LEADING +
    LABEL_PERIOD_SIZE * LABEL_PERIOD_LEADING;
export interface Lane {
    y: number;
    fill: string;
    stroke: string;
    boxOffset: number;
}
export const LANES: Record<Field, Lane> = {
    pedagogy: {
        y: 70,
        fill: "fill-ink",
        stroke: "stroke-ink",
        boxOffset: -(LABEL_BOX_HEIGHT + LABEL_GAP),
    },
    development: {
        y: 150,
        fill: "fill-brand",
        stroke: "stroke-brand",
        boxOffset: LABEL_GAP,
    },
};
export const TRAINING_ROW_OFFSET = 64;
export const TRAINING_ROW_GAP = 18;
export const TRAINING_LABEL_GAP = 8;
export const TRAINING_LABEL_BASELINE = 4;
export const TRAINING_PERIOD_GAP = 6;
export const TRAINING_STROKE_WIDTH = 2.5;
export const TRAINING_DASH = "2 5";
export const TRAINING_OPACITY = 0.6;
export const GUTTER_PAD = 2;
export const GUTTER_NAME_OFFSET = 24;
export const GUTTER_PERIOD_OFFSET = 38;
export const TURN_CN = {
    btn: "group flex w-full gap-2.5 pt-3.5 text-left cursor-pointer border-t border-(--line-soft) transition-colors duration-150 aria-pressed:border-t-warm focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 focus-visible:rounded-sm",
    nb: "grid size-5 shrink-0 place-items-center rounded-full border border-(--line-abs) font-mono font-semibold text-2xs text-dim transition-colors duration-150 group-aria-pressed:border-warm group-aria-pressed:text-warm",
    period: "font-mono font-medium text-2xs text-dim",
    title: "block font-semibold text-sm leading-ui",
    body: "block mt-1 text-sm leading-body text-dim",
};
