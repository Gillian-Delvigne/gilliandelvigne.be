import { DIFFICULTY_LEGEND_ID } from "@/content/difficulty";
import { cn } from "@/lib/cn";

export default function DifficultyLegendTrigger({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <button
            type="button"
            popoverTarget={DIFFICULTY_LEGEND_ID}
            className={cn(
                "cursor-pointer px-0.5 py-1.5 text-center text-[0.7rem] font-medium text-brand underline decoration-(--brand-border) underline-offset-4 transition-colors duration-(--dur-micro) hover:decoration-brand focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
                className,
            )}
        >
            {label}
        </button>
    );
}
