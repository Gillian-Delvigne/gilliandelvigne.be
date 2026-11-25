import { getProjects } from "@/content";
import { describe, expect, test } from "vitest";
import { toTimelinePoints } from "./timeline";

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
