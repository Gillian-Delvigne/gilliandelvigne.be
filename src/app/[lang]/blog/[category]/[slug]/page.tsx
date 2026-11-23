import { getFormatter, getTranslations } from "next-intl/server";
import getCrumbs from "@/data/crumbs";
import {
    findCatAndSlugByLocale,
    getCategory,
    getPost,
    getPosts,
} from "@/content";
import { isLocale, LOCALES } from "@/content";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import PageHeading from "@/components/layout/PageHeading";
import { Dot } from "@/components/ui/Dot";
import { redirect } from "@/i18n/navigation";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";

export const generateStaticParams = () => {
    const posts = LOCALES.flatMap((locale) =>
        getPosts(locale).map(({ category, slug }) => ({ category, slug })),
    );
    return LOCALES.flatMap((lang) => posts.map((post) => ({ lang, ...post })));
};

export default async function BlogPost({
    params,
}: PageProps<"/[lang]/blog/[category]/[slug]">) {
    const { lang, category, slug } = await params;

    if (!isLocale(lang)) return notFound();
    const cat = getCategory(lang, category);
    const post = cat && getPost(lang, cat.slug, slug);
    if (!cat || !post) {
        const result = findCatAndSlugByLocale(slug, category, lang);
        if (!result) return notFound();
        const { twinSlug, twinCat } = result;
        return redirect({
            href: {
                pathname: "/blog/[category]/[slug]",
                params: { slug: twinSlug, category: twinCat },
            },
            locale: lang,
        });
    }

    const crumbs = await getCrumbs(
        "blog",
        {
            label: cat.title,
            href: {
                pathname: "/blog/[category]",
                params: { category: cat.slug },
            },
        },
        {
            label: post.title,
            href: {
                pathname: "/blog/[category]/[slug]",
                params: { category: cat.slug, slug: post.slug },
            },
        },
    );

    const format = await getFormatter({ locale: lang });
    const t = await getTranslations("Post");
    const date = format.dateTime(new Date(post.date), {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="shell pt-10 pb-24 md:pb-32">
            <Breadcrumb crumbs={crumbs} />
            <PageHeading title={post.title} dek={post.dek} />
            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-dim">
                <time dateTime={post.date}>{date}</time>
                <Dot />
                {t("readingTime", { minutes: post.metadata.readingTime })}
            </p>
            <div className="mt-12">
                <Prose>
                    <Mdx code={post.content} />
                </Prose>
            </div>
        </div>
    );
}
