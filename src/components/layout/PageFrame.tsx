import { Breadcrumb } from "./Breadcrumb";
import type { PageFrameProps } from "@/types/layout";

export default async function PageFrame({
    children,
    title,
    dek,
    breadcrumb,
}: PageFrameProps) {
    return (
        <div>
            <header className="shell pt-10 pb-7">
                {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                <h1 className="font-semibold text-3xl leading-title tracking-title">
                    {title}
                </h1>

                {dek && (
                    <p className="mt-3 max-w-(--measure-dek) text-body leading-body text-dim">
                        {dek}
                    </p>
                )}
            </header>
            <section className="shell flex flex-col pb-24 md:pb-32">
                {children}
            </section>
        </div>
    );
}
