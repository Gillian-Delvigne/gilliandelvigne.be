import { expect, test } from "vitest";
import { projects } from "../../.velite";
import { getFeaturedProjects, getProject, getProjects } from "./index";

test("only FR projects", () => {
    expect(getProjects("fr").every((p) => p.locale === "fr")).toBe(true);
});

test("drafts excluded", () => {
    // Two assertions: the filter lets no draft through, AND every draft that
    // does exist in the corpus is absent from the result. The second only
    // applies when there is one — conditional, not silently vacuous.
    expect(getProjects("fr").some((p) => p.draft)).toBe(false);
    const drafts = projects.filter((p) => p.locale === "fr" && p.draft);
    for (const d of drafts) {
        expect(getProject("fr", d.slug)).toBe(undefined);
    }
});

test("sorted by order then date desc", () => {
    const list = getProjects("fr");
    expect(list.length).toBeGreaterThan(1);
    const ordered = list.every((p, i) => {
        if (i === 0) return true;
        const prev = list[i - 1];
        return (
            prev.order < p.order ||
            (prev.order === p.order && prev.date >= p.date)
        );
    });
    expect(ordered).toBe(true);
});

test("not empty", () => {
    expect(getProjects("fr").length).toBeGreaterThan(0);
});

test("unknown slug", () => {
    expect(getProject("fr", "wrong-slug")).toBe(undefined);
});

test("draft not reachable by slug", () => {
    expect(getProjects("fr").every((p) => p.draft === false)).toBe(true);
    expect(getProjects("en").every((p) => p.draft === false)).toBe(true);
});

test("featured is a subset of projects", () => {
    const all = getProjects("fr");
    const featured = getFeaturedProjects("fr");
    expect(featured.every((p) => all.includes(p))).toBe(true);
    expect(featured.every((p) => p.featured)).toBe(true);
});
