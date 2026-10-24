import { getLocale, getTranslations } from "next-intl/server";
import { getProjects, isLocale } from "@/content";
import { NAV } from "./site";
import type { NavKeys, NavItem } from "@/types/navigation";

export async function getNavItem(key: NavKeys): Promise<NavItem> {
    const entry = NAV.find((item) => item.key === key);
    if (!entry) throw new Error(`Unknown nav item : ${key}`);

    const t = await getTranslations("Nav");
    return {
        href: entry.href,
        label: t(`${key}.label`),
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

export async function getNavItems(): Promise<NavItem[]> {
    return Promise.all(NAV.map((entry) => getNavItem(entry.key)));
}
