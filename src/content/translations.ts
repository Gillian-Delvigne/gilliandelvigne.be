import type { Locale } from "./locales";

export const findTranslation = <
    T extends { translationKey: string; locale: Locale },
>(
    coll: T[],
    item: T,
    target: Locale,
): T | undefined => {
    return coll.find(
        (translatedItem) =>
            translatedItem.locale === target &&
            translatedItem.translationKey === item.translationKey,
    );
};
