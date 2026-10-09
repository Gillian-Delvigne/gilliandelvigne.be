import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} from "next/constants";

const AsyncConfigWithVelite = async (phase: string): Promise<NextConfig> => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isBuild = phase === PHASE_PRODUCTION_BUILD;

    if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
        process.env.VELITE_STARTED = "1";
        const { build } = await import("velite");
        await build({ watch: isDev, clean: !isDev, strict: !isDev });
    }

    const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

    const nextConfig: NextConfig = {
        /* config options here */
    };
    return withNextIntl(nextConfig);
};

export default AsyncConfigWithVelite;
