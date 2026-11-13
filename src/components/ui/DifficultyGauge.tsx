import { useTranslations } from "next-intl";
import { LEVELS, MAX_LEVEL } from "@/content/difficulty";
import { cn } from "@/lib/cn";
import type { Level } from "@/types/difficulty";

const DifficultyGauge = ({
    level,
    highlighted,
}: {
    level: Level;
    highlighted: boolean;
}) => {
    const t = useTranslations("Difficulty");

    return (
        <span className="flex flex-none flex-col items-end">
            <span
                className={cn(
                    "mb-1.5 text-xs",
                    level === 0 && "font-normal text-dim",
                    level > 0 && highlighted && "text-warm",
                    level > 0 && !highlighted && "text-brand",
                )}
            >
                {t(`levels.${level}.name`)}
            </span>
            <span className="sr-only">{`, ${level} ${t("outOf")} ${MAX_LEVEL}`}</span>
            <span className="flex gap-0.5">
                {LEVELS.slice(1).map((step) => (
                    <span
                        key={step}
                        aria-hidden="true"
                        className={cn(
                            "h-0.75 w-3 rounded-xs",
                            level < step && "bg-(--gauge-off)",
                            level >= step && highlighted && "bg-warm",
                            level >= step &&
                                !highlighted &&
                                "bg-(--brand-solid)",
                        )}
                    />
                ))}
            </span>
        </span>
    );
};

export default DifficultyGauge;
