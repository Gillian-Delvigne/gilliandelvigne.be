import type { NavKeys, Crumb } from "../types/navigation";
import { getStation } from "./station";

export default async function getCrumbs(
    section: NavKeys,
    ...tail: Crumb[]
): Promise<Crumb[]> {
    const home = await getStation("home");
    const sec = await getStation(section);
    return [
        { label: home.eyebrow.label, href: home.href },
        { label: sec.eyebrow.label, href: sec.href },
        ...tail,
    ];
}
