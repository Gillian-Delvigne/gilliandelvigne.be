"use client";
import { useId, useState, useRef, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { Project } from "@/content";
import type { Axis, Profile } from "@/types/difficulty";
import { AXES } from "@/content/difficulty";
import DifficultyFigure from "./DifficultyFigure";
import DifficultyGauge from "./DifficultyGauge";

const DifficultyProfile = ({
    profile,
    evidence,
}: {
    profile: Profile | undefined;
    evidence: Project["evidence"];
}) => {
    const [selected, setSelected] = useState<Axis>(AXES[0]);
    const [hovered, setHovered] = useState<Axis | undefined>(undefined);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const id = useId();
    const t = useTranslations("Difficulty");
    const isSelected = (axis: Axis): boolean => axis === selected;
    const highlighted = hovered ?? selected;

    const focusNextTab = (
        event: KeyboardEvent<HTMLButtonElement>,
        index: number,
    ) => {
        const size = AXES.length;
        const to = { ArrowDown: index + 1, ArrowUp: index - 1 }[event.key];
        if (to === undefined) return;
        event.preventDefault();
        const next = (to + size) % size;
        tabRefs.current[next]?.focus();
    };

    if (!profile) return;

    return (
        <section
            aria-labelledby={`${id}-difficulty-profile`}
            className="mt-9 rounded-card border border-(--line) bg-surface p-5 shadow-card"
        >
            <h2
                id={`${id}-difficulty-profile`}
                className="mb-0.5 text-lg leading-title font-semibold tracking-title"
            >
                {t("title")}
            </h2>
            <p className="mb-3 text-xs text-dim" id={`${id}-tabs-instruction`}>
                {t("pickHint")}
            </p>
            <div className="grid gap-5 md:max-lg:grid-cols-[minmax(0,1fr)_var(--spacing-hex-profile)] md:max-lg:items-center md:max-lg:gap-x-8">
                <div>
                    <div
                        role="tablist"
                        aria-labelledby={`${id}-difficulty-profile`}
                        aria-describedby={`${id}-tabs-instruction`}
                        aria-orientation="vertical"
                        className="flex flex-col"
                    >
                        {AXES.map((axis: Axis, index: number) => (
                            <button
                                type="button"
                                aria-controls={`${id}-evidence-panel`}
                                role="tab"
                                id={`${id}-tab-${axis}`}
                                key={axis}
                                ref={(tab) => {
                                    tabRefs.current[index] = tab;
                                }}
                                onClick={() => setSelected(axis)}
                                onMouseEnter={() => setHovered(axis)}
                                onMouseLeave={() => setHovered(undefined)}
                                onKeyDown={(event) =>
                                    focusNextTab(event, index)
                                }
                                aria-selected={isSelected(axis)}
                                tabIndex={isSelected(axis) ? 0 : -1}
                                className="-ml-3 flex cursor-pointer items-center justify-between gap-4 border-b border-l-2 border-b-(--line-soft) border-l-transparent py-2 sm:py-1.5 pr-2 pl-3 text-left text-sm font-medium text-dim hover:text-ink focus-visible:-outline-offset-2 aria-selected:border-l-brand aria-selected:bg-(--sunk) aria-selected:text-ink"
                            >
                                <span>{t(`axes.${axis}`)}</span>
                                <DifficultyGauge
                                    level={profile[axis]}
                                    highlighted={axis === highlighted}
                                />
                            </button>
                        ))}
                    </div>
                    <div
                        id={`${id}-evidence-panel`}
                        aria-labelledby={`${id}-tab-${selected}`}
                        role="tabpanel"
                        tabIndex={0}
                        className="grid py-4 text-sm leading-body text-ink"
                    >
                        {AXES.map((axis) => (
                            <p
                                key={axis}
                                className={cn(
                                    "col-start-1 row-start-1",
                                    axis !== selected && "invisible",
                                )}
                            >
                                {evidence[axis]}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="mx-auto w-full max-w-(--spacing-hex-rail)">
                    <DifficultyFigure
                        profile={profile}
                        highlight={highlighted}
                    />
                </div>
            </div>
        </section>
    );
};

export default DifficultyProfile;
