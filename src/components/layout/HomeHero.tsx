import { getTranslations } from "next-intl/server";
import { getNavItem } from "@/data/nav";
import { SITE } from "@/data/site";
import Button from "../ui/Button";

const HomeHero = async () => {
    const t = await getTranslations("Home");
    const intro = (await getNavItem("home")).dek;
    return (
        <div className="pt-14.5">
            <p className="mb-2.5 font-mono text-2xs font-semibold tracking-label text-dim uppercase">
                {t.rich("kicker", {
                    dot: () => (
                        <span
                            aria-hidden="true"
                            className="inline-block size-0.75 rounded-full bg-brand align-middle"
                        />
                    ),
                    country: (chunks) => (
                        <span className="max-sm:hidden">{chunks}</span>
                    ),
                })}
            </p>
            <h1 className="relative isolate mb-3.5 w-fit text-4xl leading-display font-bold tracking-display before:pointer-events-none before:absolute before:-inset-x-6 before:-inset-y-10 before:-z-10 before:bg-(image:--glow-gradient) before:content-['']">
                {SITE.name}
            </h1>
            <p className="mb-6.5 max-w-(--measure-lead) text-lg leading-body text-dim">
                {intro}
            </p>
            <div className="flex flex-wrap gap-2.75">
                <Button variant="primary" href="/portfolio">
                    {t("cta.projects")}
                </Button>
                <Button variant="secondary" href="/about">
                    {t("cta.about")}
                </Button>
            </div>
        </div>
    );
};

export default HomeHero;
