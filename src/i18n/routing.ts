import { defineRouting } from "next-intl/routing";
import { LOCALES, DEFAULT_LOCALE } from "@/content/locales";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: LOCALES,
    // Used when no locale matches
    defaultLocale: DEFAULT_LOCALE,
    // Always a local prefix (/blog => /fr/blog)
    localePrefix: "always",

    // Localize URL's
    pathnames: {
        "/": "/",
        "/about": { fr: "/bagage", en: "/provenance" },
        "/portfolio": { fr: "/etapes", en: "/stages" },
        "/portfolio/[slug]": { fr: "/etapes/[slug]", en: "/stages/[slug]" },
        "/blog": { fr: "/carnet", en: "/notebook" },
        "/blog/[category]": {
            fr: "/carnet/[category]",
            en: "/notebook/[category]",
        },
        "/blog/[category]/[slug]": {
            fr: "/carnet/[category]/[slug]",
            en: "/notebook/[category]/[slug]",
        },
        "/contact": "/missive",
        "/styleguide": "/styleguide",
    },
});

/* The pathnames declared above, as types. Since `pathnames` was added,
   `href` is no longer a `string`: it is this closed union. A typo in a link
   stops compiling — that is the benefit, and also why the data layer must
   stop typing its hrefs as `string`. */
export type Pathname = keyof typeof routing.pathnames;

/* Pathnames WITHOUT a dynamic segment. <Link> accepts these as a plain
   string; the others require the { pathname, params } form. */
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;
