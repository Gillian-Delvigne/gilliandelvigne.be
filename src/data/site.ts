import { NavEntry } from "@/types/navigation";

/**
 * Locale-invariant site metadata.
  *
  * Whatever changes with the locale — title, description, OG text — lives in
  * messages/{fr,en}.json and will be read by `generateMetadata` in T-033.
 */
export const SITE = {
    name: "Gillian Delvigne",
    author: "Gillian Delvigne",
    email: "gillian.delvigne@gmail.com",
    github: "https://github.com/Gillian-Delvigne",
    linkedin: "https://linkedin.com/in/gilliandelvigne",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000",
} as const;

export const NAV = [
    { key: "home", href: "/", numeral: "I" },
    { key: "portfolio", href: "/portfolio", numeral: "II" },
    { key: "blog", href: "/blog", numeral: "III" },
    { key: "about", href: "/about", numeral: "IV" },
    { key: "contact", href: "/contact", numeral: "V" },
] as const satisfies readonly NavEntry[];
