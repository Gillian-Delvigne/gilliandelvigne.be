import { getTranslations } from "next-intl/server";
import { AXES } from "@/content/difficulty";
import type { AxisLabels, Profile } from "@/types/difficulty";
import { RevealOnView } from "@/components/ui/RevealOnView";
import DifficultyHex from "@/components/ui/DifficultyHex";
import DifficultyLegendTrigger from "@/components/ui/DifficultyLegendTrigger";

const DifficultyFigure = async ({ profile }: { profile: Profile }) => {
    const t = await getTranslations("Difficulty");
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
                />
            </RevealOnView>
            <DifficultyLegendTrigger label={t("legend.trigger")} />
        </div>
    );
};

export default DifficultyFigure;
