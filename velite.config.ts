import { defineConfig, s, z } from "velite";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Post } from "./.velite";
import { isLocale, LOCALES, DEFAULT_LOCALE } from "./src/content/locales";
import type { Locale } from "./src/content/locales";

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

export default defineConfig({
    root: "content",
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            [rehypePrettyCode, { theme: "night-owl", keepBackground: false }],
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
                    dek: s.string().max(200),
                    translationKey: s.string().max(50),
                    date: s.isodate(),
                    tags: s.array(s.string()).default([]),
                    category: s.string(),
                    stack: s.array(s.string()).default([]),
                    draft: s.boolean().default(false),
                    status: s
                        .enum(["live", "partial", "wip", "private"])
                        .default("live"),
                    order: s.number().default(0),
                    emblem: s.string().optional(),
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
        const translationKeysCategoryErrors =
            checkTranslationKeysValidity(safeCategories);
        if (translationKeysCategoryErrors.length)
            errors.push(...translationKeysCategoryErrors);

        if (errors.length) throw new Error(errors.join("\n"));
    },
});
