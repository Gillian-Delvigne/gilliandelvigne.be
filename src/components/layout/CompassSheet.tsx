"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import type { Station } from "@/types/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { isCurrentPage } from "@/lib/isCurrentPage";
import { PaperLayers } from "./PaperLayers";
import { Close } from "../icons/Close";
import { buildTrail, TRAIL_WIDTH, TRAIL_BREADTH } from "@/lib/compass.geometry";
import { LocaleSwitch } from "./LocaleSwitch";

interface CompassSheetProps {
    stations: Station[];
    dialogRef: RefObject<HTMLDialogElement | null>;
}

export function CompassSheet({ stations, dialogRef }: CompassSheetProps) {
    const pathname = usePathname();
    const t = useTranslations("Compass");
    const count = stations.length;
    const currentIndex = stations.findIndex((station) =>
        isCurrentPage(pathname, station.href),
    );
    const hasCurrent = currentIndex >= 0;

    // ARC fraction — the only one stroke-dashoffset can consume.
    const reveal = hasCurrent ? currentIndex / (count - 1) : 0;
    // LENGTH fraction — the only one `top` can consume.
    // The two only coincide at the middle station.
    const stationFraction = hasCurrent ? (currentIndex + 0.5) / count : 0;

    const trailD = buildTrail(count, "y");
    const close = () => dialogRef.current?.close();

    return (
        <dialog
            ref={dialogRef}
            onClick={(e) => {
                if (e.target === dialogRef.current) close();
            }}
            onCancel={close}
            className="bg-parchment-raised border-t-rule rounded-t-card backdrop:bg-ink/55
                       fixed inset-x-0 top-auto bottom-0 m-0 h-2/3 max-h-none w-full
                       max-w-none border-t shadow-lg backdrop:backdrop-blur-[3px]"
        >
            <PaperLayers />

            <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-end px-4 pt-3">
                    <LocaleSwitch
                        cn="font-mono bg-parchment-raised border-rule text-3xs tracking-label rounded-card
                       absolute top-4.5 left-4.5 flex border px-2 py-1.5 uppercase"
                    />
                    <button
                        type="button"
                        onClick={close}
                        aria-label={t("close")}
                        className="border-rule text-ink-muted hover:text-accent
                                   flex size-9 cursor-pointer items-center justify-center
                                   rounded-full border transition-colors duration-(--dur-micro)"
                    >
                        <Close className="size-4" />
                    </button>
                </div>

                <nav
                    aria-label={t("aria-mobile")}
                    className="mx-auto flex min-h-0 w-fit flex-1 gap-5"
                >
                    <div className="relative w-10 shrink-0">
                        <svg
                            aria-hidden="true"
                            viewBox={`0 0 ${TRAIL_BREADTH} ${TRAIL_WIDTH}`}
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
                            <span
                                aria-hidden="true"
                                className="bg-accent absolute left-1/2 size-2 rotate-45
                                           -translate-x-1/2 -translate-y-1/2
                                           transition-[top] duration-(--dur-route) ease-map"
                                style={{ top: `${stationFraction * 100}%` }}
                            />
                        )}
                    </div>

                    <ol className="grid flex-1 grid-rows-5">
                        {stations.map((station) => {
                            const current = isCurrentPage(
                                pathname,
                                station.href,
                            );
                            return (
                                <li key={station.href} className="flex">
                                    <Link
                                        href={station.href}
                                        aria-current={
                                            current ? "page" : undefined
                                        }
                                        onClick={close}
                                        className="group flex flex-1 flex-col justify-center items-center"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`font-mono text-3xs tracking-label ${
                                                current
                                                    ? "text-accent"
                                                    : "text-ink-muted"
                                            }`}
                                        >
                                            {station.eyebrow.numeral}
                                        </span>

                                        <span className="relative w-fit pb-0.5">
                                            <span
                                                className={`t-station text-sm ${
                                                    current
                                                        ? "text-accent"
                                                        : "text-ink"
                                                }`}
                                            >
                                                {station.eyebrow.name}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="bg-gilt absolute inset-x-0 bottom-1 h-px origin-center scale-x-0 transition-transform duration-(--dur-micro) ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                                            />
                                        </span>

                                        <span className="text-ink-muted text-3xs tracking-label uppercase">
                                            {station.eyebrow.tag}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                <div className="flex justify-center py-4">
                    <button
                        type="button"
                        onClick={close}
                        className="font-mono text-3xs tracking-label text-ink-muted hover:text-accent
                                   cursor-pointer uppercase underline underline-offset-4
                                   transition-colors duration-(--dur-micro)"
                    >
                        {t("fold")}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
