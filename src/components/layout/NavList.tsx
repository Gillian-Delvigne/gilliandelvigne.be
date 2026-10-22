import { useTranslations } from "next-intl";
import type { Station } from "@/types/navigation";
import { cn } from "@/lib/cn";
import NavLink from "./NavLink";

interface NavlistProps {
    stations: Station[];
    className?: string;
    vertical?: boolean;
}

export default function NavList({
    stations,
    className,
    vertical,
}: NavlistProps) {
    const t = useTranslations("Route");
    return (
        <nav aria-label={t("aria")} className={cn(className)}>
            {stations.length > 0 && (
                <ol
                    className={`flex ${vertical ? "flex-col" : "items-center"} gap-1`}
                >
                    {stations.map((station) => (
                        <li key={station.href}>
                            <NavLink
                                href={station.href}
                                className={
                                    vertical
                                        ? "-mx-2.5 flex min-h-11 items-center text-base"
                                        : undefined
                                }
                            >
                                {station.eyebrow.label}
                            </NavLink>
                        </li>
                    ))}
                </ol>
            )}
        </nav>
    );
}
