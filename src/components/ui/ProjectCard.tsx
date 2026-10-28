import { getTranslations, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content";
import { PROFILES, peakAxes } from "@/content/difficulty";
import { ProjectKey } from "../../../.velite/project-keys";
import DifficultyHex from "./DifficultyHex";
import StatusBadge from "./StatusBadge";
import { Tag } from "./Tag";

interface ProjectCardProps {
    project: Project;
    headingLevel?: 2 | 3;
}

const MAX_STACK_TAGS = 3;

export default async function ProjectCard({
    project,
    headingLevel,
}: ProjectCardProps) {
    const format = await getFormatter({ locale: project.locale });
    const t = await getTranslations("Difficulty");
    const profile = PROFILES[project.translationKey as ProjectKey];
    const peaks = peakAxes(profile).map((peak) =>
        t(`axes.${peak}`).toLocaleLowerCase(project.locale),
    );
    const list = format.list(peaks, { type: "conjunction" });
    const axePhrase = t.rich("peak", {
        axes: list,
        b: (chunks) => <b className="font-medium text-ink">{chunks}</b>,
    });
    const year = format.dateTime(new Date(project.date), { year: "numeric" });

    const Heading = `h${headingLevel ?? 2}` as const;

    return (
        <article
            className="relative rounded-card border border-(--line) bg-surface p-4.75
                       shadow-card
                       transition-colors duration-(--dur-micro)
                       hover:border-(--brand-border)"
        >
            <header className="flex items-baseline justify-between gap-2.5 border-b border-(--line-soft) pb-2.75">
                <Heading className="text-base leading-title font-semibold tracking-title">
                    <Link
                        locale={project.locale}
                        href={{
                            pathname: "/portfolio/[slug]",
                            params: { slug: project.slug },
                        }}
                        className="focus-visible:outline-none
                                   after:absolute after:inset-0 after:rounded-card after:content-['']
                                   focus-visible:after:outline-2 focus-visible:after:outline-(--color-brand)
                                   focus-visible:after:outline-offset-3"
                    >
                        {project.title}
                    </Link>
                </Heading>
                <span className="font-mono text-xs font-medium text-dim">
                    {year}
                </span>
            </header>

            <p className="mt-2.75 mb-3.75 text-sm leading-body text-dim">
                {project.dek}
            </p>

            <div className="grid grid-cols-[var(--spacing-hex-card)_1fr] items-center gap-4">
                <DifficultyHex profile={profile} className="size-hex-card" />
                <p className="text-xs leading-normal text-dim">{axePhrase}</p>
            </div>

            <div className="mt-3.75 flex flex-wrap items-center gap-1.5">
                <StatusBadge status={project.status} />
                {project.stack.slice(0, MAX_STACK_TAGS).map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                ))}
            </div>
        </article>
    );
}
