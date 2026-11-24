import { defineConfig, s, z } from "velite";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Post, Project } from "./.velite";
import { isLocale, LOCALES, DEFAULT_LOCALE } from "./src/content/locales";
import type { Locale } from "./src/content/locales";
import * as fs from "fs";
import * as path from "path";
import messages from "./messages/fr.json";
import { diagrams } from "./src/diagrams/generated";
import { codeTheme } from "@/lib/code-theme";
import { STAGES, Step } from "@/data/timeline";

type ProjectCategory = keyof typeof messages.Projects.categories;

const PROJECT_CATEGORIES = Object.keys(messages.Projects.categories) as [
    ProjectCategory,
    ...ProjectCategory[],
];
const PROJECT_STAGES = Object.keys(STAGES) as [Step, ...Step[]];
const DIAGRAM_NAMES = Object.keys(diagrams);
const BLOG_SEGMENTS = 4;
const DEFAULT_SEGMENTS = 3;

const splitPath = <T extends { path: string }>(
    data: T,
    ctx: z.RefinementCtx,
    expected: number,
): string[] | null => {
    const segments = data.path.split("/");
    if (segments.length !== expected) {
        ctx.addIssue({
            code: s.ZodIssueCode.custom,
            message: `Unexpected path : "${data.path}". Expected : ${expected === BLOG_SEGMENTS ? "collection/locale/category/slug" : "collection/locale/slug"}.`,
        });
        return null;
    }
    return segments;
};

const withLocaleSlug = <T extends { path: string }>(
    data: T,
    ctx: z.RefinementCtx,
    expected: number,
) => {
    const segments = splitPath(data, ctx, expected);
    if (!segments) return s.NEVER;
    const [, locale, slug] = segments;
    if (!isLocale(locale)) {
        ctx.addIssue({
            code: s.ZodIssueCode.custom,
            message: `Locale ${locale} is not valid`,
        });
        return s.NEVER;
    }
    return { ...data, locale, slug };
};

const withLocaleCategorySlug = <T extends { path: string }>(
    data: T,
    ctx: z.RefinementCtx,
    expected: number,
) => {
    const segments = splitPath(data, ctx, expected);
    if (!segments) return s.NEVER;
    const [, locale, category, slug] = segments;
    if (!isLocale(locale)) {
        ctx.addIssue({
            code: s.ZodIssueCode.custom,
            message: `Locale ${locale} is not valid`,
        });
        return s.NEVER;
    }
    return { ...data, locale, category, slug };
};

const checkCategoryValidity = (item: Post, categoryKeys: string[]) => {
    const errors = [];

    const itemKey = `${item.locale}/${item.category}`;
    if (!categoryKeys.includes(itemKey))
        errors.push(`${item.title} should reference a valid category`);
    return errors;
};

const checkTranslationKeysValidity = <
    T extends { translationKey: string; locale: Locale },
>(
    items: T[],
): string[] => {
    const errors: string[] = [];
    const byLocale = {} as Record<Locale, string[]>;

    for (const locale of LOCALES) byLocale[locale] = [];
    for (const item of items) {
        byLocale[item.locale].push(item.translationKey);
    }

    for (const locale of LOCALES) {
        const keys = byLocale[locale];
        if (keys.length !== new Set(keys).size)
            errors.push(
                `Found duplicates in ${locale.toUpperCase()} translation keys`,
            );
    }

    for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue;
        for (const key of byLocale[locale]) {
            if (!byLocale[DEFAULT_LOCALE].includes(key))
                errors.push(
                    `${key} is present in ${locale.toUpperCase()} but its equivalent is missing in ${DEFAULT_LOCALE.toUpperCase()}`,
                );
        }
    }
    return errors;
};

const checkStagesValidity = <
    T extends {
        stages: Step[];
        locale: Locale;
        translationKey: Project["translationKey"];
    },
