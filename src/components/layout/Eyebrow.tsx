import type { EyebrowProps } from "@/types/layout";

export const Eyebrow = ({ numeral, label }: EyebrowProps) => {
    return (
        <p className="font-mono font-medium text-2xs uppercase tracking-label text-ink-muted mb-4">
            <span className="text-accent mr-2">{numeral}</span>
            {label}
        </p>
    );
};
