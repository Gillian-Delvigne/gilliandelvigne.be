import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const Icon = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={cn("icon", className)}
    >
        {children}
    </svg>
);

export const Node = ({ cx, cy }: { cx: number; cy: number }) => (
    <circle className="icon-node" cx={cx} cy={cy} r={3} />
);
