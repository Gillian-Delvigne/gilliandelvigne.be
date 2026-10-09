export type Locale = (typeof LOCALES)[number];
export const LOCALES = ["fr", "en"] as const;
export const DEFAULT_LOCALE: Locale = "fr";

export const isLocale = (value: string): value is Locale => {
    return (LOCALES as readonly string[]).includes(value);
};

