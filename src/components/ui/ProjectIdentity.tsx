import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/content";
import { IconExternal } from "@/components/icons/icons";

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
        className="inline-flex items-center gap-1 text-brand underline decoration-(--brand-border) underline-offset-4
                   transition-colors duration-(--dur-micro)
                   hover:decoration-brand focus-visible:decoration-brand"
    >
        {readable(href)}
        <IconExternal className="size-icon-sm node-ink" />
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
        <div>

            {rows.length > 0 && (
                <dl className="mt-5 border-t border-(--line-soft)">
                    {rows.map(({ label, value }) => (
                        <div
                            key={label}
                            className="grid grid-cols-[var(--spacing-fact-label)_minmax(0,1fr)] items-baseline gap-x-3 border-b border-(--line-soft) py-2.5"
                        >
                            <dt className="font-mono text-2xs font-medium tracking-label text-dim uppercase">
                                {label}
                            </dt>
                            <dd className="min-w-0 text-sm text-ink">{value}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    );
}
