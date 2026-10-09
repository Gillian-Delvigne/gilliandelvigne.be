import { expect, test } from "vitest";
import { isLocale } from "./locales";

test("fr is in Locales", () => expect(isLocale("fr")).toBe(true));
test("FR in uppercase", () => expect(isLocale("FR")).toBe(false));
test("wrong locale value", () => expect(isLocale("es")).toBe(false));
