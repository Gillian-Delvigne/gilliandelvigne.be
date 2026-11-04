"use client";

import { useSearchParams } from "next/navigation";
import { CHOICES, ALL, FIELD_PARAM, type Choice } from "@/content/fields";
import type { FieldCard } from "@/types/portfolio";
import ProjectFilterView from "./ProjectFilterView";

const isChoice = (param: string | null): param is Choice => {
    return param !== null && (CHOICES as readonly string[]).includes(param);
};

const toChoice = (param: string | null): Choice => {
    return isChoice(param) ? param : ALL;
};

const choose = (choice: Choice) => {
    const params = new URLSearchParams(window.location.search);
    if (choice === ALL) params.delete(FIELD_PARAM);
    else params.set(FIELD_PARAM, choice);
    const query = params.toString();
    window.history.replaceState(
        null,
        "",
        query ? `?${query}` : window.location.pathname,
    );
};

const ProjectFilter = ({ cards }: { cards: FieldCard[] }) => {
    const searchParams = useSearchParams();
    const selectedChoice = toChoice(searchParams.get(FIELD_PARAM));

    return (
        <ProjectFilterView
            cards={cards}
            choice={selectedChoice}
            onChoose={choose}
        />
    );
};

export default ProjectFilter;
