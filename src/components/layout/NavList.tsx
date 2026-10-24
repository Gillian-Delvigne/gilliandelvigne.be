import { useTranslations } from "next-intl";
import type { NavItem } from "@/types/navigation";
import { cn } from "@/lib/cn";
import NavLink from "./NavLink";

interface NavlistProps {
    items: NavItem[];
    className?: string;
    vertical?: boolean;
}

export default function NavList({
    items,
    className,
    vertical,
}: NavlistProps) {
    const t = useTranslations("Menu");
    return (
        <nav aria-label={t("aria")} className={cn(className)}>
            {items.length > 0 && (
                <ol
                    className={`flex ${vertical ? "flex-col" : "items-center"} gap-1`}
                >
                    {items.map((item) => (
                        <li key={item.href}>
                            <NavLink
                                href={item.href}
                                className={
                                    vertical
                                        ? "-mx-2.5 flex min-h-11 items-center text-base"
                                        : undefined
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ol>
            )}
        </nav>
    );
}
