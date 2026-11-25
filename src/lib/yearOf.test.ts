import { describe, test, expect } from "vitest";
import { yearOf } from "./yearOf";

describe("Get decimal year (elapsed time from first day of the year for timeline)", () => {
    test("1st january 2023", () =>
        expect(yearOf(new Date("2023-01-01"))).toBe(2023));
    test("1st june 2023", () =>
        expect(yearOf(new Date("2023-06-01"))).toBeCloseTo(2023.4137, 4));
    test("1st june 2024", () =>
        expect(yearOf(new Date("2024-06-01"))).toBeCloseTo(2024.4153, 4));
});
