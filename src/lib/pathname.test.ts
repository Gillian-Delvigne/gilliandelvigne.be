import { expect, test } from "vitest";
import { getRoutingPathname } from "./pathname";

test("base path", () => {
    expect(getRoutingPathname("/about")).toBe("/about");
});

test("Known project slug", () => {
    expect(getRoutingPathname("/portfolio/modules-odoo")).toBe(
        "/portfolio/[slug]",
    );
});

// An unknown project slug still maps to the template: the page itself answers 404
test("Unknown project slug", () => {
    expect(getRoutingPathname("/portfolio/blabla")).toBe("/portfolio/[slug]");
});

test("Misspelled section", () => {
    expect(getRoutingPathname("/portolio/blabla")).toBe(undefined);
});

test("Blog slug", () => {
    expect(getRoutingPathname("/blog/c-series/pointers-in-c")).toBe(
        "/blog/[category]/[slug]",
    );
});

test("Blog category without a slug", () => {
    expect(getRoutingPathname("/blog/c-series")).toBe("/blog/[category]");
});
