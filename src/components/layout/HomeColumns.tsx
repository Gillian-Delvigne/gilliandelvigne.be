import { getTranslations } from "next-intl/server";
import { Column } from "./Column";

const HomeColumns = async () => {
    const t = await getTranslations("Home");
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Column
                title={t("pedagogy.title")}
                items={t.raw("pedagogy.items")}
            />
            <Column
                title={t("development.title")}
                items={t.raw("development.items")}
            />
        </div>
    );
};

export default HomeColumns;
