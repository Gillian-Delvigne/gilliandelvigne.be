"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagButtonProps {
    children: ReactNode;
    pressed: boolean;
    onClick: () => void;
    className?: string;
}

export function TagButton({
    children,
    pressed,
    onClick,
    className,
}: TagButtonProps) {
    return (
        <button
            type="button"
            aria-pressed={pressed}
            onClick={onClick}
            className={cn("tag", "tag-button", className)}
        >
            {children}
        </button>
    );
}
