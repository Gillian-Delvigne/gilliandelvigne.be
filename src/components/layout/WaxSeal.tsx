type Size = 28 | 76;
type Type = "drop" | "seal";

export default function WaxSeal({ size, type }: { size: Size; type: Type }) {
    return (
        <svg
            className={type}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <use href="#wax-blob" fill="url(#wax-body)" />
            <circle cx="12.25" cy="12.1" r="6.5" fill="url(#wax-well)" />
            <ellipse
                cx="9"
                cy="7.6"
                rx="5"
                ry="3.3"
                fill="url(#wax-sheen)"
                style={{ opacity: "var(--gloss)" }}
                transform="rotate(-26 9 7.6)"
            />
            <g transform="translate(12.25 12.1) rotate(-5) scale(.63) translate(-12 -12)">
                <use href="#seal-sigil" fill="url(#gilt-gradient)" />
            </g>
        </svg>
    );
}
