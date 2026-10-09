"use client";

import { useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Station } from "@/types/navigation";
import { isCurrentPage } from "@/lib/isCurrentPage";
import { useIsSticky } from "@/lib/useIsSticky";
import { buildTrail, TRAIL_WIDTH, TRAIL_BREADTH } from "@/lib/compass.geometry";
import { LocaleSwitch } from "./LocaleSwitch";

interface CompassNavProps {
    stations: Station[];
}

export default function CompassNav({ stations }: CompassNavProps) {
    const pathname = usePathname();
    const t = useTranslations("Compass");
    const count = stations.length;
    const currentIndex = stations.findIndex((station) =>
        isCurrentPage(pathname, station.href),
    );
    const hasCurrent = currentIndex >= 0;
    const reveal = hasCurrent ? currentIndex / (count - 1) : 0;
    const pinLeft = hasCurrent ? (currentIndex + 0.5) / count : 0;
    const trailD = buildTrail(count, "x");

    const { sentinel, isSticky } = useIsSticky(32);

    useEffect(() => {
        document.documentElement.classList.toggle("lecture-mode", isSticky);
        return () => document.documentElement.classList.remove("lecture-mode");
    }, [isSticky]);

    return (
        <>
            <div ref={sentinel} aria-hidden="true" className="h-px mt-8" />
            <nav
                aria-label={t("aria")}
                className={`hidden md:block animus-panel font-display mx-auto w-2/3 px-6.5 pt-5 pb-4 text-xs z-10 sticky top-8 ${isSticky ? "is-sticky" : ""}`}
            >
                <span
                    aria-hidden="true"
                    className="border-gilt/90 absolute -top-1.5 -left-1.5 size-3.5 border-t border-l"
                />
                <span
                    aria-hidden="true"
                    className="border-gilt/90 absolute -right-1.5 -bottom-1.5 size-3.5 border-r border-b"
                />

                <LocaleSwitch cn="font-mono bg-parchment-raised border-rule text-3xs tracking-label rounded-card
                       absolute -top-3 left-4.5 flex border px-2 py-1.5 uppercase"/>

                <span
                    aria-hidden="true"
                    className="font-mono text-3xs tracking-label text-ink-muted absolute top-1.5 right-6 uppercase"
                >
                    {t("readout")} ·{" "}
                    <span className="text-accent">
                        {hasCurrent
                            ? stations[currentIndex].eyebrow.numeral
                            : "—"}
                    </span>
                    /{stations[count - 1].eyebrow.numeral}
                </span>

                <div className="relative mb-1.5 h-8">
                    <svg
                        aria-hidden="true"
                        viewBox={`0 0 ${TRAIL_WIDTH} ${TRAIL_BREADTH}`}
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-0 size-full"
                        fill="none"
                    >
                        <path
                            d={trailD}
                            stroke="var(--color-rule)"
                            strokeWidth="2.5"
                        />
                        <path
                            d={trailD}
                            pathLength={1}
                            stroke="var(--color-accent)"
                            strokeWidth="2.5"
                            strokeDasharray={1}
                            strokeDashoffset={1 - reveal}
                            className="transition-[stroke-dashoffset] duration-(--dur-route) ease-map"
                        />
                    </svg>

                    {hasCurrent && (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 30"
                            className="text-accent absolute top-1/2 h-5 w-4 -translate-x-1/2 -translate-y-full transition-[left] duration-(--dur-route) ease-map animate-floating"
                            style={{ left: `${pinLeft * 100}%` }}
                        >
                            <path
                                d="M12 1C6 1 3 6 3 11C3 18 12 29 12 29S21 18 21 11C21 6 18 1 12 1Z"
                                fill="currentColor"
                            />
                            <circle
                                cx="12"
                                cy="11"
                                r="3.4"
                                fill="var(--color-parchment)"
                            />
                        </svg>
                    )}
                </div>

                <ol className="grid grid-cols-5">
                    {stations.map((station) => {
                        const current = isCurrentPage(pathname, station.href);
                        return (
                            <li key={station.href}>
                                <Link
                                    href={station.href}
                                    aria-current={current ? "page" : undefined}
                                    className="group flex flex-col items-center p-2 text-center"
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`font-mono text-3xs tracking-label mb-1 ${
                                            current
                                                ? "text-accent"
                                                : "text-ink-muted"
                                        }`}
                                    >
                                        {station.eyebrow.numeral}
                                    </span>

                                    <span className="relative pb-0.5">
                                        <span
                                            className={`t-station text-xs ${
                                                current
                                                    ? "text-accent"
                                                    : "text-ink"
                                            }`}
                                        >
                                            {station.eyebrow.name}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="bg-gilt absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 transition-transform duration-(--dur-micro) ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                                        />
                                    </span>

                                    <span className="text-ink-muted text-3xs mt-0.5 uppercase">
                                        {station.eyebrow.tag}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
