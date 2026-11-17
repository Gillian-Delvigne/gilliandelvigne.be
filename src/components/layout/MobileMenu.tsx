"use client";

import { ReactNode, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { Dialog, TARGET } from "../ui/Dialog";
import { IconMenu } from "@/components/icons/icons";

interface MobileMenuProps {
    children: ReactNode;
    footer: ReactNode;
    className: string;
}

export default function MobileMenu({
    children,
    className,
    footer,
}: MobileMenuProps) {
    const menuRef = useRef<HTMLDialogElement>(null);
    const t = useTranslations("Menu");

    return (
        <>
            <button
                type="button"
                onClick={() => menuRef.current?.showModal()}
                aria-haspopup="dialog"
                aria-label={t("open")}
                className={cn(TARGET, className)}
            >
                <IconMenu className="size-icon-md" />
            </button>
            <Dialog
                variant={"sheet"}
                ref={menuRef}
                dialogLabel={t("label")}
                closeLabel={t("close")}
                closeIcon={<IconMenu className="size-icon-md" />}
            >
                {children}
                <div className="mt-5 border-t border-(--line-soft) pt-5">
                    {footer}
                </div>
            </Dialog>
        </>
    );
}
