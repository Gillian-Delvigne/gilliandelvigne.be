"use client";

import type { TimelinePoint } from "@/lib/timeline";
import { positionOf } from "@/lib/positionOf";
import { yearOf } from "@/lib/yearOf";
import {
    TIMELINE_WIDTH,
    TIMELINE_HEIGHT,
    GUT,
    PAD,
    AXIS_START,
} from "./layout";
import { TimelineFieldLabels } from "./TimelineFieldLabels";
import { TimelineStages } from "./TimelineStages";
import { TimelinePoints } from "./TimelinePoints";
import { TimelineAxis } from "./TimelineAxis";
import { TimelineTurns } from "./TimelineTurns";

export const TimelineView = ({
    points,
    today,
}: {
    points: TimelinePoint[];
    today: Date;
}) => {
    const viewbox = `0 0 ${TIMELINE_WIDTH} ${TIMELINE_HEIGHT}`;
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
        <div>
            <svg viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
                <TimelineFieldLabels today={today} />
                <TimelineStages today={today} getPositionOf={getPositionOf} />
                <TimelinePoints points={points} getPositionOf={getPositionOf} />
                <TimelineAxis today={today} getPositionOf={getPositionOf} />
            </svg>
            <TimelineTurns today={today} />
        </div>
    );
};
