import { getStation } from "@/data/station";
import PageFrame from "@/components/layout/PageFrame";

export default async function About() {
    const pageInfo = await getStation("about");
	
		return (
			<PageFrame eyebrow={pageInfo.eyebrow} dek={pageInfo.dek}>
				<p>Contenu de la Home</p>
			</PageFrame>
		);
}
