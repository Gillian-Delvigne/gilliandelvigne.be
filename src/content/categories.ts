import { categories, type Category } from "../../.velite";
import type { Locale } from "./locales";
import { findTranslation } from "./translations";

export type { Category }

export const getCategories = (locale: Locale): Category[] => {
    return categories
        .filter((category) => category.locale === locale)
        .sort((a, b) => {
            if (a.order === b.order) return a.title.localeCompare(b.title);
            return a.order - b.order;
        });
};

export const getCategory = (
    locale: Locale,
    slug: string,
): Category | undefined => {
    return categories.find(
        (category) => category.locale === locale && category.slug === slug,
    );
};

export const getCategoryTranslation = (
    category: Category,
    target: Locale,
): Category | undefined => {
    return findTranslation(categories, category, target);
};
