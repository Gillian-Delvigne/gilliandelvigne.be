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
                    console.log(e.target);
                    if (
                        e.target === e.currentTarget ||
                        (e.target as Element).closest("a")
                    )
                        close();
                }}
            >
                <div>
                    <div className="flex justify-between">
                        <span>Menu</span>
                        <button type="button" onClick={() => close()}>
                            close
                        </button>
                    </div>

                    {children}
                </div>
            </dialog>
        </>
    );
}
