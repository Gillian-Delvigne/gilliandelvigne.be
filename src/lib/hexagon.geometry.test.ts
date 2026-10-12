import { describe, expect, test } from "vitest";
import { AXES } from "@/content/difficulty";
import {
    calculatePoint,
    calculateRadius,
    setLabelPosition,
} from "./hexagon.geometry";

const CENTER = 60; // Simulates a 120 x 120 SVG viewbox
const OUTER = 44; // Places the circle with a 16 gutter

const expectPoint = (
    [x, y]: [number, number],
    expectedX: number,
    expectedY: number,
) => {
    expect(x).toBeCloseTo(expectedX, 3);
    expect(y).toBeCloseTo(expectedY, 3);
};

describe("calculateRadius", () => {
    test("a 0 sits on the floor ring, 14 % of the outer radius", () => {
        expect(calculateRadius(OUTER, 0)).toBeCloseTo(6.16, 3);
    });

    test("a 1 sits one step above the floor", () => {
        expect(calculateRadius(OUTER, 1)).toBeCloseTo(15.62, 3);
    });

    test("a 4 reaches the outer edge", () => {
        expect(calculateRadius(OUTER, 4)).toBeCloseTo(OUTER, 3);
    });
});

describe("calculatePoint", () => {
    test("axis 0 points straight up", () => {
        expectPoint(calculatePoint(CENTER, CENTER, 0, OUTER), 60, 16);
    });

    test("axis 1 points to two o'clock: cos 30° is exactly √3 / 2", () => {
        expectPoint(
            calculatePoint(CENTER, CENTER, 1, OUTER),
            CENTER + (OUTER * Math.sqrt(3)) / 2,
            38,
        );
    });

    test("axis 3 points straight down, here at a value of 1", () => {
        expectPoint(
            calculatePoint(CENTER, CENTER, 3, calculateRadius(OUTER, 1)),
            60,
            75.62,
        );
    });

    test.each(AXES.map((axis, index) => [axis, index] as const))(
        "the edge point of %s is exactly the outer radius away from the CENTER",
        (_axis, index) => {
            const [x, y] = calculatePoint(CENTER, CENTER, index, OUTER);
            // Pythagoras: the distance is the hypotenuse of the two offsets.
            expect(Math.hypot(x - CENTER, y - CENTER)).toBeCloseTo(OUTER, 3);
        },
    );

    test("axes 1 and 5 mirror each other across the vertical axis", () => {
        const [x1, y1] = calculatePoint(CENTER, CENTER, 1, OUTER);
        const [x5, y5] = calculatePoint(CENTER, CENTER, 5, OUTER);
        expect(y1).toBeCloseTo(y5, 3);
        expect(x1 + x5).toBeCloseTo(2 * CENTER, 3);
    });
});

describe("setLabelPosition", () => {
    test("Labels are positionned properly around the circle", () => {
        const result = AXES.map((_, i) => setLabelPosition(i));
        expect(result).toStrictEqual([
            "middle",
            "start",
            "start",
            "middle",
            "end",
            "end",
        ]);
    });
});
