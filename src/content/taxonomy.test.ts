import { expect, test } from "vitest";
import { categories, posts, projects } from "../../.velite";
import {
    DEFAULT_LOCALE,
    getCategories,
    getPosts,
    getPostsByTag,
    getPostsInCategory,
    getTags,
    LOCALES,
} from "./index";

type Translatable = { locale: string; translationKey: string };

const collections: Record<string, Translatable[]> = {
    posts,
    categories,
    projects,
};

test("translationKey is unique per locale", () => {
    Object.values(collections).forEach((docs) => {
        LOCALES.forEach((locale) => {
            const keys = docs
                .filter((doc) => doc.locale === locale)
                .map((doc) => doc.translationKey);
            expect(new Set(keys).size).toBe(keys.length);
        });
    });
});

test("every translated document has a sibling in the default locale", () => {
    Object.values(collections).forEach((docs) => {
        const defaultKeys = docs
            .filter((doc) => doc.locale === DEFAULT_LOCALE)
            .map((doc) => doc.translationKey);
        const orphans = docs
            .filter((doc) => doc.locale !== DEFAULT_LOCALE)
            .filter((doc) => !defaultKeys.includes(doc.translationKey))
            .map((doc) => doc.translationKey);
        expect(orphans).toEqual([]);
    });
});

test("posts reference an existing category", () => {
    const slugs = getCategories("fr").map((c) => c.slug);
    expect(getPosts("fr").every((p) => slugs.includes(p.category))).toBe(true);
});

test("getTags has no duplicate", () => {
    const tags = getTags("fr").map((t) => t.tag);
    expect(tags.length).toBeGreaterThan(0);
    expect(new Set(tags).size).toBe(tags.length);
});

test("getTags is sorted by count desc", () => {
    const counts = getTags("fr").map((t) => t.count);
    expect(counts.every((c, i) => i === 0 || counts[i - 1] >= c)).toBe(true);
});

test("getTags counts match getPostsByTag", () => {
    getTags("fr").forEach(({ tag, count }) => {
        expect(getPostsByTag("fr", tag)).toHaveLength(count);
    });
});

test("getPostsByTag only returns tagged posts", () => {
    const tagged = getPostsByTag("fr", "mémoire");
    expect(tagged.length).toBeGreaterThan(0);
    expect(tagged.every((p) => p.tags.includes("mémoire"))).toBe(true);
});

test("getPostsByTag excludes drafts", () => {
    expect(getPostsByTag("fr", "mémoire").some((p) => p.draft)).toBe(false);
});

test("getPostsInCategory only returns that category", () => {
    const inCategory = getPostsInCategory("fr", "c-series");
    expect(inCategory.length).toBeGreaterThan(0);
    expect(inCategory.every((p) => p.category === "c-series")).toBe(true);
});

test("getPostsInCategory excludes drafts", () => {
    expect(getPostsInCategory("fr", "c-series").some((p) => p.draft)).toBe(
        false,
    );
});
