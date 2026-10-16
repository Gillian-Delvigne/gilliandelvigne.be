import type { Project } from "@/content";
import { Tag } from "./Tag";
import { Link } from "@/i18n/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import { PROFILES, peakAxes } from "@/content/difficulty";
import { ProjectKey } from "../../../.velite/project-keys";

export default async function ProjectCard({ project }: { project: Project }) {
    const format = await getFormatter({ locale: project.locale });
    const t = await getTranslations("Difficulty");
    const peaks = peakAxes(PROFILES[project.translationKey as ProjectKey]).map(
        (peak) => t(`axes.${peak}`).toLocaleLowerCase(project.locale),
    );
    const list = format.list(peaks, { type: "conjunction" });
    const axePhrase = t.rich("peak", {
		axes: list,
        b: (chunks) => <b>{chunks}</b>,
    });
	const date = format.dateTime(new Date(project.date), {
		month: "long",
		year: "numeric",
	});
	
    return (
        <div className="bg-parchment-raised rounded-card sheet-bite-edge">
            {axePhrase}
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
            <p>{date}</p>
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
