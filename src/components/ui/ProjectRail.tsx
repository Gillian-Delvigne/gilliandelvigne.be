import type { Project } from "@/content";
import { getProfile } from "@/content/difficulty";
import ProjectIdentity from "@/components/ui/ProjectIdentity";
import StatusBadge from "./StatusBadge";
import ProjectStack from "./ProjectStack";
import DifficultyProfile from "./DifficultyProfile";
import DifficultyLegend from "./DifficultyLegend";
import { ProjectMedia } from "./ProjectMedia";

export const ProjectRail = async ({ project }: { project: Project }) => {
    const profile = getProfile(project.translationKey);

    return (
        <aside className="lg:col-start-9 lg:col-span-4 lg:row-span-2">
            <div className="lg:tall:sticky lg:top-24 flex flex-col gap-4">
                <StatusBadge status={project.status} />
                <ProjectIdentity project={project} />
                <ProjectMedia media={project.media} />
                <ProjectStack stack={project.stack} />
                <DifficultyProfile
                    profile={profile}
                    evidence={project.evidence}
                />
                <DifficultyLegend />
            </div>
        </aside>
    );
};

