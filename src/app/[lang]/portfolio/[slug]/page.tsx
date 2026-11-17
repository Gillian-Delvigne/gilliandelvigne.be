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
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import PageHeading from "@/components/layout/PageHeading";
import Mdx from "@/components/ui/Mdx";
import Prose from "@/components/ui/Prose";
import ProjectNext from "@/components/layout/ProjectNext";
import { ProjectRail } from "@/components/ui/ProjectRail";

export async function generateStaticParams() {
    return LOCALES.flatMap((lang) =>
        getAllProjectSlugs().map((slug) => ({ lang, slug })),
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
        <div className="shell pt-10 pb-24 md:pb-32">
            <Breadcrumb crumbs={crumbs} />

            <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-7 lg:row-start-1">
                    <PageHeading title={project.title} dek={project.dek} />
                </div>
                <ProjectRail project={project} />

                <div className="lg:col-span-7 lg:row-start-2">
                    <Prose>
                        <Mdx code={project.description} />
                    </Prose>
                </div>
                <div className="lg:col-span-12 py-16">
                    <ProjectNext
                        locale={lang}
                        slug={project.slug}
                        title={project.title}
                    />
                </div>
            </div>
        </div>
    );
}
