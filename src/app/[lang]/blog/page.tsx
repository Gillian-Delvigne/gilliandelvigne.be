import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPosts, isLocale } from "@/content";
import { getStation } from "@/data/station";
import PageFrame from "@/components/layout/PageFrame";
import PostCard from "@/components/ui/PostCard";

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getStation("blog");
    const posts = getPosts(lang);
    const t = await getTranslations("Empty");

    return (
        <PageFrame eyebrow={pageInfo.eyebrow} dek={pageInfo.dek}>
            <div className="flex flex-col flex-wrap gap-6 py-8">
                {posts.length
                    ? posts.map((post) => (
                          <PostCard key={post.slug} post={post} />
                      ))
                    : t("posts")}
            </div>
        </PageFrame>
    );
}
