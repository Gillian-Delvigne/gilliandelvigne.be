import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import FeaturedProjects from "@/components/layout/FeaturedProjects";
import HomeHero from "@/components/layout/HomeHero";
import HomeColumns from "@/components/layout/HomeColumns";

const Home = async ({ params }: PageProps<"/[lang]">) => {
    const { lang } = await params;
    if (!isLocale(lang)) return notFound();
    return (
        <div className="shell flex flex-col gap-28 pb-24 md:pb-32">
            <HomeHero />
            <FeaturedProjects locale={lang} />
            <HomeColumns />
        </div>
    );
};

export default Home;
