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
        bg: "bg-(--mute-surface)",
        text: "text-mute",
        border: "border-(--mute-border)",
        solid: "bg-(--mute-solid)",
        shadow: "shadow-(--mute-shadow)",
    },
    archived: {
        bg: "bg-(--mute-surface)",
        text: "text-mute",
        border: "border-(--mute-border)",
        solid: "bg-(--mute-solid)",
        shadow: "shadow-(--mute-shadow)",
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
            className={cn(`inline-flex items-center gap-1.5 rounded-badge border px-2.25 py-0.5 font-mono text-2xs font-medium whitespace-nowrap ${style.bg} ${style.text} ${style.border} ${style.shadow}`, className)}
        >
            <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${style.solid}`}
            />
            {t(status)}
        </span>
    );
}
