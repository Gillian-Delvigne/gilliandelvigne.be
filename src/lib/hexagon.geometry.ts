import { AXES } from "@/content/difficulty";

/** Share of the outer radius kept below the lowest value. A 0 drawn at the
   centre would collapse the polygon, so it sits on a dotted ring instead. */
const FLOOR = 0.14;
const MAX_LEVEL = 4;

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
): [x: number, y: number] => {
    const angle = calculateAngle(index);
    return [cx + length * Math.cos(angle), cy + length * Math.sin(angle)];
};

export const setLabelPosition = (index: number) => {
    const angle = calculateAngle(index);
    const cosinus = Math.cos(angle);
    if (Math.abs(cosinus) < 0.01) return "middle";
    else if (cosinus > 0) return "start";
    else return "end";
};
