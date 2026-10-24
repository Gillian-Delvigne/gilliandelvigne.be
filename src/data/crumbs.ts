import type { NavKeys, Crumb } from "../types/navigation";
import { getNavItem } from "./nav";

export default async function getCrumbs(
    section: NavKeys,
    ...tail: Crumb[]
): Promise<Crumb[]> {
    const home = await getNavItem("home");
    const sec = await getNavItem(section);
    return [
        { label: home.label, href: home.href },
        { label: sec.label, href: sec.href },
        ...tail,
    ];
}
