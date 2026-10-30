import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import {
    LOCALES,
    isLocale,
    getProject,
    findSlugInLocale,
    getAllProjectSlugs,
} from "@/content";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";
import ProjectIdentity from "@/components/ui/ProjectIdentity";
import { getTranslations } from "next-intl/server";
import { AXES, getProfile } from "@/content/difficulty";
import type { AxisLabels } from "@/types/difficulty";
import { RevealOnView } from "@/components/ui/RevealOnView";
import DifficultyHex from "@/components/ui/DifficultyHex";
import DifficultyTable from "@/components/ui/DifficultyTable";
import DifficultyLegendTrigger from "@/components/ui/DifficultyLegendTrigger";
import DifficultyLegend from "@/components/ui/DifficultyLegend";
import ProjectNext from "@/components/layout/ProjectNext";

export async function generateStaticParams() {
    return LOCALES.flatMap((lang) =>
        getAllProjectSlugs().map((slug) => ({ lang, slug })),
    );
}

export default async function Page({
    params,
}: PageProps<"/[lang]/portfolio/[slug]">) {
    const { lang, slug } = await params;
    const t = await getTranslations("Difficulty");
    const hexLabels = Object.fromEntries(
        AXES.map((axis) => [axis, t(`axes.${axis}`)]),
    ) as AxisLabels;

    if (!isLocale(lang)) return notFound();
    const project = getProject(lang, slug);
    if (!project) {
        const targetSlug = findSlugInLocale(slug, lang);
        if (!targetSlug) return notFound();
        return redirect({
            href: {
                pathname: "/portfolio/[slug]",
                params: { slug: targetSlug },
            },
            locale: lang,
        });
    }

    const crumbs = await getCrumbs("portfolio", {
        label: project.title,
        href: {
            pathname: "/portfolio/[slug]",
            params: { slug: project.slug },
        },
    });

    const profile = getProfile(project.translationKey);

    return (
        <PageFrame title={project.title} dek={project.dek} breadcrumb={crumbs}>
            <ProjectIdentity project={project} />
            {profile && (
                <section
                    aria-labelledby="difficulty-profile"
                    className="bg-surface shadow-card rounded-card border border-(--line) p-6"
                >
                    <h2
                        id="difficulty-profile"
                        className="mb-4 text-lg leading-title font-semibold tracking-title"
                    >
                        {t("title")}
                    </h2>
                    <div className="grid grid-cols-1 items-start gap-10 notation:grid-cols-[minmax(0,1fr)_var(--spacing-hex-page)]">
                        <DifficultyTable
                            profile={profile}
                            evidence={project.evidence}
                        />
                        <RevealOnView>
                            <DifficultyHex
                                profile={profile}
                                labels={hexLabels}
                                animated
                                className="h-auto w-full"
                            />
                            <DifficultyLegendTrigger
                                label={t("legend.trigger")}
                            />
                            <DifficultyLegend />
                        </RevealOnView>
                    </div>
                </section>
            )}

            <Prose>
                <Mdx code={project.description} />
            </Prose>
            <ProjectNext
                locale={lang}
                slug={project.slug}
                title={project.title}
            />
        </PageFrame>
    );
}
