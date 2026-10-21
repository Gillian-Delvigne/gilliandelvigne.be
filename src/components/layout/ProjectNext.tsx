import { getNextProject, type Locale } from "@/content";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

interface ProjectNextProps {
    locale: Locale;
    slug: string;
    title: string;
}

export default async function ProjectNext({
    locale,
    slug,
    title,
}: ProjectNextProps) {
    const next = getNextProject(locale, slug);
    if (!next) return;
    const t = await getTranslations("Projects.next");
    const contactPhrase = t.rich("contact", { title: title });

    return (
        <div>
            <div>
                <p>
                    {t("label")} {next.position}/{next.total}
                </p>
                <h3>{next.project.title}</h3>
                <p>{next.project.dek}</p>
            </div>
            <div>
                <Link href="/portfolio">{t("all")}</Link>
                <Link href="/contact">{contactPhrase}</Link>
            </div>
        </div>
    );
}
