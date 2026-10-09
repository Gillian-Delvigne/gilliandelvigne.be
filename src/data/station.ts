import { getTranslations } from "next-intl/server";
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
        dek: t(`${key}.dek`),
    };
}

export async function getAllStations(): Promise<Station[]> {
    const stations: Station[] = await Promise.all(
        NAV.map(
            async (navItem): Promise<Station> => await getStation(navItem.key),
        ),
    );
    return stations;
}
