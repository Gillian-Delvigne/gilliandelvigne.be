import { expect, test } from "vitest";
import { getCategories, getCategory } from "./index";

test("only FR categories", () => {
    expect(getCategories("fr").every((c) => c.locale === "fr")).toBe(true);
});

test("sorted by order then title", () => {
    const list = getCategories("fr");
    expect(list.length).toBeGreaterThan(1);
    const ordered = list.every((c, i) => {
        if (i === 0) return true;
        const prev = list[i - 1];
        return (
            prev.order < c.order ||
            (prev.order === c.order && prev.title.localeCompare(c.title) <= 0)
        );
    });
    expect(ordered).toBe(true);
});

test("not empty", () => {
    expect(getCategories("fr").length).toBeGreaterThan(0);
});

test("unknown slug", () => {
    expect(getCategory("fr", "wrong-slug")).toBe(undefined);
});

test("slug from another locale", () => {
    expect(getCategory("fr", "algorithmique")).toBeDefined();
    expect(getCategory("en", "algorithmique")).toBe(undefined);
});
