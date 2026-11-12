import { Project } from "@/content";
import { cn } from "@/lib/cn";
import { getTranslations } from "next-intl/server";

type Tone = {
    bg: string;
    text: string;
    border: string;
    solid: string;
    shadow: string;
};

const styles: Record<Project["status"], Tone> = {
    live: {
        bg: "bg-(--ok-surface)",
        text: "text-ok",
        border: "border-(--ok-border)",
        solid: "bg-(--ok-solid)",
        shadow: "shadow-(--ok-shadow)",
    },
    partial: {
        bg: "bg-(--ok-surface)",
        text: "text-ok",
        border: "border-(--ok-border)",
        solid: "bg-(--ok-solid)",
        shadow: "shadow-(--ok-shadow)",
    },
    wip: {
        bg: "bg-(--warn-surface)",
        text: "text-warn",
        border: "border-(--warn-border)",
        solid: "bg-(--warn-solid)",
        shadow: "shadow-(--warn-shadow)",
    },
    private: {
        bg: "bg-(--private-surface)",
        text: "text-private",
        border: "border-(--private-border)",
        solid: "bg-(--private-solid)",
        shadow: "shadow-(--private-shadow)",
    },
    archived: {
        bg: "bg-(--archived-surface)",
        text: "text-archived",
        border: "border-(--archived-border)",
        solid: "bg-(--archived-solid)",
        shadow: "shadow-(--archived-shadow)",
    },
};

export default async function StatusBadge({
    status,
    className,
}: {
    status: Project["status"];
    className?: string;
}) {
    const t = await getTranslations("Status");
    const style: Tone = styles[status];
    return (
        <span
            className={cn(
                `w-fit inline-flex items-center gap-1.5 rounded-badge border px-2.25 py-0.5 font-mono text-2xs font-medium whitespace-nowrap ${style.bg} ${style.text} ${style.border} ${style.shadow}`,
                className,
            )}
        >
            <span className="sr-only">{t("label")}</span>
            <span>
                <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${style.solid}`}
                />
                {t(status)}
            </span>
        </span>
    );
}
