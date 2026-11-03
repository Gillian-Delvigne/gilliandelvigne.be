import { test, expect } from "vitest";
import { FIELDS, FIELD_OF } from "./fields";
import { getProjects } from "./projects";

test.each(FIELDS)("%s has at least one project", (field) => {
    const all = getProjects("fr");
    expect(all.some((project) => FIELD_OF[project.category] === field)).toBe(
        true,
    );
});
