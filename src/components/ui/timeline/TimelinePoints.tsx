import { rowsOf, type TimelinePoint } from "@/lib/timeline";
import {
    CIRCLE_HALF_WIDTH,
    CIRCLE_RADIUS,
    CIRCLE_ROW_STEP,
    LANES,
} from "./layout";
import { FIELDS } from "@/content/fields";

export const TimelinePoints = ({
    points,
    getPositionOf,
}: {
    points: TimelinePoint[];
    getPositionOf: (year: number) => number;
}) => {
    return FIELDS.map((field) => {
        const lanePoints = points.filter((point) => point.field === field);
        const intervals = lanePoints.map((point) => {
            const x = getPositionOf(point.position);
            return {
                start: x - CIRCLE_HALF_WIDTH,
                end: x + CIRCLE_HALF_WIDTH,
            };
        });
        const pointsRows = rowsOf(intervals);
        const lane = LANES[field];
        const direction = -Math.sign(lane.boxOffset);
        return (
            <g key={field}>
                {lanePoints.map((point, index) => (
                    <circle
                        key={point.slug}
                        cx={getPositionOf(point.position)}
                        cy={
                            lane.y +
                            pointsRows[index] * CIRCLE_ROW_STEP * direction
                        }
                        r={CIRCLE_RADIUS}
                        className={lane.fill}
                    />
                ))}
            </g>
        );
    });
};
