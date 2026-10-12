import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import {
    LOCALES,
    isLocale,
    getProject,
    findSlugInLocale,
    getAllProjectSlugs,
} from "@/content";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";
import ProjectIdentity from "@/components/ui/ProjectIdentity";
import { getTranslations } from "next-intl/server";
import { AXES, getProfile } from "@/content/difficulty";

export async function generateStaticParams() {
    return LOCALES.flatMap((lang) =>
        getAllProjectSlugs().map((slug) => ({ lang, slug })),
    );
}

export default async function Page({
    params,
}: PageProps<"/[lang]/portfolio/[slug]">) {
    const { lang, slug } = await params;
    const t = await getTranslations("Difficulty.axes");

    if (!isLocale(lang)) return notFound();
    const project = getProject(lang, slug);
    if (!project) {
        const targetSlug = findSlugInLocale(slug, lang);
        if (!targetSlug) return notFound();
        return redirect({
            href: {
                pathname: "/portfolio/[slug]",
                params: { slug: targetSlug },
            },
            locale: lang,
        });
    }

    const crumbs = await getCrumbs("portfolio", {
        label: project.title,
        href: {
            pathname: "/portfolio/[slug]",
            params: { slug: project.slug },
        },
    });

    const profile = getProfile(project.translationKey);

    return (
        <PageFrame title={project.title} breadcrumb={crumbs}>
            <ProjectIdentity project={project} />
            {profile && (
                <dl>
                    {AXES.map((axis) => (
                        <div key={axis}>
                            <dt>{t(axis)}</dt>
                            <dd>{profile[axis]}</dd>
                        </div>
                    ))}
                </dl>
            )}
            <Prose>
                <Mdx code={project.description} />
            </Prose>
        </PageFrame>
    );
}
