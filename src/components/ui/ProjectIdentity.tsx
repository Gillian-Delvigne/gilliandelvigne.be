import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/content";
import StatusBadge from "./StatusBadge";
import { Tag } from "./Tag";

const readable = (href: string) => {
    if (href.includes("github")) return "github";
    return href
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");
};

const ExternalLink = ({ href, newTab }: { href: string; newTab: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-brand underline decoration-(--brand-border) underline-offset-4
                   transition-colors duration-(--dur-micro)
                   hover:decoration-brand focus-visible:decoration-brand
                   after:ml-1 after:inline-block after:content-['↗'/'']"
    >
        {readable(href)}
        <span className="sr-only"> {newTab}</span>
    </a>
);

export default async function ProjectIdentity({
    project,
}: {
    project: Project;
}) {
    const t = await getTranslations("Projects");

    const rows: { label: string; value: ReactNode }[] = [
        project.category && {
            label: t("identity.category"),
            value: t(`categories.${project.category}`),
        },
        project.date && {
            label: t("identity.date"),
            value: (
                <span className="font-bold">
                    {new Date(project.date).getFullYear()}
                </span>
            ),
        },
        project.links?.live && {
            label: t("identity.link"),
            value: (
                <ExternalLink
                    href={project.links.live}
                    newTab={t("identity.newTab")}
                />
            ),
        },
        project.links?.repo && {
            label: t("identity.repository"),
            value: (
                <ExternalLink
                    href={project.links.repo}
                    newTab={t("identity.newTab")}
                />
            ),
        },
    ].filter(Boolean) as { label: string; value: ReactNode }[];

    return (
        <div className="mb-16">
            <p className="sr-only">{t("identity.status")}</p>
            <StatusBadge status={project.status} />

            {rows.length > 0 && (
                <dl className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-sm text-dim">
                    {rows.map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex items-center gap-x-3.5
                                       not-last:after:size-0.75 not-last:after:rounded-full
                                       not-last:after:bg-(--line) not-last:after:content-['']"
                        >
                            <dt className="sr-only">{label}</dt>
                            <dd className="font-inter text-sm text-dim">{value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {project.stack.length > 0 && (
                <ul
                    aria-label={t("identity.stack")}
                    className="mt-3.5 flex flex-wrap gap-1.5"
                >
                    {project.stack.map((elem) => (
                        <li key={elem}>
                            <Tag>{elem}</Tag>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
