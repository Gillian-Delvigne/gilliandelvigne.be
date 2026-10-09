import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
    children: ReactNode;
    tone?: "muted" | "verdigris";
    className?: string;
}

export function Tag({ children, tone = "muted", className }: TagProps) {
    return (
        <span
            className={cn(
                "tag",
                tone === "verdigris" && "tag-verdigris",
                className,
            )}
        >
            {children}
        </span>
    );
}
