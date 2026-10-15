import { useId } from "react";
import { cn } from "@/lib/cn";
import type { AxisLabels, Profile } from "@/types/difficulty";
import {
    profileVertices,
    toPointsAttribute,
    frameRings,
    ringVertices,
    CENTER,
    OUTER,
    LABEL_PAD_X,
    LABEL_PAD_Y,
    LINE_HEIGHT,
    calculateRadius,
    generateLabelData,
    type LabelData,
} from "@/lib/hexagon.geometry";
import { AXES } from "@/content/difficulty";

interface HexProps {
    profile: Profile;
    labels?: AxisLabels;
    className?: string;
}

/* Rendering of the profile, from the visual system. Values are in
   viewBox units, so they scale with the drawing. */
const GRADIENT_CENTER_OPACITY = 0.46;
const GRADIENT_EDGE_OPACITY = 0.12;
const PROFILE_STROKE_WIDTH = 1.9;
const VERTEX_RADIUS = 2.1;
const ZERO_RING_DASH = "2 2";

export default function DifficultyHex({
    profile,
    labels,
    className,
}: HexProps) {
    const vertices = profileVertices(profile);
    const framePoints = frameRings();
    const rays = ringVertices(OUTER);
    const zeroRing = ringVertices(calculateRadius(OUTER, 0));
    const id = useId();
    let labelsData;

    if (labels) {
        labelsData = AXES.map((axis, index) =>
            generateLabelData(labels[axis], index),
        ) as LabelData[];
    }

    return (
        <svg
            viewBox={`${-LABEL_PAD_X} ${-LABEL_PAD_Y} ${2 * CENTER + 2 * LABEL_PAD_X} ${2 * CENTER + 2 * LABEL_PAD_Y}`}
            aria-hidden="true"
            className={cn(className)}
        >
            <defs>
                <radialGradient id={id} cx="50%" cy="50%" r="60%">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: "var(--color-brand)",
                            stopOpacity: GRADIENT_CENTER_OPACITY,
                        }}
                    />
                    <stop
                        offset="100%"
                        style={{
                            stopColor: "var(--color-brand)",
                            stopOpacity: GRADIENT_EDGE_OPACITY,
                        }}
                    />
                </radialGradient>
            </defs>
            {framePoints.map((frame, index) => {
                return (
                    <polygon
                        key={frame.join("_")}
                        points={toPointsAttribute(frame)}
                        fill="none"
                        className={`${index === framePoints.length - 1 ? "stroke-(--web-out)" : "stroke-(--web)"}`}
                        strokeLinejoin="round"
                    />
                );
            })}
            {rays.map((ray) => {
                const [x, y] = ray;
                return (
                    <line
                        key={ray.join("_")}
                        x1={CENTER}
                        y1={CENTER}
                        x2={x}
                        y2={y}
                        className="stroke-(--web)"
                    />
                );
            })}
            <polygon
                points={toPointsAttribute(zeroRing)}
                fill="none"
                strokeDasharray={ZERO_RING_DASH}
                className="stroke-(--zero)"
            />
            <polygon
                points={toPointsAttribute(vertices)}
                fill={`url(#${id})`}
                strokeLinejoin="round"
                className="stroke-brand"
                strokeWidth={PROFILE_STROKE_WIDTH}
            />
            {vertices.map(([x, y], index) => (
                <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={VERTEX_RADIUS}
                    className="fill-brand"
                />
            ))}
            {labelsData &&
                labelsData.map((data) => {
                    const { anchorPoint, textAnchor, lines, offset, label } =
                        data;
                    const [x, y] = anchorPoint;
                    return (
                        <text
                            key={label}
                            y={y + offset}
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            className="fill-dim text-[8.5px]"
                        >
                            {lines.map((line, k) => (
                                <tspan
                                    key={k}
                                    x={x}
                                    dy={k === 0 ? 0 : LINE_HEIGHT}
                                >
                                    {line}
                                </tspan>
                            ))}
                        </text>
                    );
                })}
        </svg>
    );
}
