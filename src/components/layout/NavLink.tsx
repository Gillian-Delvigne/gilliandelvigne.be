"use client";

import { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/routing";
import { isCurrentPage } from "@/lib/isCurrentPage";

interface NavLinkProps {
    children: ReactNode;
    href: StaticPathname;
}

export default function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const current = isCurrentPage(pathname, href);

    return (
        <Link
            href={href}
            aria-current={current ? "page" : undefined}
            className="rounded-md px-2.5 py-1.25 text-xs font-medium text-dim transition-colors duration-(--dur-micro)
                       hover:bg-(--sunk) hover:text-ink
                       aria-[current=page]:bg-(--brand-surface) aria-[current=page]:text-brand"
        >
            {children}
        </Link>
    );
}
