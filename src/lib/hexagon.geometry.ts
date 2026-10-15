import { AXES, MAX_LEVEL } from "@/content/difficulty";
import type { Profile } from "@/types/difficulty";

export type Point = [x: number, y: number];
type LabelPosition = "start" | "middle" | "end";
type LabelSide = "top" | "bottom" | "side";

export interface LabelData {
    anchorPoint: Point;
    textAnchor: LabelPosition;
    lines: string[];
    offset: number;
    label: string;
}

export const CENTER = 60; // Simulates a 120 x 120 SVG viewbox
export const OUTER = 44; // Places the circle with a 16 gutter
/** Room added around the 120 x 120 sheet so the axis names fit. */
export const LABEL_PAD_X = 48;
export const LABEL_PAD_Y = 12;
export const LABEL_GAP = 12;
export const LINE_HEIGHT = 9;
const WRAP_LIMIT = 12;
const EPSILON = 0.01;

/** Share of the outer radius kept below the lowest value. A 0 drawn at the
   centre would collapse the polygon, so it sits on a dotted ring instead. */
const FLOOR = 0.14;

const calculateAngle = (index: number) => {
    return -Math.PI / 2 + (index * 2 * Math.PI) / AXES.length;
};

/** Distance from the centre at which a value is drawn: 0 lands on the floor
    ring, MAX_LEVEL on the outer edge, the levels in between evenly spaced. */
export const calculateRadius = (outerRadius: number, value: number): number =>
    outerRadius * (FLOOR + ((1 - FLOOR) * value) / MAX_LEVEL);

/** The point at `length` from the centre along axis `index`.
    Axis 0 points up (-90°) and the others follow clockwise: SVG's y axis
    points down, so a positive angle turns clockwise on screen. */
export const calculatePoint = (
    cx: number,
    cy: number,
    index: number,
    length: number,
): Point => {
    const angle = calculateAngle(index);
    return [cx + length * Math.cos(angle), cy + length * Math.sin(angle)];
};

export const getLabelHorizontalAnchor = (index: number) => {
    const angle = calculateAngle(index);
    const cosinus = Math.cos(angle);
    if (Math.abs(cosinus) < EPSILON) return "middle";
    else if (cosinus > 0) return "start";
    else return "end";
};

export const profileVertices = (profile: Profile): Point[] => {
    const points = AXES.map((axis, index) => {
        const length = calculateRadius(OUTER, profile[axis]);
        return calculatePoint(CENTER, CENTER, index, length);
    });
    return points;
};

export const toPointsAttribute = (points: Point[]): string => points.join(" ");

export const ringVertices = (length: number): Point[] =>
    AXES.map((_, index) => calculatePoint(CENTER, CENTER, index, length));

export const frameRings = () => {
    return Array.from({ length: MAX_LEVEL }, (_, i) => i + 1).map((lvl) =>
        ringVertices((OUTER * lvl) / MAX_LEVEL),
    );
};

export const wrapLabel = (label: string): string[] => {
    if (label.length <= WRAP_LIMIT) return [label];

    const words = label.split(" ");

    if (words.length === 1) {
        const [word] = words;
        const mid = Math.ceil(word.length / 2);
        return [word.slice(0, mid) + "-", word.slice(mid)];
    }

    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

const getLabelVerticalSide = (index: number): LabelSide => {
    const angle = calculateAngle(index);
    const sinus = Math.sin(angle);

    if (Math.abs(sinus) < EPSILON) return "top";
    if (Math.abs(sinus) < EPSILON) return "bottom";
    return "side";
};

export const getLabelVerticalOffset = (
    index: number,
    nbOfLines: number,
): number => {
    switch (getLabelVerticalSide(index)) {
        case "top":
            return -((nbOfLines - 1) * LINE_HEIGHT + 1);
        case "bottom":
            return 1;
        case "side":
            return -(((nbOfLines - 1) * LINE_HEIGHT) / 2);
    }
};

export const generateLabelData = (label: string, index: number) => {
    const anchorPoint = calculatePoint(
        CENTER,
        CENTER,
        index,
        OUTER + LABEL_GAP,
    );
    const textAnchor = getLabelHorizontalAnchor(index);
    const lines = wrapLabel(label);
    const offset = getLabelVerticalOffset(index, lines.length);
    return {
        anchorPoint: anchorPoint,
        textAnchor: textAnchor,
        lines: lines,
        offset: offset,
        label: label,
    };
};
