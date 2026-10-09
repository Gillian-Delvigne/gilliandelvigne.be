export function PaperLayers() {
    return (
        <>
            {/* Relief masses — LOW FREQUENCY. The only background layer that
survives a backdrop-filter */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
								radial-gradient(42% 58% at 12%  6%, color-mix(in srgb, var(--color-ink) 13%, transparent) 0%, transparent 68%),
								radial-gradient(38% 50% at 61% -6%, color-mix(in srgb, var(--color-ink) 10%, transparent) 0%, transparent 70%),
								radial-gradient(48% 60% at 97% 38%, color-mix(in srgb, var(--color-ink) 12%, transparent) 0%, transparent 66%),
								radial-gradient(40% 54% at 33% 66%, color-mix(in srgb, var(--color-ink)  9%, transparent) 0%, transparent 72%)`,
                }}
            />

            {/* Applying the filters defined above. */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] mix-blend-multiply">
                <rect width="100%" height="100%" fill="url(#paper-lines)" />
            </svg>

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
                style={{ filter: "url(#paper-relief)" }}
            />

            {/* Vignettage */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,color-mix(in_srgb,var(--color-ink)_18%,transparent)_100%)]" />
        </>
    );
}
