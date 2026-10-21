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
        <Link href={href} aria-current={current ? "page" : undefined}>
            {children}
        </Link>
    );
}
