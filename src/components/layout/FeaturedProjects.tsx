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
            <p>{t("kicker", { count: count })}</p>
            <h2>{t("title")}</h2>
            <p>{t("body")}</p>
            <div className="grid grid-cols-3 gap-6 py-8">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        headingLevel={3}
                    />
                ))}
            </div>
            <Button href="/portfolio">{t("all", { count: count })}</Button>
        </div>
    );
};

export default FeaturedProjects;
