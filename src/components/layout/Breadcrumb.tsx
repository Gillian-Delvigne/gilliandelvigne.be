import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Crumb } from "@/types/navigation";

interface BreadcrumbProps {
    crumbs: Crumb[];
}

export const Breadcrumb = async ({ crumbs }: BreadcrumbProps) => {
    const t = await getTranslations("Breadcrumb");

    return (
        <nav aria-label={t("name")} className="mb-6">
            <ol className="flex flex-wrap font-mono text-2xs font-medium tracking-label text-dim uppercase">
                {crumbs.map((crumb, index) => (
                    <li
                        key={crumb.label}
                        className="not-first:before:mx-2 not-first:before:opacity-50 not-first:before:content-['/'/'']"
                    >
                        <Link
                            href={crumb.href}
                            aria-current={
                                index === crumbs.length - 1 ? "page" : undefined
                            }
                            className="transition-colors duration-(--dur-micro) hover:text-ink"
                        >
                            {crumb.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
