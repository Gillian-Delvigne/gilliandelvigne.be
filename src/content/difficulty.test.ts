import { describe, expect, test } from "vitest";
import { PROFILES, peakAxes } from "./difficulty";

test.each(Object.entries(PROFILES))(
    "%s has an axis at 1 or below",
    (_project, axes) => {
        const values = Object.values(axes);
        expect(values.some((value) => value <= 1)).toBe(true);
    },
);

describe("peakAxes", () => {
    test("One peak value : 3", () => {
        expect(
            peakAxes({
                scope: 1,
                coupling: 0,
                stakes: 1,
                conformance: 1,
                rules: 1,
                disciplines: 3,
            }),
        ).toStrictEqual(["disciplines"]);
    });

    test("One peak value : 4", () => {
        expect(
            peakAxes({
                scope: 2,
                coupling: 1,
                stakes: 3,
                conformance: 3,
                rules: 2,
                disciplines: 4,
            }),
        ).toStrictEqual(["disciplines"]);
    });

    test("Two peaks : 4", () => {
        expect(
            peakAxes({
                scope: 1,
                coupling: 3,
                stakes: 4,
                conformance: 4,
                rules: 3,
                disciplines: 3,
            }),
        ).toStrictEqual(["stakes", "conformance"]);
    });

    test("Three peaks : 4", () => {
        expect(
            peakAxes({
                scope: 4,
                coupling: 4,
                stakes: 4,
                conformance: 1,
                rules: 3,
                disciplines: 2,
            }),
        ).toStrictEqual(["scope", "coupling", "stakes"]);
    });
});

test.todo(
    "Each published project should have a profile and an evidence field",
    () => {},
);
