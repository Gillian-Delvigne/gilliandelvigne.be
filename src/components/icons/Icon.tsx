import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const Icon = ({
    className,
    viewBox = "0 0 32 32",
    children,
}: {
    className?: string;
    viewBox?: string;
    children: ReactNode;
}) => (
    <svg
        viewBox={viewBox}
        aria-hidden="true"
        focusable="false"
        className={cn("icon", className)}
    >
        {children}
    </svg>
);
