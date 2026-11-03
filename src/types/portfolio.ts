import type { ReactElement } from "react";
import type { Field } from "@/content/fields";

export type FieldCard = {
    key: string;
    field: Field;
    card: ReactElement;
};
