import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { FIELDS, type Field } from "@/content/fields";
import { STAGES, CAREER_START } from "@/data/timeline";
import { periodOf } from "@/lib/timeline";
import { yearsSince } from "@/lib/yearsSince";
import { LANES, LINE_TITLE_OFFSET, LINE_SUBTITLE_OFFSET } from "./layout";

export const TimelineFieldLabels = ({ today }: { today: Date }) => {
    const { end: pedaEnd } = periodOf("pedagogy", STAGES, today);
    const { start: devStart } = periodOf("development", STAGES, today);
    const subtitleValues: Record<Field, Record<string, number>> = {
        pedagogy: {
            start: CAREER_START.getUTCFullYear(),
            end: pedaEnd.getUTCFullYear(),
            years: yearsSince(CAREER_START, pedaEnd),
        },
        development: { start: devStart.getUTCFullYear() },
    };
    const t = useTranslations("About.timeline");
    return (
        <g>
            {FIELDS.map((field) => (
                <g key={field}>
                    <text
                        x={0}
                        y={LANES[field].y - LINE_TITLE_OFFSET}
                        className={cn(
                            LANES[field].fill,
                            "uppercase text-2xs font-medium font-mono tracking-label",
                        )}
                    >
                        {t(`field.${field}.title`)}
                    </text>
                    <text
                        x={0}
                        y={LANES[field].y + LINE_SUBTITLE_OFFSET}
                        className="fill-dim font-mono text-2xs"
                    >
                        {t.rich(`field.${field}.subtitle`, {
                            ...subtitleValues[field],
                            dot: () => (
                                <tspan
                                    aria-hidden="true"
                                    className="fill-brand"
                                >
                                    ·
                                </tspan>
                            ),
                        })}
                    </text>
                </g>
            ))}{" "}
        </g>
    );
};
