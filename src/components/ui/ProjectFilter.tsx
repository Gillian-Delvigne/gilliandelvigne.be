"use client";

import { Fragment, useState } from "react";
import { FIELDS, type Field } from "@/content/fields";
import { useTranslations } from "next-intl";
import type { FieldCard } from "@/types/portfolio";

type Choice = "all" | Field;
const CHOICES: Choice[] = ["all", ...FIELDS];

const ProjectFilter = ({ cards }: { cards: FieldCard[] }) => {
    const [selectedChoice, setSelectedChoice] = useState<Choice>("all");
    const t = useTranslations("Projects.filter");

    const cardsOf = (choice: Choice) =>
        choice === "all"
            ? cards
            : cards.filter((card) => card.field === choice);

    return (
        <div className="flex flex-col gap-6">
            <p className="sr-only" aria-live="polite">
                {t("count", { count: cardsOf(selectedChoice).length })}
            </p>
            <fieldset className="flex w-full xs:w-fit xs:inline-flex gap-1 p-1 rounded-card border border-(--line) bg-(--sunk)">
                <legend className="sr-only">{t("legend")}</legend>
                {CHOICES.map((choice) => (
                    <label
                        key={choice}
                        className="relative flex-auto justify-center xs:flex-none inline-flex items-baseline gap-2 rounded-md border border-transparent text-xs px-1 xs:px-3 py-1.5 xs:text-sm font-medium text-dim transition-colors duration-(--dur-micro) hover:text-ink has-checked:bg-(--brand-surface) has-checked:border-(--brand-border) has-checked:text-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-brand"
                    >
                        <input
                            type="radio"
                            name="field"
                            value={choice}
                            checked={selectedChoice === choice}
                            onChange={() => setSelectedChoice(choice)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {t(choice)}
                        <span className="hidden xs:inline font-mono text-2xs tabular-nums">
                            {cardsOf(choice).length}
                        </span>
                    </label>
                ))}
            </fieldset>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--width-card),1fr))] gap-6">
                {cardsOf(selectedChoice).map((card) => (
                    <Fragment key={card.key}>{card.card}</Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProjectFilter;
