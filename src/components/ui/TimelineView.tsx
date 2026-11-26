"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { STAGES, CAREER_START, DEV_START, PEDAGO_END } from "@/data/timeline";
import { FIELDS, type Field } from "@/content/fields";
import { TimelinePoint, shapeOf, periodOf } from "@/lib/timeline";
import { positionOf } from "@/lib/positionOf";
import { yearOf } from "@/lib/yearOf";

const TIMELINE_WIDTH = 1080;
const TIMELINE_HEIGHT = 320;
const GUT = 150;
const PAD = 20;
const HEIGHTS: Record<Field, number> = { pedagogy: 70, development: 150 };
const COLORS: Record<Field, { fill: string; stroke: string }> = {
    pedagogy: { fill: "fill-ink", stroke: "stroke-ink" },
    development: { fill: "fill-brand", stroke: "stroke-brand" },
};
const AXIS_HEIGHT = 270;
const CIRCLE_RADIUS = 5;
const AXIS_START = Math.floor(yearOf(CAREER_START));
const TICK_LENGTH = 4;
const TICK_LABEL_OFFSET = 20;
const LINE_TITLE_OFFSET = 2;
const LINE_SUBTITLE_OFFSET = 12;

export const TimelineView = ({
    points,
    today,
}: {
    points: TimelinePoint[];
    today: Date;
}) => {
    const viewbox = `0 0 ${TIMELINE_WIDTH} ${TIMELINE_HEIGHT}`;
    const { start: pedaStart, end: pedaEnd } = periodOf(
        "pedagogy",
        STAGES,
        today,
    );
    const { start: devStart, end: devEnd } = periodOf(
        "development",
        STAGES,
        today,
    );
    const axisLast = Math.floor(yearOf(today));
    const ticks = Array.from(
        {
            length: axisLast - AXIS_START + 1,
        },
        (_, index) => index + AXIS_START,
    );
    const getPositionOf = (year: number) => {
        return (
            GUT +
            positionOf(
                year,
                AXIS_START,
                TIMELINE_WIDTH - GUT - PAD,
                yearOf(today),
            )
        );
    };
    const t = useTranslations("About.timeline");
    const subtitleValues: Record<Field, Record<string, number>> = {
        pedagogy: {
            start: CAREER_START.getUTCFullYear(),
            end: pedaEnd.getUTCFullYear(),
            years: pedaEnd.getUTCFullYear() - CAREER_START.getUTCFullYear(),
        },
        development: { start: devStart.getUTCFullYear() },
    };

    return (
        <svg viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
            {FIELDS.map((field) => (
                <g key={field}>
                    <text
                        x={0}
                        y={HEIGHTS[field] - LINE_TITLE_OFFSET}
                        className={cn(
                            COLORS[field].fill,
                            "uppercase text-2xs font-medium font-mono tracking-label",
                        )}
                    >
                        {t(`field.${field}.title`)}
                    </text>
                    <text
                        x={0}
                        y={HEIGHTS[field] + LINE_SUBTITLE_OFFSET}
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
            ))}
            <line
                x1={getPositionOf(
                    yearOf(pedaStart < CAREER_START ? CAREER_START : pedaStart),
                )}
                y1={HEIGHTS.pedagogy}
                x2={getPositionOf(yearOf(pedaEnd))}
                y2={HEIGHTS.pedagogy}
                className={COLORS.pedagogy.stroke}
            />
            <line
                x1={getPositionOf(yearOf(devStart))}
                y1={HEIGHTS.development}
                x2={getPositionOf(yearOf(devEnd))}
                y2={HEIGHTS.development}
                className={COLORS.development.stroke}
            />
            <line
                x1={getPositionOf(AXIS_START)}
                y1={AXIS_HEIGHT}
                x2={getPositionOf(yearOf(today))}
                y2={AXIS_HEIGHT}
                className="stroke-(--line)"
            />
            {points.map((p) => (
                <circle
                    key={p.slug}
                    cx={getPositionOf(p.position)}
                    cy={HEIGHTS[p.field]}
                    r={CIRCLE_RADIUS}
                    className={COLORS[p.field].fill}
                />
            ))}
            {ticks.map((tick) => (
                <g key={tick}>
                    <line
                        x1={getPositionOf(tick)}
                        x2={getPositionOf(tick)}
                        y1={AXIS_HEIGHT}
                        y2={AXIS_HEIGHT + TICK_LENGTH}
                        className="stroke-(--line)"
                    />
                    <text
                        className="fill-dim font-mono text-2xs"
                        x={getPositionOf(tick)}
                        y={AXIS_HEIGHT + TICK_LABEL_OFFSET}
                        textAnchor="middle"
                    >
                        {tick}
                    </text>
                </g>
            ))}
        </svg>
    );
};
