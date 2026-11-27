import type { Project } from "@/content";
import type { ProjectKey } from "../../.velite/project-keys";
import { FIELD_OF, type Field } from "@/content/fields";
import { yearOf } from "./yearOf";
import { PROFILES } from "@/content/difficulty";
import { Turn, Stage, Step, Period } from "@/data/timeline";

export interface TimelinePoint {
    position: number; // yearOf project date
    field: Field; // Field in fields (by category)
    score: number; // Calculated from PROFILES
    title: Project["title"]; // from project frontmatter
    slug: Project["slug"]; // from project frontmatter
    stages: Project["stages"]; // from project frontmatter
}

type Shape = "range" | "since" | "single";

export const toTimelinePoints = (projects: Project[]): TimelinePoint[] => {
    const projectByDate = projects.toSorted((a, b) =>
        a.date.localeCompare(b.date),
    );
    return projectByDate.map((project) => ({
        position: yearOf(new Date(project.date)),
        field: FIELD_OF[project.category],
        score: Object.values(
            PROFILES[project.translationKey as ProjectKey],
        ).reduce<number>((score, curr) => score + curr, 0),
        title: project.title,
        slug: project.slug,
        stages: project.stages,
    }));
};

export const shouldLightUp = (
    point: TimelinePoint,
    turn: Turn,
    today: Date = new Date(),
): boolean => {
    return (
        turn.fields.includes(point.field) &&
        yearOf(turn.start) <= point.position &&
        point.position <= yearOf(turn.end ?? today)
    );
};

export const shapeOf = (period: Period): Shape => {
    if (period.end === null) return "since";
    if (period.start.getUTCFullYear() === period.end.getUTCFullYear())
        return "single";
    return "range";
};

export const periodOf = (
    field: Field,
    stages: Record<Step, Stage>,
    today: Date = new Date(),
): { start: Date; end: Date } => {
    const filteredStages = Object.values(stages).filter(
        (stage) => stage.field === field,
    );
    const ascStages = filteredStages.toSorted(
        (a, b) => a.start.getTime() - b.start.getTime(),
    );
    const descStages = filteredStages
        .map((stage) => ({
            ...stage,
            end: stage.end ?? today,
        }))
        .toSorted((a, b) => b.end.getTime() - a.end.getTime());
    return { start: ascStages[0].start, end: descStages[0].end };
};

export const messageOf = (
    period: Period & { training?: boolean },
    today: Date = new Date(),
): { training: "true" | "false"; shape: Shape; start: number; end: number } => {
    return {
        training: period.training ? "true" : "false",
        shape: shapeOf(period),
        start: period.start.getUTCFullYear(),
        end: (period.end ?? today).getUTCFullYear(),
    };
};

export const overlaps = (
    a: Stage,
    b: Stage,
    today: Date = new Date(),
): boolean => a.start < (b.end ?? today) && b.start < (a.end ?? today);

export const rowsOf = (stages: Stage[], today: Date = new Date()): number[] => {
    const order = stages
        .map((_, index) => index)
        .toSorted(
            (a, b) => stages[a].start.getTime() - stages[b].start.getTime(),
        );
    const rowEnds: Date[] = [];
    const rows: number[] = [];
    for (const index of order) {
        const stage = stages[index];
        const free = rowEnds.findIndex((end) => end <= stage.start);
        const row = free === -1 ? rowEnds.length : free;
        rowEnds[row] = stage.end ?? today;
        rows[index] = row;
    }
    return rows;
};
