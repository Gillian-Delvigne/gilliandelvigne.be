import * as z from "zod";
import type { ContactErrorCode } from "@/types/contact";

// Returns a ContactErrorCode to be sure that every z error figures in messages
const code = (c: ContactErrorCode) => c;

export const ContactData = z.object({
    name: z
        .string()
        .trim()
        .min(1, code("name-required"))
        .max(255, code("name-too-long")),
    email: z
        .email({
            error: (issue) =>
                issue.input === ""
                    ? code("email-required")
                    : code("email-invalid"),
        })
        .trim(),
    message: z
        .string()
        .trim()
        .min(1, code("message-required"))
        .max(3000, code("message-too-long")),
});
