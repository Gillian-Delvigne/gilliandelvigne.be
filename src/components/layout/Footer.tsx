import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { TailPiece } from "./TailPiece";
import { HandSignature } from "./HandSignature";

const ANNEE = "MMXXVI";
const LIEN =
    "text-parchment border-b pb-0.5 no-underline " +
    "border-[color-mix(in_srgb,var(--color-parchment)_35%,transparent)] " +
    "hover:text-accent-on-dark hover:border-gilt " +
    "transition-colors duration-(--dur-micro)";

export default async function Footer() {
    const t = await getTranslations("Footer");

    return (
        <>
            <TailPiece sentence={t("colophon")} />
            <footer data-surface="dark" className="footer-material text-2xs font-bold">
                <div className="mx-auto flex max-w-208 flex-col items-center gap-5.5 text-center">
                    <HandSignature name={SITE.author} />


                    <ul className="font-mono tracking-label flex gap-7 uppercase mb-3">
                        <li>
                            <a
                                className={LIEN}
                                href={SITE.github}
                                target="_blank"
								rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className={LIEN}
                                href={SITE.linkedin}
                                target="_blank"
								rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <Link className={LIEN} href="/contact">
                                {t("missive")}
                            </Link>
                        </li>
                    </ul>
                    <p
                        className="font-mono tracking-label text-3xs text-parchment
                                  leading-[2.1] uppercase opacity-72"
                    >
                        {t("tagline")}
                        <br />
                        Next 16 · React 19 · Tailwind v4 · Velite
                        <br />
                        {t("location")}, {ANNEE}
                    </p>
                </div>
            </footer>
        </>
    );
}
