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
import DifficultyHex from "@/components/ui/DifficultyHex";
import DifficultyTable from "@/components/ui/DifficultyTable";
import DifficultyLegendTrigger from "@/components/ui/DifficultyLegendTrigger";
import DifficultyLegend from "@/components/ui/DifficultyLegend";

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
                <section aria-labelledby="difficulty-profile">
                    <h2
                        id="difficulty-profile"
                        className="mb-2.5 text-[1.22rem] leading-tight font-semibold tracking-[-0.022em]"
                    >
                        {t("title")}
                    </h2>
                    <p className="mb-4 max-w-[66ch] text-dim">{t("intro")}</p>
                    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 min-[860px]:grid-cols-[minmax(0,1fr)_300px]">
                        <DifficultyTable
                            profile={profile}
                            evidence={project.evidence}
                        />
                        <div className="flex flex-col">
                            <DifficultyHex
                                profile={profile}
                                labels={hexLabels}
                                className="h-auto w-full"
                            />
                            <DifficultyLegendTrigger
                                label={t("legend.trigger")}
                            />
                            <DifficultyLegend />
                        </div>
                    </div>
                </section>
            )}

            <Prose>
                <Mdx code={project.description} />
            </Prose>
        </PageFrame>
    );
}
