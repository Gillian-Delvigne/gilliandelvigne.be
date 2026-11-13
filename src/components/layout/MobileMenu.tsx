"use client";

import { ReactNode, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { IconClose, IconMenu } from "@/components/icons/icons";

interface MobileMenuProps {
    children: ReactNode;
    footer: ReactNode;
    className: string;
}

const TARGET =
    "-m-3 flex size-11 cursor-pointer items-center justify-center rounded-md text-ink";

const LABEL =
    "font-mono text-2xs font-medium tracking-label text-dim uppercase";

export default function MobileMenu({
    children,
    className,
    footer,
}: MobileMenuProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const labelId = useId();
    const t = useTranslations("Menu");
    const close = () => dialogRef.current?.close();

    return (
        <>
            <button
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                aria-haspopup="dialog"
                aria-label={t("open")}
                className={cn(TARGET, className)}
            >
                <IconMenu className="size-icon-md" />
            </button>
            <dialog
                ref={dialogRef}
                aria-labelledby={labelId}
                onClick={(e) => {
                    if (
                        e.target === e.currentTarget ||
                        (e.target as Element).closest("a")
                    )
                        close();
                }}
                className="m-0 max-h-none w-full max-w-none bg-transparent text-ink
                           -translate-y-2 opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-(--dur-micro) ease-out
                           open:translate-y-0 open:opacity-100
                           starting:open:-translate-y-2 starting:open:opacity-0
                           backdrop:bg-(--veil) backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-(--dur-micro)
                           open:backdrop:opacity-100 starting:open:backdrop:opacity-0"
            >
                <div className="rounded-b-card border-b border-(--line-soft) bg-surface shadow-card">
                    <div className="mx-auto max-w-(--width-content) px-(--gutter) pb-6">
                        <div className="site-bar py-5.5">
                            <div className="site-brand flex h-brand min-h-5 items-center justify-between">
                                <span id={labelId} className={cn(LABEL, "translate-y-px")}>
                                    {t("label")}
                                </span>
                                <button
                                    type="button"
                                    onClick={close}
                                    aria-label={t("close")}
                                    className={TARGET}
                                >
                                    <IconClose className="size-icon-md" />
                                </button>
                            </div>
                        </div>
                        {children}
                        <div className="mt-5 border-t border-(--line-soft) pt-5">
                            {footer}
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
