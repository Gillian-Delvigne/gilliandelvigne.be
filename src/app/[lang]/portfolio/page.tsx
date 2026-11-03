import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjects, isLocale } from "@/content";
import { getNavItem } from "@/data/nav";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import ProjectCard from "@/components/ui/ProjectCard";
import DifficultyLegend from "@/components/ui/DifficultyLegend";
import { getProfile, LEGEND_PROJECT } from "@/content/difficulty";
import DifficultyFigure from "@/components/ui/DifficultyFigure";
import { FIELD_OF } from "@/content/fields";
import ProjectFilter from "@/components/ui/ProjectFilter";
import type { FieldCard } from "@/types/portfolio";

export default async function Portfolio({
    params,
}: PageProps<"/[lang]/portfolio">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getNavItem("portfolio");
    const projects = getProjects(lang);
    const t = await getTranslations("Empty");
    const legendProfile = getProfile(LEGEND_PROJECT);
    const cards = projects.map((project): FieldCard => ({
        key: project.slug,
        field: FIELD_OF[project.category],
        card: <ProjectCard project={project} />,
    }));

    return (
        <PageFrame
            title={pageInfo.label}
            dek={pageInfo.dek}
            breadcrumb={await getCrumbs("portfolio")}
            aside={
                legendProfile && <DifficultyFigure profile={legendProfile} />
            }
        >
            {cards.length > 0 ? (
                <ProjectFilter cards={cards} />
            ) : (
                <p className="text-dim">{t("projects")}</p>
            )}
            <DifficultyLegend />
        </PageFrame>
    );
}
