import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
    getCategories,
    getPosts,
    getPostsInCategory,
    type Locale,
} from "@/content";

interface CategoryNavProps {
    locale: Locale;
    current?: string;
}

const CHIP =
    "inline-flex min-h-9 items-center gap-2.5 rounded-md border border-(--line) px-3 py-1.5 text-sm text-dim " +
    "transition-colors duration-(--dur-micro) hover:text-ink " +
    "aria-[current=page]:border-(--brand-border) aria-[current=page]:bg-(--brand-surface) aria-[current=page]:text-brand " +
    "pointer-coarse:min-h-(--size-target)";

export const CategoryNav = async ({ locale, current }: CategoryNavProps) => {
    const t = await getTranslations("Blog");
    const categories = getCategories(locale)
        .map((category) => ({
            category,
            count: getPostsInCategory(locale, category.slug).length,
        }))
        .filter(({ count }) => count > 0);
    const total = getPosts(locale).length;

    return (
        <nav aria-label={t("categories")}>
            <ul className="flex flex-wrap gap-2">
                <li>
                    <Link
                        href="/blog"
                        aria-current={current ? undefined : "page"}
                        className={CHIP}
                    >
                        {t("all")}
                        <span aria-hidden="true" className="font-mono text-2xs">
                            {total}
                        </span>
                        <span className="sr-only">
                            {t("count", { count: total })}
                        </span>
                    </Link>
                </li>
                {categories.map(({ category, count }) => (
                    <li key={category.slug}>
                        <Link
                            href={{
                                pathname: "/blog/[category]",
                                params: { category: category.slug },
                            }}
                            aria-current={
                                current === category.slug ? "page" : undefined
                            }
                            className={CHIP}
                        >
                            {category.title}
                            <span
                                aria-hidden="true"
                                className="font-mono text-2xs"
                            >
                                {count}
                            </span>
                            <span className="sr-only">
                                {t("count", { count })}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
