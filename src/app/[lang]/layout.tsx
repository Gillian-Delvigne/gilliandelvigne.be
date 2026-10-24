import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { lang } from "next/root-params";
import { LOCALES } from "@/content";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import SiteNav from "@/components/layout/SiteNav";
import { getNavItems } from "@/data/nav";
import Footer from "@/components/layout/Footer";
import Halo from "@/components/layout/Halo";

export const viewport: Viewport = { viewportFit: "cover" };

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    style: ["normal", "italic"],
    display: "swap",
    axes: ["opsz"],
});

const ibmPlexMono = IBM_Plex_Mono({
    weight: ["400", "500", "600"],
    variable: "--font-ibm-mono",
    subsets: ["latin"],
});

export const generateStaticParams = () => {
    return LOCALES.map((lang) => ({ lang }));
};

export const dynamicParams = false;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
    const language = await lang();
    const navItems = await getNavItems();

    return (
        <html
            lang={language}
            className={`${inter.variable} ${ibmPlexMono.variable} min-h-screen antialiased scrollbar-gutter-stable`}
        >
            <body className="flex flex-col min-h-screen">
                <Halo />
                <NextIntlClientProvider>
                    <SiteNav items={navItems} />
                    <main className="grow">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
