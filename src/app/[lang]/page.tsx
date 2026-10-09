import PageFrame from "@/components/layout/PageFrame";
import { getStation } from "@/data/station";

export default async function Home() {
    const pageInfo = await getStation("home");
  

    return (
        <PageFrame eyebrow={pageInfo.eyebrow} dek={pageInfo.dek}>
            <p>Contenu de la Home</p>
        </PageFrame>
    );
}
