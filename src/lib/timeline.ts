import type { Project } from "@/content";
import type { ProjectKey } from "../../.velite/project-keys";
import { Field, FIELD_OF } from "@/content/fields";
import { yearOf } from "./yearOf";
import { PROFILES } from "@/content/difficulty";
import { Turn } from "@/data/timeline";

export interface TimelinePoint {
    position: number; // yearOf project date
    field: Field; // Field in fields (by category)
    score: number; // Calculated from PROFILES
    title: Project["title"]; // from project frontmatter
    slug: Project["slug"]; // from project frontmatter
    stages: Project["stages"]; // from project frontmatter
}

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
