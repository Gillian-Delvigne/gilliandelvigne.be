import { useTranslations } from "next-intl";
import { TURNS } from "@/data/timeline";
import { messageOf } from "@/lib/timeline";
import { TURN_CN } from "./layout";

export const TimelineTurns = ({ today }: { today: Date }) => {
    const t = useTranslations("About.timeline");
    return (
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
    );
};
