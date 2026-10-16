import type { Project } from "@/content";
import type { Profile } from "@/types/difficulty";
import { AXES, LEVELS, MAX_LEVEL } from "@/content/difficulty";
import { getTranslations } from "next-intl/server";

const HEAD =
    "font-mono font-semibold text-[0.63rem] uppercase tracking-[0.08em] text-dim pr-3 pb-2.25 border-b border-(--line)";
const CELL =
    "py-2.25 pr-3 align-top border-b border-(--line-soft) group-last:border-b-0 group-last:pb-0";

type DifficultyTableProps = {
    profile: Profile;
    evidence: Project["evidence"];
};

export default async function DifficultyTable({
    profile,
    evidence,
}: DifficultyTableProps) {
    const t = await getTranslations("Difficulty");
    return (
        <table className="w-full border-collapse text-[0.85rem] mt-2">
            <thead>
                <tr>
                    <th scope="col" className={`${HEAD} text-left`}>
                        {t("axis")}
                    </th>
                    <th scope="col" className={`${HEAD} text-left`}>
                        {t("evidence")}
                    </th>
                    <th scope="col" className={`${HEAD} text-right`}>
                        {t("value")}
                    </th>
                </tr>
            </thead>
            <tbody>
                {AXES.map((axis) => (
                    <tr key={axis} className="group">
                        <th
                            scope="row"
                            className={`${CELL} w-[1%] text-left font-semibold text-ink min-[860px]:whitespace-nowrap`}
                        >
                            {t(`axes.${axis}`)}
                        </th>
                        <td className={`${CELL} text-dim`}>
                            {evidence?.[axis]}
                        </td>
                        <td className={`${CELL} w-[1%] whitespace-nowrap`}>
                            <div className="flex flex-col items-end">
                                <span
                                    className={`${profile[axis] > 0 ? "text-brand font-medium" : "text-dim font-normal"} text-[0.75rem] mb-1.5`}
                                >
                                    {t(`levels.${profile[axis]}.name`)}
                                </span>
                                <span className="sr-only">{`, ${profile[axis]} ${t("outOf")} ${MAX_LEVEL}`}</span>
                                <div className="flex gap-0.5">
                                    {LEVELS.slice(1).map((level) => (
                                        <span
                                            key={level}
                                            aria-hidden="true"
                                            className={`w-3 h-0.75 rounded-xs ${profile[axis] >= level ? "bg-(--brand-solid)" : "bg-(--gauge-off)"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
