"use client";

import { RefObject, ReactNode, useId, KeyboardEvent } from "react";
import { IconClose } from "../icons/icons";
import { cn } from "@/lib/cn";

type Variant = keyof typeof DIALOG;

interface DialogProps {
    variant: Variant;
    ref: RefObject<HTMLDialogElement | null>;
    dialogLabel: ReactNode;
    closeLabel: string;
    closeIcon?: ReactNode;
    children: ReactNode;
    onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
}

export const TARGET =
    "-m-3 flex size-11 cursor-pointer items-center justify-center rounded-md text-ink";

const LABEL =
    "font-mono text-2xs font-medium tracking-label text-dim uppercase";

const FADE =
    "opacity-0 transition-[opacity,translate,scale,display,overlay] transition-discrete duration-(--dur-micro) ease-out open:opacity-100 starting:open:opacity-0";

const REVEAL =
    "transition-[clip-path,display,overlay] transition-discrete duration-(--dur-micro) ease-out [clip-path:inset(0_0_100%_0)] open:[clip-path:inset(0)] starting:open:[clip-path:inset(0_0_100%_0)]";

const BASE =
    "bg-transparent text-ink backdrop:bg-(--veil) backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-(--dur-micro) open:backdrop:opacity-100 starting:open:backdrop:opacity-0";

const FRAME = "bg-surface";

const HEAD = "flex min-h-5 items-center justify-between";

const DIALOG = {
    sheet: {
        motion: REVEAL,
        root: "m-0 max-h-none w-full max-w-none",
        frame: "rounded-b-card border-b border-(--line-soft) shadow-card",
        inner: "mx-auto max-w-(--width-content) px-(--gutter) pb-6",
        bar: "site-bar py-5.5",
        head: "site-brand h-brand",
    },
    panel: {
        motion: FADE,
        root: "m-auto w-[calc(100vw-2*var(--gutter))] max-w-(--width-dialog) scale-98 open:scale-100 starting:open:scale-98",
        frame: "rounded-card border border-(--line) shadow-(--lit)",
        inner: "px-2 md:px-5.5 pt-4.5 pb-5",
        bar: "",
        head: "mb-4",
    },
	full: {
    motion: FADE,
    root: "relative m-auto w-[calc(100vw-2*var(--gutter))] h-(--height-dialog-full) scale-98 open:scale-100 starting:open:scale-98",
    frame: "h-full rounded-card border border-(--line) shadow-(--lit)",
    inner: "h-full flex flex-col px-5.5 pt-4.5 pb-5",
    bar: "",
    head: "mb-4",
},
} as const;

export const Dialog = ({
    variant,
    ref,
    dialogLabel,
    closeLabel,
    closeIcon = <IconClose className="size-icon-md" />,
    children,
    onKeyDown,
}: DialogProps) => {
    const labelId = useId();
    const styles = DIALOG[variant];
    const close = () => ref.current?.close();
    return (
        <dialog
            ref={ref}
            aria-labelledby={labelId}
            onClick={(e) => {
                if (
                    e.target === e.currentTarget ||
                    (e.target as Element).closest("a")
                )
                    close();
            }}
            className={cn(BASE, styles.motion, styles.root)}
            onKeyDown={onKeyDown}
        >
            <div className={cn(FRAME, styles.frame)}>
                <div className={styles.inner}>
                    <div className={styles.bar}>
                        <div className={cn(HEAD, styles.head)}>
                            <span
                                id={labelId}
                                className={cn(LABEL, "translate-y-px")}
                            >
                                {dialogLabel}
                            </span>
                            <button
                                type="button"
                                onClick={close}
                                aria-label={closeLabel}
                                className={TARGET}
                            >
                                {closeIcon}
                            </button>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </dialog>
    );
};
