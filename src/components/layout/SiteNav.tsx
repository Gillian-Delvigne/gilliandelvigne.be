import { useTranslations } from "next-intl";
import type { Station } from "@/types/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { SITE } from "@/data/site";
import { Link } from "@/i18n/navigation";
import NavLink from "./NavLink";
import BrandMark from "./BrandMark";

interface SiteNavProps {
    stations: Station[];
}

export default function SiteNav({ stations }: SiteNavProps) {
    const t = useTranslations("Route");

    return (
        <header className="sticky top-0 z-20 border-b border-(--line-soft) bg-bg [--brand-dot:var(--brand-solid)]">
            <div className="site-bar mx-auto grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-(--width-content) gap-5 px-(--gutter) py-5.5">
                <Link
                    href="/"
                    aria-label={SITE.name}
                    className="rounded-xs text-ink justify-self-start"
                >
                    <BrandMark className="h-brand w-auto site-brand" />
                </Link>
                <nav aria-label={t("aria")} className="hidden lg:block">
                    {stations.length > 0 && (
                        <ol className="flex items-center gap-1">
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
                <LocaleSwitch cn="hidden lg:flex rounded-badge border border-(--line) px-2 py-0.75 font-mono text-2xs leading-4 font-medium tracking-label uppercase justify-self-end" />
            </div>
        </header>
    );
}
