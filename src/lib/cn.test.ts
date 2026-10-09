import { expect, test } from "vitest";
import { cn } from "./cn";

test("base test", () => {
    expect(cn("a", "b")).toBe("a b");
});

test("drop falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
});

test("last only is kept", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
});

test("check object syntax", () => {
    expect(cn("base", { on: true, off: false })).toBe("base on");
});

test("custom theme limit, normal duplicates", () => {
    expect(cn("text-body", "text-2xs")).toBe("text-body text-2xs");
});
