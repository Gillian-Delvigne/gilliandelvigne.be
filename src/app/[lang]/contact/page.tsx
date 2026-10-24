import { getNavItem } from "@/data/nav";
import getCrumbs from "@/data/crumbs";
import PageFrame from "@/components/layout/PageFrame";
import ContactForm from "@/components/forms/ContactForm";
import { isLocale } from "@/content";
import handleSubmit from "@/app/[lang]/contact/action";

export default async function Contact({
    params,
}: PageProps<"/[lang]/contact">) {
    const pageInfo = await getNavItem("contact");
    const { lang } = await params;
    if (!isLocale(lang)) return;

    return (
        <PageFrame
            title={pageInfo.label}
            dek={pageInfo.dek}
            breadcrumb={await getCrumbs("contact")}
        >
            <ContactForm submitAction={handleSubmit.bind(null, lang)} />
        </PageFrame>
    );
}
