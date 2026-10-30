import { getTranslations } from "next-intl/server";
import { type Locale, getFeaturedProjects, getProjects } from "@/content";
import ProjectCard from "../ui/ProjectCard";
import Button from "../ui/Button";

const FeaturedProjects = async ({ locale }: { locale: Locale }) => {
    const t = await getTranslations("Home.featured");
    const projects = getFeaturedProjects(locale);
    if (!projects.length) return;
    const count = getProjects(locale).length;
    return (
        <div>
            <p className="mb-2.5 font-mono text-2xs font-semibold tracking-label text-dim uppercase">
                {t("kicker", { count: count })}
            </p>
            <h2 className="mb-2.5 text-xl leading-title font-semibold tracking-title">
                {t("title")}
            </h2>
            <p className="max-w-(--measure-prose) text-dim">{t("body")}</p>
            <div className="mt-5.5 grid grid-cols-[repeat(auto-fill,minmax(var(--width-card),1fr))] gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        headingLevel={3}
                    />
                ))}
            </div>
            <Button variant="secondary" href="/portfolio" className="mt-5.5">
                {t("all", { count: count })}
            </Button>
        </div>
    );
};

export default FeaturedProjects;
