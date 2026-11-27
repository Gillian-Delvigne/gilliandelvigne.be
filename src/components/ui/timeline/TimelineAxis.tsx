import { yearOf } from "@/lib/yearOf";
import {
    AXIS_HEIGHT,
    AXIS_START,
    TICK_LENGTH,
    TICK_LABEL_OFFSET,
} from "./layout";

export const TimelineAxis = ({
    today,
    getPositionOf,
}: {
    today: Date;
    getPositionOf: (year: number) => number;
}) => {
    const axisLast = Math.floor(yearOf(today));
    const ticks = Array.from(
        {
            length: axisLast - AXIS_START + 1,
        },
        (_, index) => index + AXIS_START,
    );
    return (
        <g>
            <line
                x1={getPositionOf(AXIS_START)}
                y1={AXIS_HEIGHT}
                x2={getPositionOf(yearOf(today))}
                y2={AXIS_HEIGHT}
                className="stroke-(--line)"
            />
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
        </g>
    );
};
