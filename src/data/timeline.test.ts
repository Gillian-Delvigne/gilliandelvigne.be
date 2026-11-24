import { describe, expect, test } from "vitest";
import { STAGES } from "./timeline";

describe("every date in stage is valid", () => {
    const stages = Object.entries(STAGES).map(([key, value]) => ({
        ...value,
        name: key,
    }));
    
	test.each(stages)(
        "$name: $start - $end is a valid format date",
        ({ start, end }) => {
            expect(start.getTime()).not.toBeNaN();
            if (end) expect(end.getTime()).not.toBeNaN();
        },
    );

    test.each(stages)(
        "$name: $end is greater than $start",
        ({ start, end }) => {
            if (end) expect(end.getTime()).toBeGreaterThan(start.getTime());
        },
    );
});
