/**
 * Decorative paper layers. All `absolute inset-0`: they cover their
 * positioned container.
 *
 * `pointer-events-none` is MANDATORY on every one of them. A positioned
 * element paints above a non-positioned one whatever the DOM order — without
 * it, these four layers swallow every click aimed at the content.
 */

export function SvgDefs() {
    /* Layer definitions: they render nothing on their own. */
    return (
        <svg width="0" height="0" className="pointer-events-none absolute">
            <defs>
                {/* Background layers */}
                <filter
                    id="paper-relief"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.06"
                        numOctaves="4"
                        result="noise"
                    />
                    <feDiffuseLighting
                        in="noise"
                        lightingColor="white"
                        surfaceScale="2"
                        diffuseConstant="1.155"
                    >
                        <feDistantLight azimuth="225" elevation="60" />
                    </feDiffuseLighting>
                </filter>
                <pattern
                    id="paper-lines"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                >
                    <rect
                        width="4"
                        height="0.6"
                        fill="var(--color-ink)"
                        opacity="0.5"
                    />
                </pattern>

                {/* Seal button edge bite */}
                <filter
                    id="seal-edge-bite"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.09"
                        numOctaves="2"
                        result="bruit"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="bruit"
                        scale="4"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>

                {/* Sheet edge bite */}
                <filter
                    id="sheet-edge-bite"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.012"
                        numOctaves="3"
                        result="bruit"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="bruit"
                        scale="2.6"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>

                {/* Gradients */}
                <radialGradient id="wax-body" cx="36%" cy="26%" r="82%">
                    <stop
                        offset="0%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 74%, var(--color-parchment))"
                    />
                    <stop
                        offset="46%"
                        stopColor="var(--color-accent-on-dark)"
                    />
                    <stop
                        offset="86%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 74%, var(--color-ink))"
                    />
                    <stop
                        offset="100%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 60%, var(--color-ink))"
                    />
                </radialGradient>

                <radialGradient id="wax-well" cx="50%" cy="16%" r="92%">
                    <stop
                        offset="0%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 66%, var(--color-ink))"
                    />
                    <stop
                        offset="62%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 80%, var(--color-ink))"
                    />
                    <stop
                        offset="100%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 92%, var(--color-ink))"
                    />
                </radialGradient>

                <radialGradient id="wax-sheen" cx="50%" cy="50%" r="50%">
                    <stop
                        offset="0%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 62%, var(--color-parchment))"
                    />
                    <stop
                        offset="58%"
                        stopColor="color-mix(in srgb, var(--color-accent-on-dark) 80%, var(--color-parchment))"
                        stopOpacity=".45"
                    />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                <linearGradient id="gilt-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0%"
                        stopColor="color-mix(in srgb, var(--color-gilt) 68%, var(--color-parchment))"
                    />
                    <stop offset="55%" stopColor="var(--color-gilt)" />
                    <stop
                        offset="100%"
                        stopColor="color-mix(in srgb, var(--color-gilt) 72%, var(--color-ink))"
                    />
                </linearGradient>

                {/* Seal sigil — chevrons */}
                <g id="seal-sigil">
                    <path d="M9.6 6.4 L5.0 12 L9.6 17.6 L11.3 16.2 L8.0 12 L11.3 7.8Z" />
                    <path d="M14.4 6.4 L19.0 12 L14.4 17.6 L12.7 16.2 L16.0 12 L12.7 7.8Z" />
                    <path d="M12 9.6 L13.7 12 L12 14.4 L10.3 12Z" />
                </g>

                {/* Wax outline */}
                <path
                    id="wax-blob"
                    d="M20.28 11.90 C20.35 12.71 20.55 13.56 20.45 14.38 C20.35 15.20 20.10 16.11 19.68 16.84 C19.26 17.57 18.62 18.26 17.95 18.76 C17.27 19.26 16.41 19.59 15.62 19.83 C14.83 20.07 13.99 20.15 13.19 20.19 C12.39 20.24 11.60 20.20 10.82 20.08 C10.05 19.97 9.24 19.81 8.53 19.50 C7.81 19.19 7.11 18.73 6.53 18.22 C5.94 17.70 5.43 17.05 5.01 16.39 C4.60 15.73 4.22 14.98 4.05 14.23 C3.88 13.49 3.90 12.65 4.00 11.90 C4.10 11.15 4.41 10.44 4.67 9.75 C4.92 9.05 5.20 8.41 5.54 7.75 C5.87 7.08 6.18 6.34 6.68 5.76 C7.18 5.19 7.85 4.68 8.54 4.32 C9.23 3.96 10.03 3.75 10.81 3.61 C11.59 3.47 12.40 3.43 13.21 3.46 C14.03 3.49 14.99 3.44 15.71 3.78 C16.43 4.11 17.00 4.89 17.56 5.48 C18.12 6.08 18.66 6.68 19.07 7.36 C19.48 8.03 19.84 8.78 20.04 9.54 C20.24 10.30 20.21 11.09 20.28 11.90Z"
                />

                {/* Seal text path*/}
                <path
                    id="ring-top"
                    d="M 18 50 A 32 32 0 0 1 82 50"
                    fill="none"
                />
            </defs>
        </svg>
    );
}
