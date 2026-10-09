import { getStation } from "@/data/station";
import getCrumbs from "@/data/crumbs";
import { findCatAndSlugByLocale, getCategory, getPost } from "@/content";
import { isLocale } from "@/content";
import { notFound } from "next/navigation";
import PageFrame from "@/components/layout/PageFrame";
import { redirect } from "@/i18n/navigation";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";

export default async function BlogPost({
    params,
}: PageProps<"/[lang]/blog/[category]/[slug]">) {
    const { lang, category, slug } = await params;
    const pageInfo = await getStation("blog");

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
    return (
        <PageFrame eyebrow={pageInfo.eyebrow} breadcrumb={crumbs}>
            <Prose>
                <h2>{post.title}</h2>
                <Mdx code={post.content} />
            </Prose>
        </PageFrame>
    );
}
