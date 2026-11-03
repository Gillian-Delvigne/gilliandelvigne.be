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

export default async function Portfolio({
    params,
}: PageProps<"/[lang]/portfolio">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getNavItem("portfolio");
    const projects = getProjects(lang);
    const t = await getTranslations("Empty");
    const legendProfile = getProfile(LEGEND_PROJECT);

    return (
        <PageFrame
            title={pageInfo.label}
            dek={pageInfo.dek}
            breadcrumb={await getCrumbs("portfolio")}
            aside={
                legendProfile && <DifficultyFigure profile={legendProfile} />
            }
        >
            <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--width-card),1fr))] gap-6">
                {projects.length
                    ? projects.map((project) => (
                          <ProjectCard key={project.title} project={project} />
                      ))
                    : t("projects")}
            </div>
            <DifficultyLegend />
        </PageFrame>
    );
}
