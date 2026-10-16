import { Eyebrow } from "./Eyebrow";
import { Breadcrumb } from "./Breadcrumb";
import type { PageFrameProps } from "@/types/layout";

export default async function PageFrame({
    children,
    eyebrow,
    title,
    dek,
    breadcrumb,
}: PageFrameProps) {
    const heading = eyebrow ? (title ?? eyebrow.label) : title;

    return (
        <div>
            <div
                className="relative isolate
                before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-140
                before:bg-[radial-gradient(120%_70%_at_50%_-14%,var(--halo),transparent_62%)] before:content-['']"
            ></div>
            <header className="mx-auto w-full px-(--gutter) max-w-(--width-content) py-24 md:py-32">
                {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                {eyebrow && <Eyebrow {...eyebrow} />}
                <h1 className="t-title text-3xl leading-title tracking-title">
                    {heading}
                </h1>

                {dek && (
                    <p className="mt-3 max-w-[56ch] text-[1.12rem] leading-[1.55] text-dim">
                        {dek}
                    </p>
                )}
                <div
                    aria-hidden="true"
                    className="relative mt-8 h-px w-full bg-rule
                               after:absolute after:-top-0.75 after:right-0
                               after:h-1.5 after:w-1.5 after:rotate-45 after:bg-gilt"
                />
            </header>
            <section className="mx-auto w-full px-(--gutter) max-w-(--width-content) pb-[max(6rem,var(--space-compass-tab))] md:pb-32">
                {children}
            </section>
        </div>
    );
}
