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
    const filteredCards =
        selectedChoice === "all"
            ? cards
            : cards.filter((card) => card.field === selectedChoice);

    return (
        <div>
            <fieldset>
                <legend>{t("legend")}</legend>
                {CHOICES.map((choice) => (
                    <label key={choice}>
                        <input
                            type="radio"
                            name="field"
                            value={choice}
                            checked={selectedChoice === choice}
                            onChange={() => setSelectedChoice(choice)}
                        />
                        {t(choice)}
                    </label>
                ))}
            </fieldset>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--width-card),1fr))] gap-6">
                {filteredCards.map((card) => (
                    <Fragment key={card.key}>{card.card}</Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProjectFilter;
