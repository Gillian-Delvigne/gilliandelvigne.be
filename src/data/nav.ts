import { getLocale, getTranslations } from "next-intl/server";
import { getProjects, isLocale } from "@/content";
import { NAV } from "./site";
import type { NavKeys, NavItem } from "@/types/navigation";
import { CAREER_START, DEV_START } from "@/data/career";
import { yearsSince } from "@/lib/yearsSince";

interface Years {
    careerYears: number;
    devYears: number;
}

type MessagesFunction = Awaited<ReturnType<typeof getTranslations>>;

const now = new Date();

export async function getNavItem(key: NavKeys): Promise<NavItem> {
    const entry = NAV.find((item) => item.key === key);
    if (!entry) throw new Error(`Unknown nav item : ${key}`);

    const t = await getTranslations("Nav");
    return {
        href: entry.href,
        label: t(`${key}.label`),
        dek: await getDek(t, key),
    };
}

async function countProjects(): Promise<number> {
    const locale = await getLocale();
    if (!isLocale(locale)) throw new Error(`Unknown locale : ${locale}`);
    return getProjects(locale).length;
}

function countYears(): Years {
    const careerYears = yearsSince(CAREER_START, now);
    const devYears = yearsSince(DEV_START, now);
    return {
        careerYears: careerYears,
        devYears: devYears,
    };
}

async function getDek(t: MessagesFunction, key: NavKeys): Promise<string> {
    switch (key) {
        case "portfolio":
            return t("portfolio.dek", { count: await countProjects() });
        case "home":
            const { careerYears, devYears } = countYears();
            return t("home.dek", {
                careerYears: careerYears,
                devYears: devYears,
            });
        default:
            return t(`${key}.dek`);
    }
}

export async function getNavItems(): Promise<NavItem[]> {
    return Promise.all(NAV.map((entry) => getNavItem(entry.key)));
}
