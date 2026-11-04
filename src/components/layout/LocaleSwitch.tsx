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

const ITEM =
    "flex min-h-7 min-w-9 items-center justify-center rounded-md border border-transparent px-2.5 " +
    "text-dim transition-colors duration-(--dur-micro) " +
    "aria-[current=true]:border-(--brand-border) aria-[current=true]:bg-(--brand-surface) aria-[current=true]:text-brand";

export const LocaleSwitch = ({ className }: { className?: string }) => {
    const params = useParams();
    const current = useLocale();

    // During the static build `usePathname` returns the filled internal path
    // ("/portfolio/elausys"), not the template: find the template it matches.
    const path = getRoutingPathname(usePathname()) ?? "/";

    return (
        <ul
            className={cn(
                "flex w-fit gap-0.5 rounded-card border border-(--line) bg-(--sunk) p-0.75 font-mono text-2xs leading-none font-medium tracking-label uppercase",
                className,
            )}
        >
            {LOCALES.map((locale) => {
                const label = (
                    <>
                        <span aria-hidden="true">{locale}</span>
                        <span className="sr-only">{labels[locale]}</span>
                    </>
                );
                return (
                    <li key={locale}>
                        {locale === current ? (
                            <span aria-current="true" className={ITEM}>
                                {label}
                            </span>
                        ) : (
                            <Link
                                // @ts-expect-error: nothing in the types ties `params` to the template
                                href={{ pathname: path, params }}
                                locale={locale}
                                lang={locale}
                                hrefLang={locale}
                                className={cn(
                                    ITEM,
                                    "hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                                )}
                            >
                                {label}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
