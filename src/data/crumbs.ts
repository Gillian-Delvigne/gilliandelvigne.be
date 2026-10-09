import type { NavKeys, Crumb } from "../types/navigation";
import { getStation } from "./station";

export default async function getCrumbs(
    section: NavKeys,
    ...tail: Crumb[]
): Promise<Crumb[]> {
    const home = await getStation("home");
    const sec = await getStation(section);
    return [
        { label: home.eyebrow.name, href: home.href },
        { label: sec.eyebrow.name, href: sec.href },
        ...tail,
    ];
}
