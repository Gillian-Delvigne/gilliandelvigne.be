import { expect, test } from "vitest";
import { getPost, getPosts } from "./index";

test("get FR posts only", () => {
    expect(getPosts("fr").every((p) => p.locale === "fr")).toBe(true);
});

test("draft exluded", () => {
    expect(getPosts("fr").some((p) => p.draft)).toBe(false);
});

test("sort from most recent to older", () => {
    const dates = getPosts("fr").map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
});

test("Not empty results", () => {
    expect(getPosts("fr").length).toBeGreaterThan(0);
});

test("Unkown slug", () => {
    expect(getPost("fr", "c-series", "wrong-slug")).toBe(undefined);
});

test("Unkown category", () => {
	expect(getPost("fr", "wrong-category", "les-pointeurs-en-c")).toBe(undefined);
})