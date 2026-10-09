/**
 * Close cross — charter §8.1, "function" family: "recognition comes first —
  * a standard glyph, merely redrawn in engraved stroke". So a real cross, not
  * a cartographic symbol.
  *
  * 1.5 stroke at 24px, SQUARE caps, no rounded joins, currentColor.
  * The deliberate imperfection (§8.1): the two arms do not cross exactly at
  * the centre — the second is offset by a quarter of a point.
 */
export function Close({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
        >
            <path d="M6 6 L18 18" />
            <path d="M18 5.75 L5.75 18" />
        </svg>
    );
}
