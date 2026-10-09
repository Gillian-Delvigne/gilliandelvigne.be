"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { useTranslations } from "next-intl";
import { ContactFormState, Phase, phaseTime } from "@/types/contact";
import HoneyPot from "../ui/HoneyPot";
import Field from "../ui/Field";
import Button from "../ui/Button";
import Signet from "../layout/Signet";
import WaxSeal from "../layout/WaxSeal";

const ENVELOPE_RATIO = 1.42;

export default function ContactForm({
    submitAction,
}: {
    submitAction: (
        state: ContactFormState,
        formData: FormData,
    ) => Promise<ContactFormState>;
}) {
    const [state, action, isPending] = useActionState<
        ContactFormState,
        FormData
    >(submitAction, {
        status: "initial",
    });
    const [phase, setPhase] = useState<Phase>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Contact.form");
    const errors =
        state.status === "formatError" ? state.formatErrors : undefined;
    const inputs = state.status === "formatError" ? state.inputs : undefined;

    useEffect(() => {
        const ref = formRef.current;
        if (ref) {
            const firstError: HTMLInputElement | HTMLTextAreaElement | null =
                ref.querySelector('[aria-invalid="true"]');
            if (firstError) firstError.focus();
        }
    }, [state]);

    useEffect(() => {
        if (state.status !== "success") return;

        const timers: ReturnType<typeof setTimeout>[] = [];
        const at = (ms: number, fn: () => void) =>
            timers.push(setTimeout(fn, ms));

        if (sheetRef.current) {
            const { width, height } = sheetRef.current.getBoundingClientRect();
            sheetRef.current.style.height = `${height}px`;

            // If motions are reduced in the OS : skip the animation
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                at(0, () => {
                    setPhase("sealed");
                    sheetRef.current!.style.height = `${Math.round(width / ENVELOPE_RATIO)}px`;
                });
                at(620, () => setSuccessMessage(t("success-msg")));
            } else {
                at(phaseTime.fold, () => setPhase("fold"));
                at(phaseTime.flap, () => {
                    setPhase("flap");
                    sheetRef.current!.style.height = `${Math.round(width / ENVELOPE_RATIO)}px`;
                });
                at(phaseTime.sealed, () => setPhase("sealed"));
                at(phaseTime.message, () =>
                    setSuccessMessage(t("success-msg")),
                );
            }
        }

        return () => timers.forEach(clearTimeout);
    }, [state.status, t]);

    return (
        <>
            <div className="stage" data-phase={phase || undefined}>
                <div ref={sheetRef} className="sheet-bite-edge">
                    <div
                        className="sheet-content"
                        inert={phase ? true : undefined}
                    >
                        <div className="pb-8">
                            <p className="uppercase font-mono tracking-label-lg text-ink">
                                {t("header-title")}
                            </p>
                            <p className="font-mono text-ink-muted text-xs">
                                {t("header-line")}
                            </p>
                        </div>
                        <form
                            noValidate
                            className="flex flex-col gap-5"
                            action={action}
                            ref={formRef}
                        >
                            <HoneyPot />
                            <Field
                                type="text"
                                label={t("f-name.label")}
                                name="name"
                                required={true}
                                defaultValue={inputs?.name}
                                error={errors?.name}
                                autoFocus={true}
                            />
                            <Field
                                type="email"
                                label={t("f-email.label")}
                                name="email"
                                required={true}
                                defaultValue={inputs?.email}
                                error={errors?.email}
                            />
                            <Field
                                type="textarea"
                                label={t("f-message.label")}
                                name="message"
                                required={true}
                                className="resize-y min-h-40"
                                defaultValue={inputs?.message}
                                error={errors?.message}
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={(e) => {
                                    if (isPending) e.preventDefault();
                                }}
                                aria-disabled={isPending}
                                data-busy={isPending ? "" : undefined}
                                className="m-auto btn-seal text-center"
                            >
                                {t("btn-action")}
                                <Signet />
                                <WaxSeal size={28} type="drop" />
                            </Button>
                        </form>
                    </div>
                    <div className="shade-bottom" aria-hidden="true">
                        <div className="flap-bottom" />
                    </div>
                    <div className="shade-top" aria-hidden="true">
                        <div className="flap-top" />
                    </div>
                    <WaxSeal size={76} type="seal" />
                </div>
            </div>

            <p role="status" className="message-status">
                {isPending && <span data-kind="sealing">{t("sealing")}</span>}
                {successMessage && (
                    <span data-kind="sent">{successMessage}</span>
                )}
                {state.status === "sendingError" && (
                    <span data-kind="failed">{state.sendingError}</span>
                )}
            </p>
        </>
    );
}
