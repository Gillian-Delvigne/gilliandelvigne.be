"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/content";

const labels: Record<Locale, string> = {
    fr: "Français",
    en: "English",
};

const SEP =
    "[&:not(:last-child)]:after:text-ink-muted " +
    "[&:not(:last-child)]:after:px-2 " +
    "[&:not(:last-child)]:after:content-['·']";

export function LocaleSwitch({ cn }: { cn: string }) {
    const path = usePathname();
    const params = useParams();
    const current = useLocale();

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
                                // `usePathname` returns the canonical TEMPLATE
                                // ("/portfolio/[slug]"), not the filled path, so
                                // next-intl needs `params` to rebuild it in the
                                // other locale.
                                // @ts-expect-error — TS cannot know which template
                                // is active, so it cannot check that `params`
                                // matches it. At runtime both come from the same
                                // route: they always agree.
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
