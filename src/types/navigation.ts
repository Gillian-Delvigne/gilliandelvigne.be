import type messages from "../../messages/fr.json";

export type NavKeys = keyof (typeof messages)["Nav"];
export type Numeral = "I" | "II" | "III" | "IV" | "V";
import type { ComponentProps } from "react";
import type { Link } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/routing";

/* A breadcrumb may point at a dynamic route ("/blog/[category]"), which then
   requires the object form. So we reuse exactly the type <Link> accepts rather
   than maintaining an approximate copy of it. */
export type Crumb = { label: string; href: ComponentProps<typeof Link>["href"] };

export interface NavEntry {
    key: NavKeys;
    href: StaticPathname;
    numeral: Numeral;
}

export interface Station {
    href: StaticPathname;
    eyebrow: { numeral: Numeral; label: string };
    dek: string;
}

export type Axis = "x" | "y";
