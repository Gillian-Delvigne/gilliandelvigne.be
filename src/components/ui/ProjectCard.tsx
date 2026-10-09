import { useFormatter } from "next-intl";
import type { Project } from "@/content";
import { Tag } from "./Tag";
import { Link } from "@/i18n/navigation";
import CategorySeal from "@/components/ui/CategorySeal";
import { getTranslations } from "next-intl/server";
import messages from "../../../messages/fr.json";

type CategorySlug = keyof (typeof messages)["Projects"]["categories"];

const isCategorySlug = (s: string): s is CategorySlug =>
    s in messages.Projects.categories;

function FDate({ date }: { date: string }) {
    const format = useFormatter();
    const formatted = format.dateTime(new Date(date), {
        month: "long",
        year: "numeric",
    });
    return <p>{formatted}</p>;
}

export default async function ProjectCard({ project }: { project: Project }) {
    const t = await getTranslations("Projects.categories");
    const label = isCategorySlug(project.category)
        ? t(project.category)
        : project.category;

    return (
        <div className="bg-parchment-raised rounded-card sheet-bite-edge">
            <CategorySeal
                className="w-18 h-18 text-accent absolute top-3 left-3"
                label={label}
                glyph="<p></p>"
                decorative={false}
            />
            <Link
                locale={project.locale}
                href={{
                    pathname: "/portfolio/[slug]",
                    params: { slug: project.slug },
                }}
            >
                <h2>{project.title}</h2>
            </Link>
            <p>{project.dek}</p>
            <FDate date={project.date} />
            <div>
                {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
            <div>
                {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                ))}
            </div>
        </div>
    );
}
