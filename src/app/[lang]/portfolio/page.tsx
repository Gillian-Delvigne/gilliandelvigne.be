import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjects, isLocale } from "@/content";
import { getStation } from "@/data/station";
import PageFrame from "@/components/layout/PageFrame";
import ProjectCard from "@/components/ui/ProjectCard";

export default async function Portfolio({
    params,
}: PageProps<"/[lang]/portfolio">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getStation("portfolio");
    const projects = getProjects(lang);
    const t = await getTranslations("Empty");

    return (
        <PageFrame eyebrow={pageInfo.eyebrow} dek={pageInfo.dek}>
            <div className="flex flex-col flex-wrap gap-6 py-8">
                {projects.length
                    ? projects.map((project) => (
                          <ProjectCard key={project.title} project={project} />
                      ))
                    : t("projects")}
            </div>
        </PageFrame>
    );
}
