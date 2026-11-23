import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/content";
import { CodeWindow } from "./CodeWindow";
import { Tag } from "./Tag";

interface PostCardProps {
    post: Post;
    category: string;
    headingLevel?: 2 | 3;
}

export const PostCard = async ({ post, category, headingLevel }: PostCardProps) => {
    const format = await getFormatter({ locale: post.locale });
    const t = await getTranslations("Post");
    const date = format.dateTime(new Date(post.date), {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const Heading = `h${headingLevel ?? 2}` as const;

    return (
        <article
            className="group relative grid gap-y-4 rounded-card border border-(--line) bg-surface p-4.5 shadow-card
                       transition-colors duration-(--dur-micro) hover:border-(--brand-border)
                       md:grid-cols-[var(--width-post-date)_minmax(0,1fr)_var(--width-code-window)] md:items-center md:gap-x-6 md:px-5.75 md:py-5.5"
        >
            <time
                dateTime={post.date}
                className="font-mono text-xs text-dim tabular-nums md:self-start md:pt-1"
            >
                {date}
            </time>

            <div className="min-w-0">
                <p className="mb-2 font-mono text-2xs font-medium tracking-label text-brand uppercase">
                    {category}
                </p>
                <Heading className="text-lg leading-title font-semibold tracking-title">
                    <Link
                        locale={post.locale}
                        href={{
                            pathname: "/blog/[category]/[slug]",
                            params: { category: post.category, slug: post.slug },
                        }}
                        className="transition-colors duration-(--dur-micro) group-hover:text-brand
                                   focus-visible:outline-none
                                   after:absolute after:inset-0 after:rounded-card after:content-['']
                                   focus-visible:after:outline-2 focus-visible:after:outline-(--color-brand)
                                   focus-visible:after:outline-offset-3"
                    >
                        {post.title}
                    </Link>
                </Heading>
                <p className="mt-2 text-sm leading-body text-dim">{post.dek}</p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-2xs text-dim">
                        {t("readingTime", { minutes: post.metadata.readingTime })}
                    </span>
                    {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>
            </div>

            <CodeWindow {...post.snippet} />
        </article>
    );
};