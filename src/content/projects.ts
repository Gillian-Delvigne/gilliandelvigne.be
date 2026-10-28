import { projects, type Project } from "../../.velite";
import type { Locale } from "./locales";
import { findTranslation } from "./translations";

const NOT_FOUND = -1;

export type { Project };

export interface NextProject {
    project: Project;
    position: number;
    total: number;
}

export const getProjects = (locale: Locale): Project[] => {
    return projects
        .filter(
            (project) => project.locale === locale && project.draft === false,
        )
        .sort((a, b) => {
            if (a.order === b.order) return b.date.localeCompare(a.date);
            return a.order - b.order;
        });
};

export const getProject = (
    locale: Locale,
    slug: string,
): Project | undefined => {
    return projects.find(
        (project) =>
            project.locale === locale &&
            project.slug === slug &&
            project.draft === false,
    );
};

export const getFeaturedProjects = (locale: Locale) => {
    return getProjects(locale)
        .filter((project) => project.featured)
        .sort((a, b) => a.date.localeCompare(b.date));
};

export const getProjectTranslation = (
    project: Project,
    target: Locale,
): Project | undefined => {
    return findTranslation(projects, project, target);
};

export const findSlugInLocale = (
    slug: string,
    target: Locale,
): string | undefined => {
    const project = projects.find(
        (project) => project.slug === slug && project.draft === false,
    );
    if (!project) return;
    const translation = getProjectTranslation(project, target);
    if (!translation) return;
    if (translation.slug === slug) return;
    return translation.slug;
};

export const getAllProjectSlugs = (): string[] => {
    return Array.from(
        new Set<string>(
            projects.filter((p) => p.draft === false).map((p) => p.slug),
        ),
    );
};

export const getNextProject = (
    locale: Locale,
    slug: string,
): NextProject | undefined => {
    const projects = getProjects(locale);
    const currIndex = projects.findIndex((project) => project.slug === slug);
    if (currIndex === NOT_FOUND) return undefined;
    const nextIndex = (currIndex + 1) % projects.length;
    return {
        project: projects[nextIndex],
        position: nextIndex + 1,
        total: projects.length,
    };
};
