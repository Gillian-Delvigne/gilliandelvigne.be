import { posts, type Post } from "../../.velite";
import type { Locale } from "./locales";
import { findTranslation } from "./translations";

export interface TagData {
    tag: string;
    count: number;
}

export type { Post };

export const getPosts = (locale: Locale): Post[] => {
    return posts
        .filter((post) => post.locale === locale && post.draft === false)
        .sort((a, b) => b.date.localeCompare(a.date));
};

export const getPost = (
    locale: Locale,
    category: string,
    slug: string,
): Post | undefined => {
    return posts.find(
        (post) =>
            post.locale === locale &&
            post.category === category &&
            post.slug === slug &&
            post.draft === false,
    );
};

export const getPostsInCategory = (
    locale: Locale,
    category: string,
): Post[] => {
    return posts.filter(
        (post) =>
            post.locale === locale &&
            post.category === category &&
            post.draft === false,
    );
};

export const getPostsByTag = (locale: Locale, tag: string): Post[] => {
    return posts.filter(
        (post) =>
            post.locale === locale &&
            post.tags.includes(tag) &&
            post.draft === false,
    );
};

export const getTags = (locale: Locale): TagData[] => {
    const posts: Post[] = getPosts(locale);
    const tagCounts: Record<string, number> = {};
    posts.forEach((post) => {
        post.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    const tags: TagData[] = Object.entries(tagCounts)
        .map(([tag, count]) => ({
            tag,
            count,
        }))
        .sort((a, b) => b.count - a.count);
    return tags;
};

export const getPostTranslation = (
    post: Post,
    target: Locale,
): Post | undefined => {
    return findTranslation(posts, post, target);
};

export const findCatAndSlugByLocale = (
    slug: string,
    category: string,
    target: Locale,
): { twinSlug: string; twinCat: string } | undefined => {
    const post = posts.find(
        (post) =>
            post.category === category &&
            post.slug === slug &&
            post.draft === false,
    );
    if (!post) return;
    const twin = getPostTranslation(post, target);
    if (!twin) return;
    if (twin.category === post.category && twin.slug === slug) return;
    return { twinSlug: twin.slug, twinCat: twin.category };
};
