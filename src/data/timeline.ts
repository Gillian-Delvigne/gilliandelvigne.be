export const CAREER_START = new Date("2011-06-30");
export const DEV_START = new Date("2021-05-30");

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
    field: "pedagogy" | "development";
    start: Date;
    end: Date | null;
    training?: boolean;
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
        end: new Date("2023-07-01"),
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
