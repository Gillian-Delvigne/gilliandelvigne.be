import { expect, test } from "vitest";
import {
    getCategory,
    getCategoryTranslation,
    getPost,
    getPostTranslation,
    getProject,
    getProjectTranslation,
} from "./index";

const frPost = getPost("fr", "c-series", "les-pointeurs-en-c")!;
const frCategory = getCategory("fr", "c-series")!;
const frProject = getProject("fr", "save-lives")!;

// Fabricated: a document whose key exists nowhere else. The editorial corpus
// should not have to carry a hole for this test to mean something.
const orphan = { ...frProject, translationKey: "__no-sibling__" };

test("the fixtures used by this file exist", () => {
    expect(frPost).toBeDefined();
    expect(frCategory).toBeDefined();
    expect(frProject).toBeDefined();
});

test("the translation shares the key and switches locale", () => {
    const en = getPostTranslation(frPost, "en");
    expect(en?.locale).toBe("en");
    expect(en?.translationKey).toBe(frPost.translationKey);
});

test("round trip returns the original document", () => {
    const en = getPostTranslation(frPost, "en")!;
    expect(getPostTranslation(en, "fr")).toBe(frPost);
});

test("targeting the source locale returns the document itself", () => {
    expect(getPostTranslation(frPost, "fr")).toBe(frPost);
});

test("no sibling returns undefined", () => {
    expect(getProjectTranslation(orphan, "en")).toBe(undefined);
});

test("categories translate the same way", () => {
    const en = getCategoryTranslation(frCategory, "en");
    expect(en?.locale).toBe("en");
    expect(en?.translationKey).toBe(frCategory.translationKey);
    expect(getCategoryTranslation(en!, "fr")).toBe(frCategory);
});

test("projects translate the same way", () => {
    const en = getProjectTranslation(frProject, "en");
    expect(en?.locale).toBe("en");
    expect(en?.translationKey).toBe(frProject.translationKey);
    expect(getProjectTranslation(en!, "fr")).toBe(frProject);
});
