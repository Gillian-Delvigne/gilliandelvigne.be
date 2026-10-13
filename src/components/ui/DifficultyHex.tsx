import { useId } from "react";
import type { Profile } from "@/content/difficulty";
import {
    profileVertices,
    toPointsAttribute,
    frameRings,
    ringVertices,
    CENTER,
    OUTER,
    calculateRadius,
} from "@/lib/hexagon.geometry";

export default function DifficultyHex({ profile }: { profile: Profile }) {
    const vertices = profileVertices(profile);
    const framePoints = frameRings();
    const rays = ringVertices(OUTER);
    const zeroRing = ringVertices(calculateRadius(OUTER, 0));
    const id = useId();

    return (
        <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
                <radialGradient id={id} cx="50%" cy="50%" r="60%">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: "var(--color-brand)",
                            stopOpacity: 0.46,
                        }}
                    />
                    <stop
                        offset="100%"
                        style={{
                            stopColor: "var(--color-brand)",
                            stopOpacity: 0.12,
                        }}
                    />
                </radialGradient>
            </defs>
            {framePoints.length > 0 &&
                framePoints.map((frame, index) => {
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
            {rays.length > 0 &&
                rays.map((ray) => {
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
                strokeDasharray="2 2"
                className="stroke-(--zero)"
            />
            <polygon
                points={toPointsAttribute(vertices)}
                fill={`url(#${id})`}
                strokeLinejoin="round"
                className="stroke-brand"
                strokeWidth={1.9}
            />
            {vertices.length > 0 &&
                vertices.map(([x, y], index) => (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={2.1}
                        className="fill-brand"
                    />
                ))}
        </svg>
    );
}
