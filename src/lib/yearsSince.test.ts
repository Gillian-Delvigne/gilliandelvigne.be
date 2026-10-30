import { describe, expect, test } from "vitest";
import { CAREER_START, DEV_START } from "@/data/career";
import { yearsSince } from "./yearsSince";

describe("YearsSince function", () => {
    test("with 30 may 2026 should be 5", () =>
        expect(yearsSince(DEV_START, new Date("2026-05-30"))).toBe(5));
    test("with 30 april 2026 should be 4", () =>
        expect(yearsSince(DEV_START, new Date("2026-04-30"))).toBe(4));
    test("with 29 april 2026 should be 4", () =>
        expect(yearsSince(new Date("2021-05-30"), new Date("2026-05-29"))).toBe(
            4,
        ));
    test("with 30 june 2026 should be 15", () =>
        expect(yearsSince(CAREER_START, new Date("2026-06-30"))).toBe(15));
});
