import { expect, test } from "vitest";
import { PROFILES } from "./difficulty";

test.each(Object.entries(PROFILES))(
    "%s has an axis at 1 or below",
    (_project, axes) => {
        const values = Object.values(axes);
        expect(values.some((value) => value <= 1)).toBe(true);
    },
);

test.todo(
    "Each published project should have a profile and an evidence field",
    () => {},
);
