export function TailPiece({ sentence }: { sentence: string }) {
    return (
        <div className="text-ink-muted flex flex-col items-center gap-3 pb-10">
            <div className="flex items-center gap-5">
                <span className="h-px w-21.5 bg-current opacity-50" />

                <svg
                    viewBox="0 0 48 48"
                    width="36"
                    height="36"
                    aria-hidden="true"
                >
                    <g
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="butt"
                    >
                        <path d="M24 13 V35" />
                        <path d="M13 24 H35" />
                    </g>
                    <g fill="currentColor">
                        <path d="M 28 24 Q 32.05 24 37 28.2 Q 37 26.31 42 24 Q 39.75 24 37 19.8 Q 37 21.69 28 24 Z" />
                        <path d="M 24 28 Q 24 32.05 19.8 37 Q 21.69 37 24 42 Q 24 39.75 28.2 37 Q 26.31 37 24 28 Z" />
                        <path d="M 20 24 Q 15.95 24 11 19.8 Q 11 21.69 6 24 Q 8.25 24 11 28.2 Q 11 26.31 20 24 Z" />
                        <path d="M 24 20 Q 24 15.95 28.2 11 Q 26.31 11 24 6 Q 24 8.25 19.8 11 Q 21.69 11 24 20 Z" />
                    </g>
                </svg>

                <span className="h-px w-21.5 bg-current opacity-50" />
            </div>
            <span className="font-mono font-bold text-3xs tracking-label-lg uppercase opacity-80">
                {sentence}
            </span>
        </div>
    );
}
