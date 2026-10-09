import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Crumb } from "@/types/navigation";

interface BreadcrumbProps {
    crumbs: Crumb[];
}

export const Breadcrumb = async ({ crumbs }: BreadcrumbProps) => {
    const t = await getTranslations("Breadcrumb");

    return (
        <nav id="breadcrumb-nav" aria-label={t("name")} className="py-12">
            <ol className="flex flex-col sm:flex-row flex-wrap text-2xs">
                {crumbs.map((crumb, index) => {
                    const isFirst = index === 0;
                    const isLast = index === crumbs.length - 1;
                    const beforeElem =
                        "before:my-2 before:flex-col sm:before:mx-4 before:flex sm:before:inline-block before:h-1 before:w-1 before:rotate-45 before:bg-rule before:align-middle";
                    return (
                        <li
                            key={crumb.label}
                            className={`font-mono ${isLast ? "text-ink" : "text-ink-muted"} tracking-label ${!isFirst ? beforeElem : undefined}`}
                        >
                            <Link
                                href={crumb.href}
                                aria-current={isLast ? "page" : undefined}
                            >
                                {crumb.label}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
