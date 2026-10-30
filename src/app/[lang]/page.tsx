import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import FeaturedProjects from "@/components/layout/FeaturedProjects";
import HomeHero from "@/components/layout/HomeHero";
import HomeColumns from "@/components/layout/HomeColumns";

const Home = async ({ params }: PageProps<"/[lang]">) => {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();
    return (
        <div className="shell pb-24 md:pb-32">
            <HomeHero />
            <hr className="my-11 border-(--line-soft)" />
            <FeaturedProjects locale={lang} />
            <hr className="my-11 border-(--line-soft)" />
            <HomeColumns />
        </div>
    );
};

export default Home;
