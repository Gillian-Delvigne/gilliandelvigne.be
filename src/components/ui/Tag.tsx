import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
    children: ReactNode;
    className?: string;
}

export function Tag({ children, className }: TagProps) {
    return (
        <span
            className={cn(
                "rounded-sm border border-(--line-soft) bg-(--sunk) px-2 py-0.5 font-mono text-2xs font-medium text-dim",
                className,
            )}
        >
            {children}
        </span>
    );
}
