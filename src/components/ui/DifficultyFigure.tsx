import { useTranslations } from "next-intl";
import { AXES } from "@/content/difficulty";
import type { AxisLabels, Axis, Profile } from "@/types/difficulty";
import { RevealOnView } from "@/components/ui/RevealOnView";
import DifficultyHex from "@/components/ui/DifficultyHex";
import DifficultyLegendTrigger from "@/components/ui/DifficultyLegendTrigger";

interface DifficultyFigureProps {
    profile: Profile;
    highlight?: Axis;
}

const DifficultyFigure = ({ profile, highlight }: DifficultyFigureProps) => {
    const t = useTranslations("Difficulty");
    const labels = Object.fromEntries(
        AXES.map((axis) => [axis, t(`axes.${axis}`)]),
    ) as AxisLabels;

    return (
        <div className="grid justify-items-center gap-2">
            <RevealOnView>
                <DifficultyHex
                    profile={profile}
                    labels={labels}
                    animated
                    className="h-auto w-full"
                    highlight={highlight}
                />
            </RevealOnView>
            <DifficultyLegendTrigger label={t("legend.trigger")} />
        </div>
    );
};

export default DifficultyFigure;
