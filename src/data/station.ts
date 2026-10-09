import { getLocale, getTranslations } from "next-intl/server";
import { getProjects, isLocale } from "@/content";
import { NAV } from "./site";
import type { NavKeys, Station } from "@/types/navigation";

export async function getStation(key: NavKeys) {
    const stationInfo = NAV.find((station) => station.key === key);
    if (!stationInfo) throw new Error(`Unknown station : ${key}`);

    const t = await getTranslations("Nav");
    return {
        href: stationInfo.href,
        eyebrow: {
            numeral: stationInfo.numeral,
            label: t(`${key}.label`),
        },
        /* The portfolio dek states how many projects there are: counted from
           the content, so adding or removing a project never leaves it stale. */
        dek:
            key === "portfolio"
                ? t("portfolio.dek", { count: await countProjects() })
                : t(`${key}.dek`),
    };
}

async function countProjects(): Promise<number> {
    const locale = await getLocale();
    if (!isLocale(locale)) throw new Error(`Unknown locale : ${locale}`);
    return getProjects(locale).length;
}

export async function getAllStations(): Promise<Station[]> {
    const stations: Station[] = await Promise.all(
        NAV.map(
            async (navItem): Promise<Station> => await getStation(navItem.key),
        ),
    );
    return stations;
}
