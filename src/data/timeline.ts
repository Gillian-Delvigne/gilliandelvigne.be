import type { Field } from "@/content/fields";

export const CAREER_START = new Date("2011-06-30");
export const DEV_START = new Date("2021-05-30");
export const PEDAGO_END = new Date("2023-07-01");

export type Step =
    | "education"
    | "editorial"
    | "van-in"
    | "red-cross"
    | "ulb-cpfb"
    | "freelance"
    | "42-belgium"
    | "elausys"
    | "technobel";

interface Stage {
    field: Field;
    start: Date;
    end: Date | null;
    training?: boolean;
}

export type TurnName = "code" | "both" | "fulltime";

export interface Turn {
    name: TurnName;
    fields: Field[];
    start: Date;
    end: Date | null;
    background?: boolean;
}

export const STAGES: Record<Step, Stage> = {
    education: {
        field: "pedagogy",
        start: new Date("2006-09-15"),
        end: CAREER_START,
        training: true,
    },
    editorial: {
        field: "pedagogy",
        start: CAREER_START,
        end: new Date("2014-01-01"),
    },
    "van-in": {
        field: "pedagogy",
        start: new Date("2014-01-01"),
        end: new Date("2017-01-01"),
    },
    "red-cross": {
        field: "pedagogy",
        start: new Date("2017-01-01"),
        end: new Date("2021-01-01"),
    },
    "ulb-cpfb": {
        field: "pedagogy",
        start: new Date("2021-01-01"),
        end: PEDAGO_END,
    },
    freelance: {
        field: "development",
        start: DEV_START,
        end: null,
    },
    "42-belgium": {
        field: "development",
        start: new Date("2023-09-01"),
        end: null,
        training: true,
    },
    elausys: {
        field: "development",
        start: new Date("2025-07-01"),
        end: new Date("2026-02-01"),
    },
    technobel: {
        field: "development",
        start: new Date("2026-01-01"),
        end: new Date("2026-10-31"),
        training: true,
    },
};

export const TURNS: Turn[] = [
    {
        name: "code",
        fields: ["pedagogy"],
        start: STAGES["van-in"].start,
        end: STAGES["red-cross"].end,
    },
    {
        name: "both",
        fields: ["pedagogy", "development"],
        start: DEV_START,
        end: STAGES["ulb-cpfb"].end,
        background: true,
    },
    {
        name: "fulltime",
        fields: ["development"],
        start: PEDAGO_END,
        end: null,
    },
];
