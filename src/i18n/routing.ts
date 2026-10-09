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
        "/about": { fr: "/a-propos", en: "/about" },
        "/portfolio": { fr: "/projets", en: "/projects" },
        "/portfolio/[slug]": { fr: "/projets/[slug]", en: "/projects/[slug]" },
        "/blog": "/blog",
        "/blog/[category]": {
            fr: "/blog/[category]",
            en: "/blog/[category]",
        },
        "/blog/[category]/[slug]": {
            fr: "/blog/[category]/[slug]",
            en: "/blog/[category]/[slug]",
        },
        "/contact": "/contact",
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
