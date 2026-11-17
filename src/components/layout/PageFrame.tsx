import type { Crumb } from "@/types/navigation";
import { Breadcrumb } from "./Breadcrumb";
import PageHeading from "./PageHeading";

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
    return (
        <div>
            <header className="shell pt-10 pb-7">
                {breadcrumb && <Breadcrumb crumbs={breadcrumb} />}
                {aside ? (
                    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_var(--spacing-hex-legend)] md:items-center md:gap-16">
                        <PageHeading title={title} dek={dek} />
                        <div className="mx-auto w-full max-w-hex-legend md:mx-0">
                            {aside}
                        </div>
                    </div>
                ) : (
                    <PageHeading title={title} dek={dek} />
                )}
            </header>
            <section className="shell flex flex-col gap-16 pb-24 md:pb-32">
                {children}
            </section>
        </div>
    );
};

export default PageFrame;
