"use client";

import { STAGES, CAREER_START, DEV_START, PEDAGO_END } from "@/data/timeline";
import { Field } from "@/content/fields";
import { TimelinePoint, shapeOf, periodOf } from "@/lib/timeline";
import { positionOf } from "@/lib/positionOf";
import { yearOf } from "@/lib/yearOf";

const TIMELINE_WIDTH = 1080;
const TIMELINE_HEIGHT = 320;
const GUT = 150;
const PAD = 20;
const HEIGHTS: Record<Field, number> = { pedagogy: 70, development: 150 };
const AXIS_HEIGHT = 270;
const CIRCLE_RADIUS = 5;
const AXIS_START = Math.floor(yearOf(CAREER_START));

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

    return (
        <svg viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
            <line
                x1={getPositionOf(
                    yearOf(pedaStart < CAREER_START ? CAREER_START : pedaStart),
                )}
                y1={HEIGHTS.pedagogy}
                x2={getPositionOf(yearOf(pedaEnd))}
                y2={HEIGHTS.pedagogy}
                stroke="currentColor"
            />
            <line
                x1={getPositionOf(yearOf(devStart))}
                y1={HEIGHTS.development}
                x2={getPositionOf(yearOf(devEnd))}
                y2={HEIGHTS.development}
                className="stroke-(--brand-solid)"
            />
            <line
                x1={getPositionOf(AXIS_START)}
                y1={AXIS_HEIGHT}
                x2={getPositionOf(yearOf(today))}
                y2={AXIS_HEIGHT}
                className="stroke-(--line)"
            />
            {points
                .filter((p) => p.field === "pedagogy")
                .map((p) => (
                    <circle
                        key={p.slug}
                        cx={getPositionOf(p.position)}
                        cy={HEIGHTS.pedagogy}
                        r={CIRCLE_RADIUS}
                        fill="currentColor"
                    />
                ))}
            {points
                .filter((p) => p.field === "development")
                .map((p) => (
                    <circle
                        key={p.slug}
                        cx={getPositionOf(p.position)}
                        cy={HEIGHTS.development}
                        r={CIRCLE_RADIUS}
                        className="fill-(--brand-solid)"
                    />
                ))}
            {ticks.map((tick) => (
                <line
                    key={tick}
                    x1={getPositionOf(tick)}
                    x2={getPositionOf(tick)}
                    y1={AXIS_HEIGHT}
                    y2={AXIS_HEIGHT + 4}
                    className="stroke-(--line)"
                />
            ))}
        </svg>
    );
};
