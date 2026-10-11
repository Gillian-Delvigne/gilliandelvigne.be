"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/content";
import { getRoutingPathname } from "@/lib/pathname";

const labels: Record<Locale, string> = {
    fr: "Français",
    en: "English",
};

const SEP =
    "[&:not(:last-child)]:after:text-ink-muted " +
    "[&:not(:last-child)]:after:px-2 " +
    "[&:not(:last-child)]:after:content-['·']";

export function LocaleSwitch({ cn }: { cn: string }) {
    const params = useParams();
    const current = useLocale();

    // During the static build `usePathname` returns the filled internal path
    // ("/portfolio/elausys"), not the template: find the template it matches.
    const path = getRoutingPathname(usePathname()) ?? "/";

    return (
        <ul className={cn}>
            {LOCALES.map((locale) => {
                const isCurrent = locale === current;
                return (
                    <li
                        key={locale}
                        className={`${SEP} ${isCurrent ? "text-accent" : "text-ink-muted"}`}
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
                                className="hover:text-accent focus-visible:text-accent
                                           decoration-ink-muted
                                           transition-colors duration-(--dur-micro) group"
                            >
                                <span className="relative pb-0.5">
                                    <span>
                                        {labels[locale]}
                                        <span
                                            aria-hidden="true"
                                            className="bg-gilt absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 transition-transform duration-(--dur-micro) ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                                        />
                                    </span>
                                </span>
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
