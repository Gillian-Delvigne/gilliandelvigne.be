"use client";

import {
    type InputHTMLAttributes,
    type Ref,
    type TextareaHTMLAttributes,
    useId,
} from "react";
import { cn } from "@/lib/cn";

interface FieldBase {
    label: string;
    name: string;
    type?: "text" | "email" | "textarea";
    hint?: string;
    error?: string;
    required?: boolean;
}

interface AsTextArea
    extends
        FieldBase,
        Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
    type: "textarea";
    ref?: Ref<HTMLTextAreaElement>;
}
interface AsInput
    extends FieldBase, Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
    type?: "text" | "email";
    ref?: Ref<HTMLInputElement>;
}

type FieldProps = AsTextArea | AsInput;

export default function Field(props: FieldProps) {
    const { label, hint, error } = props;
    const id = useId();
    const hintId = `${id}-msg-hint`;
    const errorId = `${id}-msg-err`;
    const describedBy =
        [hint && hintId, error && errorId].filter(Boolean).join(" ") ||
        undefined;
    const aria = {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
    };

    let inputField;
    if (props.type === "textarea") {
        const { label, hint, error, type, className, ...rest } = props;
        inputField = (
            <textarea
                {...rest}
                {...aria}
                className={cn("field-control", className)}
            />
        );
    } else {
        const { label, hint, error, className, ...rest } = props;
        inputField = (
            <input
                {...rest}
                {...aria}
                className={cn("field-control", className)}
            />
        );
    }

    return (
        <div className="field">
            <label htmlFor={id} className="field-label">
                {label}
                {props.required && (
                    <span
                        aria-hidden="true"
                        className="text-accent-deep text-3xs ml-1 relative -top-1"
                    >
                        *
                    </span>
                )}
            </label>
            {inputField}
            {hint && (
                <p id={hintId} className="field-hint">
                    {hint}
                </p>
            )}
            {error && (
                <p id={errorId} role="alert" className="field-error">
                    {error}
                </p>
            )}
        </div>
    );
}
