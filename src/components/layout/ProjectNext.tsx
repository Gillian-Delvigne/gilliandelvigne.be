import { getNextProject, type Locale } from "@/content";
import { getProfile } from "@/content/difficulty";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import DifficultyHex from "@/components/ui/DifficultyHex";

interface ProjectNextProps {
    locale: Locale;
    slug: string;
    title: string;
}

const RANK_DIGITS = 2;

const QUIET_LINK =
    "border-b border-transparent text-dim transition-colors duration-(--dur-micro) hover:border-(--line) hover:text-ink";

export default async function ProjectNext({
    locale,
    slug,
    title,
}: ProjectNextProps) {
    const next = getNextProject(locale, slug);
    if (!next) return null;
    const t = await getTranslations("Projects.next");
    const profile = getProfile(next.project.translationKey);
    const rank = String(next.position).padStart(RANK_DIGITS, "0");
    const total = String(next.total).padStart(RANK_DIGITS, "0");

    return (
        <nav aria-label={t("aria")}>
            <div
                className="group relative grid grid-cols-[1fr_auto] items-center gap-7 rounded-card border border-(--line) bg-surface px-7 py-6 shadow-card
                           transition-colors duration-(--dur-micro) hover:border-(--brand-border)
                           max-md:gap-4 max-md:px-5 max-md:py-5"
            >
                <div>
                    <p className="mb-2.5 flex items-baseline gap-3">
                        <span className="font-mono text-2xs font-medium tracking-label text-dim uppercase">
                            {t("label")}
                        </span>
                        <span className="font-mono text-xs font-semibold text-dim">
                            <span className="text-ink">{rank}</span> /{" "}
                            {total}
                        </span>
                    </p>
                    <p className="mb-1.5 text-lg leading-title font-semibold tracking-title text-ink">
                        <Link
                            href={{
                                pathname: "/portfolio/[slug]",
                                params: { slug: next.project.slug },
                            }}
                            className="focus-visible:outline-none
                                       after:absolute after:inset-0 after:rounded-card after:content-['']
                                       focus-visible:after:outline-2 focus-visible:after:outline-(--color-brand)
                                       focus-visible:after:outline-offset-3"
                        >
                            {next.project.title}
                            <span className="whitespace-nowrap">
                                {"\u00a0"}
                                <span
                                    aria-hidden="true"
                                    className="inline-block transition-transform duration-(--dur-micro) ease-out group-hover:translate-x-0.75"
                                >
                                    →
                                </span>
                            </span>
                        </Link>
                    </p>
                    <p className="text-sm leading-body text-dim">
                        {next.project.dek}
                    </p>
                </div>
                {profile && (
                    <DifficultyHex
                        profile={profile}
                        className="size-21 max-md:size-16"
                    />
                )}
            </div>

            <div className="mt-4.5 flex flex-wrap justify-between gap-x-4 gap-y-2 text-sm">
                <Link href="/portfolio" className={QUIET_LINK}>
                    <span aria-hidden="true">← </span>
                    {t("all")}
                </Link>
                <Link
                    href="/contact"
                    className="border-b border-transparent text-brand transition-colors duration-(--dur-micro) hover:border-(--brand-border)"
                >
                    {t("contact", { title })}
                </Link>
            </div>
        </nav>
    );
}
