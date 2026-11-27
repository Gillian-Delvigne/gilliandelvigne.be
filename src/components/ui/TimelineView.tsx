"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { STAGES, CAREER_START, TURNS, type Stage, Step } from "@/data/timeline";
import { FIELDS, type Field } from "@/content/fields";
import {
    TimelinePoint,
    periodOf,
    messageOf,
    overlaps,
    rowsOf,
} from "@/lib/timeline";
import { positionOf } from "@/lib/positionOf";
import { yearOf } from "@/lib/yearOf";
import { yearsSince } from "@/lib/yearsSince";

const TIMELINE_WIDTH = 1080;
const TIMELINE_HEIGHT = 320;
const GUT = 150;
const PAD = 20;
interface Lane {
    y: number;
    fill: string;
    stroke: string;
    stageNameOffset: number;
    stagePeriodOffset: number;
}
const LANES: Record<Field, Lane> = {
    pedagogy: {
        y: 70,
        fill: "fill-ink",
        stroke: "stroke-ink",
        stageNameOffset: -30,
        stagePeriodOffset: -16,
    },
    development: {
        y: 150,
        fill: "fill-brand",
        stroke: "stroke-brand",
        stageNameOffset: 24,
        stagePeriodOffset: 38,
    },
};
const AXIS_HEIGHT = 270;
const CIRCLE_RADIUS = 5;
const AXIS_START = Math.floor(yearOf(CAREER_START));
const TICK_LENGTH = 4;
const TICK_LABEL_OFFSET = 20;
const LINE_TITLE_OFFSET = 2;
const LINE_SUBTITLE_OFFSET = 12;
const STAGE_PAD = 4;
const TRAINING_ROW_OFFSET = 64;
const TRAINING_ROW_GAP = 18;
const TRAINING_LABEL_GAP = 8;
const TRAINING_LABEL_BASELINE = 4;
const TRAINING_PERIOD_GAP = 6;
const TRAINING_STROKE_WIDTH = 2.5;
const TRAINING_DASH = "2 5";
const TRAINING_OPACITY = 0.6;
const GUTTER_PAD = 2;
const GUTTER_NAME_OFFSET = 24;
const GUTTER_PERIOD_OFFSET = 38;
const TURN_CN = {
    btn: "group flex w-full gap-2.5 pt-3.5 text-left cursor-pointer border-t border-(--line-soft) transition-colors duration-150 aria-pressed:border-t-warm focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 focus-visible:rounded-sm",
    nb: "grid size-5 shrink-0 place-items-center rounded-full border border-(--line-abs) font-mono font-semibold text-2xs text-dim transition-colors duration-150 group-aria-pressed:border-warm group-aria-pressed:text-warm",
    period: "font-mono font-medium text-2xs text-dim",
    title: "block font-semibold text-sm leading-ui",
    body: "block mt-1 text-sm leading-body text-dim",
};

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
    const subtitleValues: Record<Field, Record<string, number>> = {
        pedagogy: {
            start: CAREER_START.getUTCFullYear(),
            end: pedaEnd.getUTCFullYear(),
            years: yearsSince(CAREER_START, pedaEnd),
        },
        development: { start: devStart.getUTCFullYear() },
    };
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
                {/* Fields labels (title and subtitle) */}
                {FIELDS.map((field) => (
                    <g key={field}>
                        <text
                            x={0}
                            y={LANES[field].y - LINE_TITLE_OFFSET}
                            className={cn(
                                LANES[field].fill,
                                "uppercase text-2xs font-medium font-mono tracking-label",
                            )}
                        >
                            {t(`field.${field}.title`)}
                        </text>
                        <text
                            x={0}
                            y={LANES[field].y + LINE_SUBTITLE_OFFSET}
                            className="fill-dim font-mono text-2xs"
                        >
                            {t.rich(`field.${field}.subtitle`, {
                                ...subtitleValues[field],
                                dot: () => (
                                    <tspan
                                        aria-hidden="true"
                                        className="fill-brand"
                                    >
                                        ·
                                    </tspan>
                                ),
                            })}
                        </text>
                    </g>
                ))}
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

                {/* Project points */}
                {points.map((p) => (
                    <circle
                        key={p.slug}
                        cx={getPositionOf(p.position)}
                        cy={LANES[p.field].y}
                        r={CIRCLE_RADIUS}
                        className={LANES[p.field].fill}
                    />
                ))}

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
