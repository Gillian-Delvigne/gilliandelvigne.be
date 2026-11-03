import type { Crumb } from "@/types/navigation";
import { Breadcrumb } from "./Breadcrumb";

interface PageFrameProps {
    children: React.ReactNode;
    title: string;
    dek?: string;
    breadcrumb?: Crumb[];
    aside?: React.ReactNode;
}

const PageFrame = async ({
    children,
    title,
    dek,
    breadcrumb,
    aside,
}: PageFrameProps) => {
    const heading = (
        <div>
            <h1 className="font-semibold text-3xl leading-title tracking-title">
                {title}
            </h1>
            {dek && (
                <p className="mt-3 max-w-(--measure-dek) text-body leading-body text-dim">
                    {dek}
                </p>
            )}
        </div>
    );

    return (
        <div>
            <header className="shell pt-10 pb-7">
                {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                {aside ? (
                    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_var(--spacing-hex-legend)] md:items-center md:gap-16">
                        {heading}
                        <div className="mx-auto w-full max-w-hex-legend md:mx-0">
                            {aside}
                        </div>
                    </div>
                ) : (
                    heading
                )}
            </header>
            <section className="shell flex flex-col gap-16 pb-24 md:pb-32">
                {children}
            </section>
        </div>
    );
};

export default PageFrame;
