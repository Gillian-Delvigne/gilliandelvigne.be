import type { ProjectKey } from "../../.velite/project-keys";
import type { Profile, Axis } from "@/types/difficulty";

/* The axes of the hexagon, clockwise from the top. This array alone decides
   which axes exist and in which order they are drawn; the messages only name
   them, and `t(axis)` fails to compile if one is missing there. */
export const AXES = [
    "scope",
    "coupling",
    "stakes",
    "conformance",
    "rules",
    "disciplines",
] as const;

export const LEVELS = [0, 1, 2, 3, 4] as const;
export const MAX_LEVEL = 4;
export const DIFFICULTY_LEGEND_ID = "difficulty-legend";

export const PROFILES: Record<ProjectKey, Profile> = {
    elausys: {
        scope: 4,
        coupling: 4,
        stakes: 4,
        conformance: 1,
        rules: 3,
        disciplines: 2,
    },
    "odoo-modules": {
        scope: 3,
        coupling: 3,
        stakes: 3,
        conformance: 3,
        rules: 4,
        disciplines: 1,
    },
    "helpdesk-flask": {
        scope: 2,
        coupling: 1,
        stakes: 2,
        conformance: 2,
        rules: 3,
        disciplines: 1,
    },
    minishell: {
        scope: 1,
        coupling: 0,
        stakes: 0,
        conformance: 4,
        rules: 4,
        disciplines: 0,
    },
    fdf: {
        scope: 1,
        coupling: 0,
        stakes: 0,
        conformance: 3,
        rules: 3,
        disciplines: 1,
    },
    "ulb-pharmacy-simulation": {
        scope: 2,
        coupling: 1,
        stakes: 1,
        conformance: 4,
        rules: 3,
        disciplines: 4,
    },
    "save-lives": {
        scope: 2,
        coupling: 2,
        stakes: 1,
        conformance: 3,
        rules: 3,
        disciplines: 4,
    },
    pser: {
        scope: 1,
        coupling: 3,
        stakes: 4,
        conformance: 4,
        rules: 3,
        disciplines: 3,
    },
    "first-aid-app": {
        scope: 2,
        coupling: 1,
        stakes: 3,
        conformance: 3,
        rules: 2,
        disciplines: 4,
    },
    cpfb: {
        scope: 1,
        coupling: 1,
        stakes: 2,
        conformance: 1,
        rules: 1,
        disciplines: 3,
    },
    "ab-decowood": {
        scope: 1,
        coupling: 0,
        stakes: 1,
        conformance: 1,
        rules: 1,
        disciplines: 3,
    },
};

export const getProfile = (key: string): Profile | undefined => {
    return PROFILES[key as ProjectKey];
};

export const peakAxes = (profile: Profile): Axis[] => {
    const keys = Object.keys(profile) as Axis[];
    const maxKey = keys.reduce((a: Axis, b: Axis) =>
        profile[a] > profile[b] ? a : b,
    );
    return AXES.filter((axis) => profile[axis] === profile[maxKey]);
};
