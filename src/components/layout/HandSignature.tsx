"use client";

import { useEffect, useRef } from "react";
import { SIGNATURE_SUBPATHS } from "@/data/signature";

const DURATION = 2600;

export function HandSignature({ name }: { name: string }) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const paths = Array.from(svg.querySelectorAll("path"));

        // Lengths are only known after render: getTotalLength() measures the
        // real geometry. Hence useEffect rather than a build-time computation.
        const L = paths.map((p) => p.getTotalLength());
        const total = L.reduce((a, b) => a + b, 0);

        // Each sub-path starts once the sum of the previous ones has elapsed,
        // and runs in proportion to its own length → constant pen speed.
        let acc = 0;
        const plan = L.map((l) => {
            const start = (acc / total) * DURATION;
            acc += l;
            return { start, duration: (l / total) * DURATION };
        });

        // The global !important in globals.css kills the TRANSITION, not the
        // STATE. Without this check the initial state (opacity 0) would stay
        // frozen and the signature would never show. Reduced motion ≠ no content.
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

        const jouer = () =>
            paths.forEach((p, k) => {
                if (reduced) {
                    p.style.opacity = "1";
                    p.style.strokeDashoffset = "0";
                    return;
                }
                window.setTimeout(() => {
                    p.style.opacity = "1";
                    p.style.transition = `stroke-dashoffset ${Math.max(plan[k].duration, 40)}ms linear`;
                    p.style.strokeDashoffset = "0";
                }, plan[k].start);
            });

        const obs = new IntersectionObserver(
            ([e], o) => {
                if (e.isIntersecting) {
                    jouer();
                    o.disconnect();
                }
            },
            { threshold: 0.4 },
        );
        obs.observe(svg);
        return () => obs.disconnect();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <svg
                ref={svgRef}
                viewBox="0 0 724 245"
                className="text-gilt w-32 z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label={name}
            >
                <title>{name}</title>

                {SIGNATURE_SUBPATHS.map((d, i) => (
                    <path
                        key={i}
                        d={d}
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={1}
                        style={{ opacity: 0 }}
                    />
                ))}
            </svg>

            <hr
                className="mb-3 -mt-3 h-px w-40 border-0
                           bg-[color-mix(in_srgb,var(--color-parchment)_30%,transparent)]"
            />

            <p className="font-mono tracking-label-lg text-parchment uppercase opacity-80">
                {name}
            </p>
        </div>
    );
}
