import { getNavItem } from "@/data/nav";
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
        <PageFrame eyebrow={{ numeral: pageInfo.numeral, label: pageInfo.label }} dek={pageInfo.dek}>
            <ContactForm submitAction={handleSubmit.bind(null, lang)} />
        </PageFrame>
    );
}
