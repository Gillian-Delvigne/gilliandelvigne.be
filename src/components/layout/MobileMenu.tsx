"use client";

import { ReactNode, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
    children: ReactNode;
    className: string;
}

export default function MobileMenu({ children, className }: MobileMenuProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const t = useTranslations("Route");
    const close = () => dialogRef.current?.close();
    return (
        <>
            <button
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                aria-haspopup="dialog"
                aria-label={t("nav-btn")}
                className={cn(
                    "font-display text-xs p-1.75 cursor-pointer",
                    className,
                )}
            >
                open
            </button>
            <dialog
                className="w-full h-fit"
                ref={dialogRef}
                onClick={(e) => {
                    if (e.target === dialogRef.current) close();
                }}
            >
                <button type="button" onClick={() => close()}>
                    close
                </button>
                {children}
            </dialog>
        </>
    );
}
