import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPosts, isLocale } from "@/content";
import { getNavItem } from "@/data/nav";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import { PostCard } from "@/components/ui/PostCard";
import { CategoryNav } from "@/components/ui/CategoryNav";
import { getCategories } from "@/content";

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getNavItem("blog");
    const posts = getPosts(lang);
    const t = await getTranslations("Empty");
    const titles = new Map(
        getCategories(lang).map((category) => [category.slug, category.title]),
    );

    return (
        <PageFrame
            title={pageInfo.label}
            dek={pageInfo.dek}
            breadcrumb={await getCrumbs("blog")}
        >
            <div className="flex flex-col gap-6">
                <CategoryNav locale={lang} />
                {posts.length > 0 ? (
                    <div className="flex max-w-(--width-post-list) flex-col gap-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post.slug}
                                post={post}
                                category={
                                    titles.get(post.category) ?? post.category
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-dim">{t("posts")}</p>
                )}
            </div>
        </PageFrame>
    );
}
