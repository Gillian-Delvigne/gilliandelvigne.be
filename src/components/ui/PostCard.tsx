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
                <h2>{post.title}</h2>
            </Link>
            <div>
                <p>{date}</p>
				<p>{post.dek}</p>
            </div>
        </div>
    );
}
