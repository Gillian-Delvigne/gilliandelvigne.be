import { useFormatter } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Post } from "@/content";


export default function PostCard({ post }: { post: Post }) {
    const format = useFormatter();
    const date = format.dateTime(new Date(post.date), {
        month: "long",
        year: "numeric",
    });

    return (
        <div>
            <Link
                locale={post.locale}
                href={{
                    pathname: "/blog/[category]/[slug]",
                    params: { category: post.category, slug: post.slug },
                }}
            >
                <h2 className="text-lg leading-title font-semibold tracking-title">
                    {post.title}
                </h2>
            </Link>
            <div>
                <p className="mt-1.5 font-mono text-2xs tracking-label text-dim uppercase">
                    {date}
                </p>
                <p className="mt-2 max-w-(--measure-dek) text-body text-dim">
                    {post.dek}
                </p>
            </div>
        </div>
    );
}
