import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import {
    LOCALES,
    isLocale,
    getProject,
    getProjects,
    findSlugInLocale,
} from "@/content";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";
import ProjectIdentity from "@/components/ui/ProjectIdentity";

export async function generateStaticParams() {
    return LOCALES.flatMap((lang) =>
        getProjects(lang).map((p) => ({ lang, slug: p.slug })),
    );
}

export default async function Page({
    params,
}: PageProps<"/[lang]/portfolio/[slug]">) {
    const { lang, slug } = await params;

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
    return (
        <PageFrame title={project.title} breadcrumb={crumbs}>
			<ProjectIdentity project={project}/>
            <Prose>
                <Mdx code={project.description} />
            </Prose>
        </PageFrame>
    );
}
