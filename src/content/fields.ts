import type { Project } from "./projects";

export const FIELDS = ["pedagogy", "development"] as const;

export type Field = (typeof FIELDS)[number];

export const FIELD_PARAM = "field";

export const ALL = "all";

export const CHOICES = [ALL, ...FIELDS] as const;

export type Choice = (typeof CHOICES)[number];

export const FIELD_OF: Record<Project["category"], Field> = {
    "e-learning": "pedagogy",
    "serious-game": "pedagogy",
    applicatif: "development",
    systeme: "development",
    web: "development",
};
