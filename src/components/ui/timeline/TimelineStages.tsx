import { useTranslations } from "next-intl";
import { STAGES, CAREER_START, type Stage, type Step } from "@/data/timeline";
import { periodOf, messageOf, rowsOf } from "@/lib/timeline";
import { yearOf } from "@/lib/yearOf";
import {
    GUT,
    LANES,
    STAGE_PAD,
    TRAINING_ROW_OFFSET,
    TRAINING_ROW_GAP,
    TRAINING_LABEL_GAP,
    TRAINING_LABEL_BASELINE,
    TRAINING_PERIOD_GAP,
    TRAINING_STROKE_WIDTH,
    TRAINING_DASH,
    TRAINING_OPACITY,
    GUTTER_PAD,
    GUTTER_NAME_OFFSET,
    GUTTER_PERIOD_OFFSET,
    LABEL_BOX_HEIGHT,
} from "./layout";

export const TimelineStages = ({
    today,
    getPositionOf,
}: {
    today: Date;
    getPositionOf: (year: number) => number;
}) => {
    const { start: pedaStart, end: pedaEnd } = periodOf(
        "pedagogy",
        STAGES,
        today,
    );
    const { start: devStart, end: devEnd } = periodOf(
        "development",
        STAGES,
        today,
    );
    const t = useTranslations("About.timeline");
    const workExperiences = (Object.entries(STAGES) as [Step, Stage][]).filter(
        ([, stage]) => !stage.training,
    );
    const trainings = (Object.entries(STAGES) as [Step, Stage][]).filter(
        ([, stage]) => stage.training && stage.start >= CAREER_START,
    );
    const studies = (Object.entries(STAGES) as [Step, Stage][]).filter(
        ([, stage]) => stage.training && stage.start < CAREER_START,
    );
    const trainingRows = rowsOf(
        trainings.map(([, stage]) => ({
            start: stage.start.getTime(),
            end: (stage.end ?? today).getTime(),
        })),
    );

    return (
        <g>
            {/* Pedagogy line */}
            <line
                x1={getPositionOf(
                    yearOf(pedaStart < CAREER_START ? CAREER_START : pedaStart),
                )}
                y1={LANES.pedagogy.y}
                x2={getPositionOf(yearOf(pedaEnd))}
                y2={LANES.pedagogy.y}
                className={LANES.pedagogy.stroke}
            />

            {/* Developement line */}
            <line
                x1={getPositionOf(yearOf(devStart))}
                y1={LANES.development.y}
                x2={getPositionOf(yearOf(devEnd))}
                y2={LANES.development.y}
                className={LANES.development.stroke}
            />

            {/* Stages (work experience lines, labels)  */}
            {workExperiences.map(([name, exp]) => {
                const lane = LANES[exp.field];
                const x1 = getPositionOf(yearOf(exp.start)) + STAGE_PAD;
                const x2 = getPositionOf(yearOf(exp.end ?? today)) - STAGE_PAD;
                const foWidth = x2 - x1;

                return (
                    <g key={name}>
                        <line
                            x1={x1}
                            x2={x2}
                            y1={lane.y}
                            y2={lane.y}
                            className={lane.stroke}
                            strokeWidth={3}
                            strokeLinecap="round"
                            opacity={0.5}
                        ></line>
                        <foreignObject
                            x={x1}
                            y={lane.y + lane.boxOffset}
                            width={foWidth}
                            height={LABEL_BOX_HEIGHT}
                            className="overflow-visible"
                        >
                            <div className="flex flex-col">
                                <span className="text-ink font-sans font-medium text-xs leading-title text-balance">
                                    {t(`stages.${name}.name`)}
                                </span>
                                <span className="text-dim font-mono text-2xs leading-ui text-nowrap">
                                    {t(`period`, messageOf(exp, today))}
                                </span>
                            </div>
                        </foreignObject>
                    </g>
                );
            })}

            {trainings.map(([name, training], index) => {
                const lane = LANES[training.field];
                const y =
                    lane.y +
                    TRAINING_ROW_OFFSET +
                    trainingRows[index] * TRAINING_ROW_GAP;
                return (
                    <g key={name}>
                        <line
                            x1={
                                getPositionOf(yearOf(training.start)) +
                                STAGE_PAD
                            }
                            x2={
                                getPositionOf(yearOf(training.end ?? today)) -
                                STAGE_PAD
                            }
                            y1={y}
                            y2={y}
                            className={lane.stroke}
                            strokeWidth={TRAINING_STROKE_WIDTH}
                            strokeDasharray={TRAINING_DASH}
                            strokeLinecap="round"
                            opacity={TRAINING_OPACITY}
                        />
                        <text
                            x={
                                getPositionOf(yearOf(training.start)) -
                                TRAINING_LABEL_GAP
                            }
                            y={y + TRAINING_LABEL_BASELINE}
                            textAnchor="end"
                            className="fill-ink font-sans font-medium text-xs"
                        >
                            {t(`stages.${name}.name`)}
                            <tspan
                                dx={TRAINING_PERIOD_GAP}
                                className="fill-dim font-mono text-2xs"
                            >
                                {t("period", messageOf(training, today))}
                            </tspan>
                        </text>
                    </g>
                );
            })}

            {studies.map(([name, study]) => {
                const lane = LANES[study.field];
                return (
                    <g key={name}>
                        <line
                            x1={GUT + GUTTER_PAD}
                            x2={getPositionOf(yearOf(CAREER_START)) - STAGE_PAD}
                            y1={lane.y}
                            y2={lane.y}
                            className={lane.stroke}
                            strokeWidth={TRAINING_STROKE_WIDTH}
                            strokeDasharray={TRAINING_DASH}
                            strokeLinecap="round"
                            opacity={TRAINING_OPACITY}
                        />
                        <text
                            x={GUT + GUTTER_PAD}
                            y={lane.y + GUTTER_NAME_OFFSET}
                            className="fill-ink font-sans font-medium text-xs"
                        >
                            {t(`stages.${name}.name`)}
                        </text>
                        <text
                            x={GUT + GUTTER_PAD}
                            y={lane.y + GUTTER_PERIOD_OFFSET}
                            className="fill-dim font-mono text-2xs"
                        >
                            {t("period", messageOf(study, today))}
                        </text>
                    </g>
                );
            })}
        </g>
    );
};