>(
    items: T[],
) => {
    const errors: string[] = [];
    const projectStages = {} as Record<
        Project["translationKey"],
        Record<Locale, Step[]>
    >;

    for (const item of items) {
        projectStages[item.translationKey] ??= {} as Record<Locale, Step[]>;
        projectStages[item.translationKey][item.locale] = item.stages;
    }

    for (const [key, stagesInLocale] of Object.entries(projectStages)) {
        const stages = Object.entries(stagesInLocale).map(
            ([locale, stage]) => ({ locale: locale, sets: new Set(stage) }),
        );
        for (let i = 0; i < stages.length - 1; i++) {
            const { locale, sets } = stages[i];
            const next = stages[i + 1];
            if (sets.symmetricDifference(next.sets).size)
                errors.push(
                    `${key.toUpperCase()} stages are not corresponding: ${locale} = ${Array.from(sets).join(", ")} | ${next.locale} = ${Array.from(next.sets).join(", ")}`,
                );
        }
    }
    return errors;
};

const isSitePath = (path: string) => {
    return path.length > 1 && path.startsWith("/") && path[1] !== "/";
};

export default defineConfig({
    root: "content",
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            [rehypePrettyCode, { theme: codeTheme, keepBackground: false }],
        ],
    },
    collections: {
        posts: {
            name: "Post",
            pattern: "blog/**/*.mdx",
            schema: s
                .object({
                    type: s.literal("post").default("post"),
                    title: s.string().max(120),
                    dek: s.string().max(200),
                    translationKey: s.string().max(50),
                    date: s.isodate(),
                    tags: s.array(s.string()).default([]),
                    draft: s.boolean().default(false),
                    path: s.path(),
                    excerpt: s.excerpt(),
                    metadata: s.metadata(),
                    snippet: s.object({
                        file: s.string().max(40),
                        lang: s.string().max(20),
                        code: s.string().refine((code) => {
                            const lines = code.split("\n").slice(0, -1);
                            const openWithComment = /^\s*(\/\/|#|--)/.test(
                                lines[0],
                            );
                            return (
                                lines.length >= 2 &&
                                lines.length <= 5 &&
                                openWithComment
                            );
                        }, "snippet: 2 to 5 lines, the first one a comment"),
                    }),
                    toc: s.toc(),
                    content: s.mdx(),
                })
                .transform((data, ctx) =>
                    withLocaleCategorySlug(data, ctx, BLOG_SEGMENTS),
                ),
        },
        projects: {
            name: "Project",
            pattern: "projects/**/*.mdx",
            schema: s
                .object({
                    type: s.literal("project").default("project"),
                    title: s.string().max(120),
                    dek: s.string().max(300),
                    translationKey: s.string().max(50),
                    date: s.isodate(),
                    tags: s.array(s.string()).default([]),
                    category: s.enum(PROJECT_CATEGORIES),
                    stack: s.array(s.string()).default([]),
                    draft: s.boolean().default(false),
                    status: s
                        .enum(["live", "partial", "wip", "private", "archived"])
                        .default("live"),
                    evidence: s
                        .object({
                            scope: s.string().optional(),
                            coupling: s.string().optional(),
                            stakes: s.string().optional(),
                            conformance: s.string().optional(),
                            rules: s.string().optional(),
                            disciplines: s.string().optional(),
                        })
                        .default({}),
                    media: s
                        .object({
                            demo: s
                                .discriminatedUnion("kind", [
                                    s.object({
                                        kind: s.literal("video"),
                                        src: s
                                            .string()
                                            .refine(isSitePath, {
                                                message:
                                                    "Video path should be valid",
                                            })
                                            .or(
                                                s
                                                    .string()
                                                    .url(
                                                        "Video url should be valid",
                                                    ),
                                            ),
                                        poster: s.image().optional(),
                                    }),
                                    s.object({
                                        kind: s.literal("live"),
                                        src: s
                                            .string()
                                            .url(
                                                "Live path should be a valid external url",
                                            )
                                            .refine(
                                                (val) =>
                                                    val.startsWith("https://"),
                                                {
                                                    message:
                                                        "Plese provide a secure url",
                                                },
                                            ),
                                    }),
                                ])
                                .optional(),
                            gallery: s
                                .array(
                                    s.discriminatedUnion("kind", [
                                        s.object({
                                            kind: s.literal("diagram"),
                                            src: s
                                                .string()
                                                .refine(
                                                    (name) =>
                                                        DIAGRAM_NAMES.includes(
                                                            name,
                                                        ),
                                                    {
                                                        message: `Diagram name should be part of ${DIAGRAM_NAMES.join(", ")}`,
                                                    },
                                                ),
                                            caption: s.string(),
                                        }),
                                        s.object({
                                            kind: s.literal("capture"),
                                            src: s.image(),
                                            caption: s.string(),
                                        }),
                                    ]),
                                )
                                .optional(),
                        })
                        .optional(),
                    stages: s.array(s.enum(PROJECT_STAGES)).nonempty(),
                    order: s.number().default(0),
                    ref: s.string().optional(),
                    path: s.path(),
                    cover: s.image().optional(),
                    featured: s.boolean().default(false),
                    links: s
                        .object({
                            live: s.string().url().optional(),
                            repo: s.string().url().optional(),
                        })
                        .default({}),
                    description: s.mdx(),
                })
                .transform((data, ctx) =>
                    withLocaleSlug(data, ctx, DEFAULT_SEGMENTS),
                ),
        },
        categories: {
            name: "Category",
            pattern: "categories/**/*.mdx",
            schema: s
                .object({
                    type: s.literal("category").default("category"),
                    title: s.string().max(120),
                    dek: s.string().max(200),
                    translationKey: s.string().max(50),
                    order: s.number().default(0),
                    path: s.path(),
                    description: s.mdx(),
                })
                .transform((data, ctx) =>
                    withLocaleSlug(data, ctx, DEFAULT_SEGMENTS),
                ),
        },
    },
    prepare: (data) => {
        const errors: string[] = [];

        const { posts, categories, projects } = data;
        const safeCategories = categories.filter(
            (category) => category.type === "category",
        );
        const safePosts = posts.filter((post) => post.type === "post");
        const safeProjects = projects.filter(
            (project) => project.type === "project",
        );

        const items = [...safePosts, ...safeProjects];

        const categoryKeys = safeCategories.map(
            (category) => `${category.locale}/${category.slug}`,
        );

        items.forEach((item) => {
            if (item.type === "post") {
                if (!item.category)
                    errors.push(`${item.title} should contain a category`);
                const categoryErrors = checkCategoryValidity(
                    item,
                    categoryKeys,
                );
                if (categoryErrors.length) errors.push(...categoryErrors);
            }
        });

        const translationKeysBlogErrors =
            checkTranslationKeysValidity(safePosts);
        if (translationKeysBlogErrors.length)
            errors.push(...translationKeysBlogErrors);
        const translationKeysProjectErrors =
            checkTranslationKeysValidity(safeProjects);
        if (translationKeysProjectErrors.length)
            errors.push(...translationKeysProjectErrors);
        const stagesProjectErrors = checkStagesValidity(safeProjects);
        if (stagesProjectErrors.length) errors.push(...stagesProjectErrors);
        const translationKeysCategoryErrors =
            checkTranslationKeysValidity(safeCategories);
        if (translationKeysCategoryErrors.length)
            errors.push(...translationKeysCategoryErrors);

        if (errors.length) throw new Error(errors.join("\n"));
    },
    complete: (data, context) => {
        const translationKeys = data.projects
            .filter((p) => p.locale === DEFAULT_LOCALE && p.draft === false)
            .map((p) => `"${p.translationKey}"`)
            .sort();
        const buffer = `// Generated by velite.config.ts. Do not edit.\nexport type ProjectKey = ${translationKeys.join(" | ")};\n`;
        const dirPath = path.join(
            context.config.output.data,
            "/project-keys.d.ts",
        );

        fs.writeFileSync(dirPath, buffer);
    },
});
