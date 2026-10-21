import { useTranslations } from "next-intl";
import type { Station } from "@/types/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { SITE } from "@/data/site";
import { Link } from "@/i18n/navigation";
import NavLink from "./NavLink";

interface SiteNavProps {
    stations: Station[];
}

export default function SiteNav({ stations }: SiteNavProps) {
    const t = useTranslations("Route");

    return (
        <header className="flex w-full gap-2 p-6">
            <Link href="/">{SITE.name}</Link>
            <nav className="grow" aria-label={t("aria")}>
                {stations.length > 0 && (
                    <ol className="flex justify-center gap-2">
                        {stations.map((station) => (
                            <li key={station.href}>
                                <NavLink href={station.href}>
                                    {station.eyebrow.label}
                                </NavLink>
                            </li>
                        ))}
                    </ol>
                )}
            </nav>
            <LocaleSwitch cn="font-mono bg-parchment-raised border-rule text-3xs tracking-label rounded-card flex border px-2 py-1.5 uppercase" />
        </header>
    );
}
