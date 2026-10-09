import { getRequestConfig } from "next-intl/server";
import { isLocale, DEFAULT_LOCALE } from "@/content";
import { lang } from "next/root-params";

export default getRequestConfig(async ({ locale: explicit }) => {
    const requested = explicit ?? await lang();
    const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
