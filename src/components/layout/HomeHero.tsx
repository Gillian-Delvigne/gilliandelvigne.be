import { getTranslations } from "next-intl/server";
import { getNavItem } from "@/data/nav";
import { SITE } from "@/data/site";
import Button from "../ui/Button";

const HomeHero = async () => {
    const t = await getTranslations("Home");
    const intro = (await getNavItem("home")).dek;
    return (
        <div className="pt-10 pb-7">
            <p>{t("kicker")}</p>
            <h1>{SITE.name}</h1>
            <p>{intro}</p>
            <div className="flex">
                <Button href="/portfolio">{t("cta.projects")}</Button>
                <Button href="/about">{t("cta.about")}</Button>
            </div>
        </div>
    );
};

export default HomeHero;
