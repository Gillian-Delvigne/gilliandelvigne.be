"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import type { Station } from "@/types/navigation";
import { isCurrentPage } from "@/lib/isCurrentPage";
import { Compass } from "../icons/Compass";

interface CompassTabProps {
    stations: Station[];
    dialogRef: RefObject<HTMLDialogElement | null>;
}

export function CompassTab({ stations, dialogRef }: CompassTabProps) {
    const pathname = usePathname();
    const t = useTranslations("Route");
    const current = stations.find((station) =>
        isCurrentPage(pathname, station.href),
    );
    if (!current) return;

    return (
        <button
            onClick={() => dialogRef.current?.showModal()}
            aria-haspopup="dialog"
            aria-label={t("nav-btn")}
            className="fixed top-(--compass-tab-offset) inset-x-4 z-40 md:hidden animus-panel flex items-center justify-center gap-2 font-display text-xs p-1.75 h-12 cursor-pointer"
        >
            <span
                aria-hidden="true"
                className="border-gilt/90 absolute -top-1.5 -left-1.5 size-3.5 border-t border-l"
            />
            <span
                aria-hidden="true"
                className="border-gilt/90 absolute -right-1.5 -bottom-1.5 size-3.5 border-r border-b"
            />

            <span
                aria-hidden="true"
                className="font-mono text-3xs tracking-label text-ink-muted absolute top-1.5 left-5 uppercase"
            >
                {t("readout")} ·{" "}
                <span className="text-accent">{current.eyebrow.numeral}</span>
                /V
            </span>

            <span
                aria-hidden="true"
                className="font-mono text-accent text-2xs tracking-label"
            >
                {current.eyebrow.numeral}
            </span>
            <span>{current.eyebrow.label}</span>
            <span className="absolute right-5 text-accent-deep">
                <Compass />
            </span>
        </button>
    );
}
