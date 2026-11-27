import type { TimelinePoint } from "@/lib/timeline";
import { CIRCLE_RADIUS, LANES } from "./layout";

export const TimelinePoints = ({
    points,
    getPositionOf,
}: {
    points: TimelinePoint[];
    getPositionOf: (year: number) => number;
}) => {
    return points.map((p) => (
        <circle
            key={p.slug}
            cx={getPositionOf(p.position)}
            cy={LANES[p.field].y}
            r={CIRCLE_RADIUS}
            className={LANES[p.field].fill}
        />
    ));
};
