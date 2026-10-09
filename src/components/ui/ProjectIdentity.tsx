import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/content";

const readable = (href: string) =>
    href
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");

const ExternalLink = ({ href }: { href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent underline decoration-accent/50 underline-offset-[3px]
                   transition-colors duration-(--dur-micro)
                   hover:text-accent-deep hover:decoration-accent-deep
                   focus-visible:text-accent-deep"
    >
        {readable(href)}
    </a>
);

export default async function ProjectIdentity({
    project,
}: {
    project: Project;
}) {
    const t = await getTranslations("Projects.identity");


    const rows: { label: string; value: ReactNode }[] = [
        project.stack.length > 0 && {
            label: t("stack"),
            value: project.stack.join(", "),
        },
        project.date && {
            label: t("date"),
            value: new Date(project.date).getFullYear(),
        },
        project.links?.live && {
            label: t("link"),
            value: <ExternalLink href={project.links.live} />,
        },
        project.links?.repo && {
            label: t("repository"),
            value: <ExternalLink href={project.links.repo} />,
        },
    ].filter(Boolean) as { label: string; value: ReactNode }[];

    if (rows.length === 0) return null;

    return (
        <dl className="my-8 grid gap-y-2">
            {rows.map(({ label, value }) => (
                <div
                    key={label}
                    className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3"
                >
                    <dt
                        className="font-mono text-xs leading-ui font-medium tracking-label
                                   text-ink-muted uppercase whitespace-nowrap"
                    >
                        {label}
                    </dt>
                    <span
                        aria-hidden="true"
                        className="border-rule translate-y-[-0.2em] border-b border-dotted"
                    />

                    <dd className="font-mono text-xs leading-ui text-ink tabular-nums">
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
