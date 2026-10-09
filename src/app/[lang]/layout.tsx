import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { lang } from "next/root-params";
import { LOCALES } from "@/content";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import MapBackground from "@/components/layout/MapBackground";
import CompassNav from "@/components/layout/CompassNav";
import { getAllStations } from "@/data/station";
import { CompassMobile } from "@/components/layout/CompassMobile";
import Footer from "@/components/layout/Footer";
import { SvgDefs } from "@/components/layout/SvgDefs";

export const viewport: Viewport = { viewportFit: "cover" };

const fraunces = Fraunces({
    variable: "--font-fraunces",
    subsets: ["latin"],
    style: ["normal", "italic"],
    display: "swap",
    axes: ["SOFT", "WONK", "opsz"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const generateStaticParams = () => {
    return LOCALES.map((lang) => ({ lang }));
};

export const dynamicParams = false;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
    const language = await lang();
    const stations = await getAllStations();

    return (
        <html
            lang={language}
            className={`${fraunces.variable} ${jetbrainsMono.variable} min-h-screen antialiased scrollbar-gutter-stable`}
        >
            <body className="flex flex-col min-h-screen">
				<SvgDefs/>
                <MapBackground />
                <NextIntlClientProvider>
                    <CompassNav stations={stations} />
                    <CompassMobile stations={stations} />
                    <main className="grow">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
