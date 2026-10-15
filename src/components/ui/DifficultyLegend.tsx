import { getTranslations } from "next-intl/server";
import { AXES, DIFFICULTY_LEGEND_ID, LEVELS } from "@/content/difficulty";

const HEADING =
    "mt-5.5 mb-2.5 font-mono text-[0.66rem] font-semibold tracking-[0.1em] text-dim uppercase";

export default async function DifficultyLegend() {
    const t = await getTranslations("Difficulty");
    const titleId = `${DIFFICULTY_LEGEND_ID}-title`;

    return (
        <div
            id={DIFFICULTY_LEGEND_ID}
            popover="auto"
            aria-labelledby={titleId}
            className="m-auto max-h-[calc(100dvh-48px)] w-[min(40rem,calc(100vw-32px))] overflow-auto rounded-xl border border-(--line) bg-surface px-7 pt-6.5 pb-6 text-ink shadow-(--lit) backdrop:bg-(--veil)"
        >
            <button
                popoverTarget={DIFFICULTY_LEGEND_ID}
                popoverTargetAction="hide"
                aria-label={t("legend.close")}
                className="absolute top-3.5 right-3.5 size-8 cursor-pointer rounded-lg border border-(--line) text-dim transition-colors duration-(--dur-micro) hover:border-dim hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
                <span aria-hidden="true">×</span>
            </button>

            <h2
                id={titleId}
                className="mb-1.5 pr-10 text-[1.15rem] font-semibold tracking-title"
            >
                {t("legend.title")}
            </h2>

            <h3 className={HEADING}>{t("legend.axesHeading")}</h3>
            <dl className="grid gap-x-4.5 gap-y-2.25 sm:grid-cols-[auto_1fr]">
                {AXES.map((axis) => (
                    <div key={axis} className="contents">
                        <dt className="font-semibold sm:whitespace-nowrap">
                            {t(`axes.${axis}`)}
                        </dt>
                        <dd className="mb-2 text-[0.9rem] text-dim sm:mb-0">
                            {t(`definitions.${axis}`)}
                        </dd>
                    </div>
                ))}
            </dl>

            <h3 className={HEADING}>{t("legend.levelsHeading")}</h3>
            <ol className="grid gap-1.5">
                {LEVELS.map((level) => (
                    <li
                        key={level}
                        className="grid grid-cols-[2.2rem_1fr] items-baseline border-b border-(--line-soft) py-1.75 text-[0.9rem] text-dim"
                    >
                        <span className="font-mono text-[0.85rem] font-semibold text-brand">
                            {level}
                        </span>
                        <span>
                            <span className="text-ink">
                                {t(`levels.${level}.name`)}
                            </span>
                            {t(`levels.${level}.detail`) &&
                                ` · ${t(`levels.${level}.detail`)}`}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
