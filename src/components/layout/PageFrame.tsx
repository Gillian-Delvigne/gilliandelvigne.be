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
            <header className="mx-auto w-full px-(--gutter) max-w-(--width-content) pt-10 pb-7">
                {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                {eyebrow && <Eyebrow {...eyebrow} />}
                <h1 className="font-semibold text-3xl leading-title tracking-title">
                    {heading}
                </h1>

                {dek && (
                    <p className="mt-3 max-w-(--measure-dek) text-body leading-body text-dim">
                        {dek}
                    </p>
                )}
            </header>
            <section className="flex flex-col gap-16 mx-auto w-full px-(--gutter) max-w-(--width-content) pb-24 md:pb-32">
                {children}
            </section>
        </div>
    );
}
