"use client";

import { useTranslations } from "next-intl";
import { STAGES, CAREER_START, TURNS, type Stage, Step } from "@/data/timeline";
import {
    TimelinePoint,
    periodOf,
    messageOf,
    overlaps,
    rowsOf,
} from "@/lib/timeline";
import { positionOf } from "@/lib/positionOf";
import { yearOf } from "@/lib/yearOf";
import {
    TIMELINE_WIDTH,
    TIMELINE_HEIGHT,
    GUT,
    PAD,
    LANES,
    AXIS_HEIGHT,
    AXIS_START,
    TICK_LENGTH,
    TICK_LABEL_OFFSET,
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
    TURN_CN,
} from "./layout";
import { TimelineFieldLabels } from "./TimelineFieldLabels";
import { TimelinePoints } from "./TimelinePoints";

export const TimelineView = ({
    points,
    today,
}: {
    points: TimelinePoint[];
    today: Date;
}) => {
    const viewbox = `0 0 ${TIMELINE_WIDTH} ${TIMELINE_HEIGHT}`;
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
    const axisLast = Math.floor(yearOf(today));
    const ticks = Array.from(
        {
            length: axisLast - AXIS_START + 1,
        },
        (_, index) => index + AXIS_START,
    );
    const getPositionOf = (year: number) => {
        return (
            GUT +
            positionOf(
                year,
                AXIS_START,
                TIMELINE_WIDTH - GUT - PAD,
                yearOf(today),
            )
        );
    };
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
        trainings.map(([, stage]) => stage),
        today,
    );

    return (
        <div>
            <svg viewBox={viewbox} xmlns="http://www.w3.org/2000/svg">
                <TimelineFieldLabels today={today} />

                {/* Pedagogy line */}
                <line
                    x1={getPositionOf(
                        yearOf(
                            pedaStart < CAREER_START ? CAREER_START : pedaStart,
                        ),
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
                    const isOver = workExperiences.some(
                        ([, other]) =>
                            other.field === exp.field &&
                            other.start < exp.start &&
                            overlaps(exp, other, today),
                    );
                    const labelX = isOver
                        ? getPositionOf(yearOf(exp.end ?? today)) - STAGE_PAD
                        : getPositionOf(yearOf(exp.start)) + STAGE_PAD;
                    const labelAnchor = isOver ? "end" : "start";
                    return (
                        <g key={name}>
                            <line
                                x1={
                                    getPositionOf(yearOf(exp.start)) + STAGE_PAD
                                }
                                x2={
                                    getPositionOf(yearOf(exp.end ?? today)) -
                                    STAGE_PAD
                                }
                                y1={lane.y}
                                y2={lane.y}
                                className={lane.stroke}
                                strokeWidth={3}
                                strokeLinecap="round"
                                opacity={0.5}
                            ></line>
                            <text
                                x={labelX}
                                y={lane.y + lane.stageNameOffset}
                                textAnchor={labelAnchor}
                                className="fill-ink font-sans font-medium text-xs"
                            >
                                {t(`stages.${name}.name`)}
                            </text>
                            <text
                                x={labelX}
                                y={lane.y + lane.stagePeriodOffset}
                                textAnchor={labelAnchor}
                                className="fill-dim font-mono text-2xs"
                            >
                                {t(`period`, messageOf(exp, today))}
                            </text>
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
                                    getPositionOf(
                                        yearOf(training.end ?? today),
                                    ) - STAGE_PAD
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
                                x2={
                                    getPositionOf(yearOf(CAREER_START)) -
                                    STAGE_PAD
                                }
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

                <TimelinePoints
                    points={points}
                    getPositionOf={getPositionOf}
                />

                {/* Graduate axis */}
                <line
                    x1={getPositionOf(AXIS_START)}
                    y1={AXIS_HEIGHT}
                    x2={getPositionOf(yearOf(today))}
                    y2={AXIS_HEIGHT}
                    className="stroke-(--line)"
                />
                {ticks.map((tick) => (
                    <g key={tick}>
                        <line
                            x1={getPositionOf(tick)}
                            x2={getPositionOf(tick)}
                            y1={AXIS_HEIGHT}
                            y2={AXIS_HEIGHT + TICK_LENGTH}
                            className="stroke-(--line)"
                        />
                        <text
                            className="fill-dim font-mono text-2xs"
                            x={getPositionOf(tick)}
                            y={AXIS_HEIGHT + TICK_LABEL_OFFSET}
                            textAnchor="middle"
                        >
                            {tick}
                        </text>
                    </g>
                ))}
            </svg>
            <div>
                <p className="mt-7 font-mono font-medium text-2xs tracking-label uppercase text-dim">
                    {t("turns.heading")}
                    <span className="normal-case tracking-normal opacity-80">
                        {t("turns.hint")}
                    </span>
                </p>
                <ol className="mt-3 grid grid-cols-3 gap-7">
                    {TURNS.map((turn, index) => (
                        <li key={turn.name}>
                            <button className={TURN_CN.btn}>
                                <span className={TURN_CN.nb}>{index + 1}</span>
                                <span className={TURN_CN.period}>
                                    {t("period", messageOf(turn, today))}
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};
