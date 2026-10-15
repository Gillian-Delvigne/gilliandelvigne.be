import type { Project } from "@/content";
import type { Profile } from "@/types/difficulty";
import { AXES, MAX_LEVEL } from "@/content/difficulty";
import { getTranslations } from "next-intl/server";

const HEAD =
    "font-mono font-semibold text-[0.63rem] uppercase tracking-[0.08em] text-dim pr-3 pb-2.25 border-b border-(--line)";
const CELL = "py-2.25 pr-3 align-top border-b border-(--line-soft)";

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
                    <tr key={axis}>
                        <th
                            scope="row"
                            className={`${CELL} w-[1%] text-left font-semibold text-ink min-[860px]:whitespace-nowrap`}
                        >
                            {t(`axes.${axis}`)}
                        </th>
                        <td className={`${CELL} text-dim`}>
                            {evidence?.[axis]}
                        </td>
                        <td
                            className={`${CELL} w-[1%] whitespace-nowrap text-right`}
                        >
                            <span className="text-dim">
                                {t(`levels.${profile[axis]}.name`)}
                            </span>
                            <span aria-hidden="true"> · </span>
                            <span className="sr-only">, </span>
                            <span className="font-mono text-[0.8rem] font-semibold text-brand">
                                {profile[axis]}
                                <span aria-hidden="true"> / </span>
                                <span className="sr-only"> {t("outOf")} </span>
                                {MAX_LEVEL}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
