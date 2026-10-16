import { Project } from "@/content";
import { cn } from "@/lib/cn";
import { getTranslations } from "next-intl/server";

type Tone = { bg: string; text: string; border: string; solid: string };

const styles: Record<Project["status"], Tone> = {
    live: {
        bg: "bg-(--ok-surface)",
        text: "text-ok",
        border: "border-(--ok-border)",
        solid: "bg-(--ok-solid)",
    },
    partial: {
        bg: "bg-(--ok-surface)",
        text: "text-ok",
        border: "border-(--ok-border)",
        solid: "bg-(--ok-solid)",
    },
    wip: {
        bg: "bg-(--warn-surface)",
        text: "text-warn",
        border: "border-(--warn-border)",
        solid: "bg-(--warn-solid)",
    },
    private: {
        bg: "bg-(--mute-surface)",
        text: "text-mute",
        border: "border-(--mute-border)",
        solid: "bg-(--mute-solid)",
    },
    archived: {
        bg: "bg-(--mute-surface)",
        text: "text-mute",
        border: "border-(--mute-border)",
        solid: "bg-(--mute-solid)",
    },
};

export default async function StatusBadge({
    status,
	className
}: {
    status: Project["status"];
	className?: string;
}) {
    const t = await getTranslations("Status");
    const style: Tone = styles[status];
    return (
        <span
            className={cn(`inline-flex items-center gap-1.5 rounded-[5px] border px-2.25 py-0.5 font-mono text-[0.66rem] font-medium whitespace-nowrap ${style.bg} ${style.text} ${style.border}`, className)}
        >
            <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${style.solid}`}
            />
            {t(status)}
        </span>
    );
}
