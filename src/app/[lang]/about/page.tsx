import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { getNavItem } from "@/data/nav";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import { Timeline } from "@/components/ui/Timeline";

export default async function About({ params }: PageProps<"/[lang]/about">) {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();

    const pageInfo = await getNavItem("about");

    return (
        <PageFrame
            title={pageInfo.label}
            dek={pageInfo.dek}
            breadcrumb={await getCrumbs("about")}
        >
            <Timeline lang={lang} />
        </PageFrame>
    );
}
