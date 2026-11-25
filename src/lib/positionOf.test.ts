import { describe, test, expect } from "vitest";
import { positionOf } from "./positionOf";

describe("positionOf", () => {
    test("year 2021", () => {
        expect(positionOf(2021, 2011, 1000, 2026)).toBeCloseTo(666.667, 3);
    });
    test("year 2018.5", () => {
        expect(positionOf(2018.5, 2011, 1000, 2026)).toBe(500);
    });
    test("year 2011", () => {
        expect(positionOf(2011, 2011, 1000, 2026)).toBe(0);
    });
    test("year 2026", () => {
        expect(positionOf(2026, 2011, 1000, 2026)).toBe(1000);
    });
});
