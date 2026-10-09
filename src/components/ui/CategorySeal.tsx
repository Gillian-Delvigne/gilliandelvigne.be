import { ReactNode } from "react";

interface CategorySealProps {
    className: string;
    label: string;
    glyph: ReactNode;
    decorative: boolean;
}

export default function CategorySeal({
    className,
    label,
    glyph,
    decorative,
}: CategorySealProps) {
    const a11y = decorative
        ? { "aria-hidden": true as const }
        : { role: "img" as const, "aria-label": label };

    return (
        <svg className={className} viewBox="0 0 100 100" {...a11y}>
            <circle
                cx="50"
                cy="50"
                r="45"
                fill="currentColor"
                filter="url(#seal-edge-bite)"
            />
            <text className="uppercase text-parchment-raised text-sm">
                <textPath
                    href="#ring-top"
                    startOffset="50%"
                    textAnchor="middle"
                    fill="currentColor"
                >
                    {label}
                </textPath>
            </text>
            {glyph}
        </svg>
    );
}
