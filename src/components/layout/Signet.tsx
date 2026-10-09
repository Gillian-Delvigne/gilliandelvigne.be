export default function Ring() {
    return (
        <svg
            className="signet"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="10.7"
                fill="none"
                stroke="url(#gilt-gradient)"
                strokeWidth="1.7"
            />
            <g transform="translate(12 12) scale(.74) translate(-12 -12)">
                <use href="#seal-sigil" fill="url(#gilt-gradient)" />
            </g>
        </svg>
    );
}
