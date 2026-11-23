import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
    LOCALES,
    getCategories,
    getCategory,
    getPostsInCategory,
    isLocale,
} from "@/content";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";
import { CategoryNav } from "@/components/ui/CategoryNav";
import { PostCard } from "@/components/ui/PostCard";

export const generateStaticParams = () =>
    LOCALES.flatMap((lang) =>
        getCategories(lang).map(({ slug }) => ({ lang, category: slug })),
    );

const BlogCategory = async ({
    params,
}: PageProps<"/[lang]/blog/[category]">) => {
    const { lang, category } = await params;
    if (!isLocale(lang)) return notFound();

    const cat = getCategory(lang, category);
    if (!cat) return notFound();

    const posts = getPostsInCategory(lang, cat.slug);
    const t = await getTranslations("Empty");
    const crumbs = await getCrumbs("blog", {
        label: cat.title,
        href: { pathname: "/blog/[category]", params: { category: cat.slug } },
    });

    return (
        <PageFrame title={cat.title} dek={cat.dek} breadcrumb={crumbs}>
            <Prose>
                <Mdx code={cat.description} />
            </Prose>
            <div className="flex flex-col gap-6">
                <CategoryNav locale={lang} current={cat.slug} />
                {posts.length > 0 ? (
                    <div className="flex max-w-(--width-post-list) flex-col gap-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post.slug}
                                post={post}
                                category={cat.title}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-dim">{t("category")}</p>
                )}
            </div>
        </PageFrame>
    );
};

export default BlogCategory;
