import type { Project } from "@/content";
import { getProfile } from "@/content/difficulty";
import { getTranslations } from "next-intl/server";
import ProjectIdentity from "@/components/ui/ProjectIdentity";
import DifficultyTable from "./DifficultyTable";
import DifficultyFigure from "./DifficultyFigure";
import DifficultyLegend from "./DifficultyLegend";
import StatusBadge from "./StatusBadge";
import ProjectStack from "./ProjectStack";

const ProjectRail = async ({ project }: { project: Project }) => {
    const profile = getProfile(project.translationKey);
    const t = await getTranslations("Difficulty");

    return (
        <aside className="lg:col-start-9 lg:col-span-4 lg:row-span-2">
            <div className="lg:tall:sticky lg:top-24 flex flex-col gap-4">
                <StatusBadge status={project.status} />
                <ProjectIdentity project={project} />
                <ProjectStack stack={project.stack} />
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
                            <div>
                                <DifficultyFigure profile={profile} />
                                <DifficultyLegend />
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </aside>
    );
};

export default ProjectRail;
