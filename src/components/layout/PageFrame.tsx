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
            <header className="mx-auto w-full px-(--gutter) max-w-(--width-content) py-24 md:py-32">
                {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                {eyebrow && <Eyebrow {...eyebrow} />}
                <h1 className="t-title text-3xl leading-title tracking-title">
                    {heading}
                </h1>

                {dek && (
                    <p className="t-dek mt-2 max-w-(--measure-prose) text-lg text-ink-secondary">
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
