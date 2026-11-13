"use client";

import type { Project } from "@/content/projects";
import Button from "./Button";
import { useTranslations } from "next-intl";

export const ProjectMedia = ({ media }: { media: Project["media"] }) => {
    const t = useTranslations("Projects.identity");
    if (!media) return;
    return (
        <div className="flex gap-2">
            {media.demo && <Button>{t("demo")}</Button>}
            {media.gallery && <Button>{t("gallery")}</Button>}
        </div>
    );
};
