import { expect, test } from "vitest";
import { isCurrentPage } from "@/lib/isCurrentPage";

test("Test root", () => expect(isCurrentPage("/", "/")).toBe(true));

test("Test blog", () => expect(isCurrentPage("/blog", "/blog")).toBe(true));

test("Test substring", () =>
    expect(isCurrentPage("/blogpost", "/blog")).toBe(false));

test("Test complex path", () =>
    expect(isCurrentPage("/blog/c-series/pointers", "/blog")).toBe(true));
