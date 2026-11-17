import type { ReactNode } from "react";
import type { Project } from "@/content";
import { getProfile } from "@/content/difficulty";
import ProjectIdentity from "@/components/ui/ProjectIdentity";
import StatusBadge from "./StatusBadge";
import ProjectStack from "./ProjectStack";
import DifficultyProfile from "./DifficultyProfile";
import DifficultyLegend from "./DifficultyLegend";
import { ProjectMedia } from "./ProjectMedia";
import { DiagramArt, isDiagramName } from "./Diagram";

const DIAGRAM_ART = {
    scene: {
        suffix: "gallery",
        className:
            "absolute inset-0 p-2 md:p-5 [&>svg]:mx-auto [&>svg]:size-full",
        zoomed: false,
    },
    fullscreen: {
        suffix: "fullscreen",
        className: "mx-auto box-content p-5 [&>svg]:max-w-none!",
        zoomed: true,
    },
} as const;

const renderDiagrams = (
    media: Project["media"],
    mode: keyof typeof DIAGRAM_ART,
): ReactNode[] =>
    (media?.gallery ?? []).map((item) =>
        item.kind === "diagram" && isDiagramName(item.src) ? (
            <DiagramArt
                key={item.src}
                name={item.src}
                descId={`${item.src}-${DIAGRAM_ART[mode].suffix}`}
                className={DIAGRAM_ART[mode].className}
                zoomed={DIAGRAM_ART[mode].zoomed}
            />
        ) : null,
    );

export const ProjectRail = async ({ project }: { project: Project }) => {
    const profile = getProfile(project.translationKey);

    return (
        <aside className="lg:col-start-9 lg:col-span-4 lg:row-span-2 flex flex-col gap-4">
            <StatusBadge status={project.status} />
            <ProjectIdentity project={project} />
            <ProjectMedia
                project={project}
                diagrams={renderDiagrams(project.media, "scene")}
                fullscreenDiagrams={renderDiagrams(project.media, "fullscreen")}
            />
            <ProjectStack stack={project.stack} />
            <DifficultyProfile profile={profile} evidence={project.evidence} />
            <DifficultyLegend />
        </aside>
    );
};
