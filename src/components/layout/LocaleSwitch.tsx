"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/content";
import { getRoutingPathname } from "@/lib/pathname";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = {
    fr: "Français",
    en: "English",
};

const SEP =
    "[&:not(:last-child)]:after:text-dim " +
    "[&:not(:last-child)]:after:px-2 " +
    "[&:not(:last-child)]:after:content-['·']";

export function LocaleSwitch({ className }: { className?: string }) {
    const params = useParams();
    const current = useLocale();

    // During the static build `usePathname` returns the filled internal path
    // ("/portfolio/elausys"), not the template: find the template it matches.
    const path = getRoutingPathname(usePathname()) ?? "/";

    return (
        <ul
            className={cn(
                "rounded-badge border border-(--line) px-2 py-0.75 font-mono text-2xs leading-4 font-medium tracking-label uppercase",
                className,
            )}
        >
            {LOCALES.map((locale) => {
                const isCurrent = locale === current;
                return (
                    <li
                        key={locale}
                        className={`${SEP} ${isCurrent ? "text-ink" : "text-dim"}`}
                    >
                        {isCurrent ? (
                            <span aria-current="true">{labels[locale]}</span>
                        ) : (
                            <Link
                                // @ts-expect-error: nothing in the types ties `params` to the template
                                href={{ pathname: path, params }}
                                locale={locale}
                                lang={locale}
                                hrefLang={locale}
                                className="transition-colors duration-(--dur-micro) hover:text-ink"
                            >
                                {labels[locale]}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
