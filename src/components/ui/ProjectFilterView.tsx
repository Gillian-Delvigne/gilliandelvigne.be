"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { FIELD_PARAM, CHOICES, ALL, type Choice } from "@/content/fields";
import type { FieldCard } from "@/types/portfolio";

interface ProjectFilterViewProps {
    cards: FieldCard[];
    choice: Choice;
    onChoose?: (choice: Choice) => void;
}

const ProjectFilterView = ({
    cards,
    choice,
    onChoose,
}: ProjectFilterViewProps) => {
    const t = useTranslations("Projects.filter");
    const cardsOf = (value: Choice) =>
        value === ALL ? cards : cards.filter((card) => card.field === value);

    return (
        <div className="flex flex-col gap-6">
            <p className="sr-only" aria-live="polite">
                {t("count", { count: cardsOf(choice).length })}
            </p>
            <fieldset className="flex w-full xs:w-fit xs:inline-flex gap-1 p-1 rounded-card border border-(--line) bg-(--sunk)">
                <legend className="sr-only">{t("legend")}</legend>
                {CHOICES.map((value) => (
                    <label
                        key={value}
                        className="relative flex-auto justify-center xs:flex-none inline-flex items-baseline gap-2 rounded-md border border-transparent text-xs px-1 xs:px-3 py-1.5 xs:text-sm font-medium text-dim transition-colors duration-(--dur-micro) hover:text-ink has-checked:bg-(--brand-surface) has-checked:border-(--brand-border) has-checked:text-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-brand"
                    >
                        <input
                            type="radio"
                            name={FIELD_PARAM}
                            value={value}
                            checked={choice === value}
                            disabled={!onChoose}
                            onChange={() => onChoose?.(value)}
                            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-default"
                        />
                        {t(value)}
                        <span className="hidden xs:inline font-mono text-2xs tabular-nums">
                            {cardsOf(value).length}
                        </span>
                    </label>
                ))}
            </fieldset>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--width-card),1fr))] gap-6">
                {cardsOf(choice).map((card) => (
                    <Fragment key={card.key}>{card.card}</Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProjectFilterView;
