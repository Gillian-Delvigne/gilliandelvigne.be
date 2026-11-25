import { getProjects } from "@/content";
import { describe, expect, test } from "vitest";
import { TURNS, STAGES, type TurnName } from "@/data/timeline";
import type { Field } from "@/content/fields";
import {
    shapeOf,
    shouldLightUp,
    toTimelinePoints,
    type TimelinePoint,
} from "./timeline";
import { yearOf } from "./yearOf";

describe("toTimelinePoints", () => {
    const projects = getProjects("fr");
    const points = toTimelinePoints(projects);

    test("one point per project", () => {
        expect(points).toHaveLength(projects.length);
    });

    test("the Elausys point", () => {
        const elausys = points.find((point) => point.slug === "elausys");
        expect(elausys).toMatchObject({
            field: "development",
            score: 18,
            title: "Elausys",
            stages: ["elausys"],
        });
        expect(elausys?.position).toBeCloseTo(2025.748, 3);
    });

    test("a project attached to two stages keeps both", () => {
        const cpfb = points.find((point) => point.slug === "cpfb");
        expect(cpfb?.stages).toEqual(["freelance", "ulb-cpfb"]);
        expect(cpfb?.field).toBe("development");
    });

    test("a pedagogy project lands on the pedagogy field", () => {
        const pser = points.find((point) => point.slug === "pser");
        expect(pser?.field).toBe("pedagogy");
    });

    test("points are sorted from oldest to newest", () => {
        const positions = points.map((point) => point.position);
        expect(positions).toEqual(positions.toSorted((a, b) => a - b));
    });

    test("the projects given are left untouched", () => {
        const before = projects.map((project) => project.slug);
        toTimelinePoints(projects);
        expect(projects.map((project) => project.slug)).toEqual(before);
    });
});

describe("shouldLightUp", () => {
    const today = new Date("2026-11-25");
    const turn = (name: TurnName) => TURNS.find((t) => t.name === name)!;
    const pointOn = (date: string, field: Field): TimelinePoint => ({
        position: yearOf(new Date(date)),
        field,
        score: 0,
        title: "",
        slug: "",
        stages: ["freelance"],
    });

    test("a pedagogy point inside the first turn lights up", () => {
        expect(
            shouldLightUp(
                pointOn("2018-11-01", "pedagogy"),
                turn("code"),
                today,
            ),
        ).toBe(true);
    });

    test("a point inside the period but on another field stays off", () => {
        expect(
            shouldLightUp(
                pointOn("2018-11-01", "development"),
                turn("code"),
                today,
            ),
        ).toBe(false);
    });

    test("a point on the right field but outside the period stays off", () => {
        expect(
            shouldLightUp(
                pointOn("2025-06-01", "development"),
                turn("both"),
                today,
            ),
        ).toBe(false);
    });

    test("a turn without an end lasts until today", () => {
        expect(
            shouldLightUp(
                pointOn("2026-06-01", "development"),
                turn("fulltime"),
                today,
            ),
        ).toBe(true);
        expect(
            shouldLightUp(
                pointOn("2027-06-01", "development"),
                turn("fulltime"),
                today,
            ),
        ).toBe(false);
    });

    test("a point on the shared boundary lights up both turns", () => {
        const boundary = pointOn("2023-07-01", "development");
        expect(shouldLightUp(boundary, turn("both"), today)).toBe(true);
        expect(shouldLightUp(boundary, turn("fulltime"), today)).toBe(true);
    });
});

describe("shapeOf", () => {
    test("Van In/De Boeck", () => {
        expect(shapeOf(STAGES["van-in"])).toBe("range");
    });
    test("Freelance", () => {
        expect(shapeOf(STAGES["freelance"])).toBe("since");
    });
    test("Technobel", () => {
        expect(shapeOf(STAGES["technobel"])).toBe("single");
    });
});
