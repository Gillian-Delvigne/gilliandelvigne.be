import { getNavItem } from "@/data/nav";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";

export default async function About() {
    const pageInfo = await getNavItem("about");

    return (
        <PageFrame
            title={pageInfo.label}
            dek={pageInfo.dek}
            breadcrumb={await getCrumbs("about")}
        >
            <p>Contenu de la Home</p>
        </PageFrame>
    );
}
