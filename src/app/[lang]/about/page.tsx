import { getNavItem } from "@/data/nav";
import PageFrame from "@/components/layout/PageFrame";

export default async function About() {
    const pageInfo = await getNavItem("about");
	
		return (
			<PageFrame eyebrow={{ numeral: pageInfo.numeral, label: pageInfo.label }} dek={pageInfo.dek}>
				<p>Contenu de la Home</p>
			</PageFrame>
		);
}
