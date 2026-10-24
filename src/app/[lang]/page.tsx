import PageFrame from "@/components/layout/PageFrame";
import { getNavItem } from "@/data/nav";

export default async function Home() {
    const pageInfo = await getNavItem("home");
  

    return (
        <PageFrame eyebrow={{ numeral: pageInfo.numeral, label: pageInfo.label }} dek={pageInfo.dek}>
            <p>Contenu de la Home</p>
        </PageFrame>
    );
}
