"use server";

import * as z from "zod";
import { getTranslations } from "next-intl/server";
import { Locale, isLocale } from "@/content";
import type {
    ContactInfo,
    ContactFormState,
    ContactErrorCode,
} from "@/types/contact";
import { ContactData } from "@/lib/validation";
import sendEmail from "@/lib/email";
import { logger } from "@/lib/logger";

export default async function handleSubmit(
    locale: Locale,
    state: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    if (!isLocale(locale)) return { status: "initial" };

    const t = await getTranslations({
        locale: locale,
        namespace: "Contact.form",
    });
    const { site, name, email, message } = Object.fromEntries(formData);
    const result = ContactData.safeParse({
        name: name,
        email: email,
        message: message,
    });

    if (site) return { status: "success" };
    if (result.success) {
        try {
            await sendEmail(result.data);
            return { status: "success" };
        } catch (err) {
            logger("ERROR", "Error: ", err);
            return {
                status: "sendingError",
                sendingError: t("error-msg"),
            };
        }
    }
    const zodErrors = z.flattenError(result.error, (issue) => {
        const code = issue.message as ContactErrorCode;
        if (issue.code === "too_big")
            return t(`errors.${code}`, { max: issue.maximum as number });
        return t(`errors.${code}`);
    });
    const errors: Partial<Record<keyof ContactInfo, string>> = {};
    for (const [key, value] of Object.entries(zodErrors.fieldErrors) as [
        keyof ContactInfo,
        string[],
    ][]) {
        errors[key] = value[0];
    }
    return {
        status: "formatError",
        inputs: {
            name: name.toString().trim(),
            email: email.toString().trim(),
            message: message.toString().trim(),
        },
        formatErrors: errors,
    };
}
