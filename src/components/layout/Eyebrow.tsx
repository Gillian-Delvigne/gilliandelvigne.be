import type { EyebrowProps } from "@/types/layout";

const Sep = () => <span aria-hidden="true"> · </span>;

export const Eyebrow = ({ numeral, name, tag }: EyebrowProps) => {
    return (
        <p className="font-mono font-medium text-2xs uppercase tracking-label text-ink-muted mb-4">
            <span className="text-accent mr-2">{numeral}</span>
            {name}
            {tag && (
                <>
                    <Sep />
                    {tag}
                </>
            )}
        </p>
    );
};
