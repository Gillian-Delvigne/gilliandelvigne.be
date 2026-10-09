import * as z from "zod";
import type messages from "../../messages/fr.json";
import { ContactData } from "@/lib/validation";

export type ContactInfo = z.infer<typeof ContactData>;
export type ContactErrorCode =
    keyof (typeof messages)["Contact"]["form"]["errors"];

export type ContactFormState =
    | { status: "initial" }
    | { status: "success" }
    | {
          status: "formatError";
          inputs: ContactInfo;
          formatErrors: Partial<Record<keyof ContactInfo, string>>;
      }
    | { status: "sendingError"; sendingError: string };

export type Phase = "fold" | "flap" | "sealed" | null;

export const enum phaseTime {
    fold = 0,
    flap = 300,
    sealed = 800,
    message = 1500,
}
