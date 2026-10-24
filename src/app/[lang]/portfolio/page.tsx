import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjects, isLocale } from "@/content";
import { getStation } from "@/data/nav";
import PageFrame from "@/components/layout/PageFrame";
import ProjectCard from "@/components/ui/ProjectCard";
import DifficultyLegend from "@/components/ui/DifficultyLegend";
import DifficultyLegendTrigger from "@/components/ui/DifficultyLegendTrigger";

export default async function Portfolio({
    params,
}: PageProps<"/[lang]/portfolio">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getStation("portfolio");
    const projects = getProjects(lang);
    const t = await getTranslations("Empty");
    const tDifficulty = await getTranslations("Difficulty");

    return (
        <PageFrame eyebrow={pageInfo.eyebrow} dek={pageInfo.dek}>
            <DifficultyLegendTrigger label={tDifficulty("legend.trigger")} />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-6 py-8">
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
