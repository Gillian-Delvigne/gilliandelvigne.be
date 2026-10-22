import type { Station } from "@/types/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import Brand from "./Brand";
import NavList from "./NavList";

interface SiteNavProps {
    stations: Station[];
}

export default function SiteNav({ stations }: SiteNavProps) {
    return (
        <header className="sticky top-0 z-20 border-b border-(--line-soft) bg-bg [--brand-dot:var(--brand-solid)]">
            <div className="site-bar mx-auto grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-(--width-content) gap-5 px-(--gutter) py-5.5">
                <Brand className="justify-self-start" />
                <NavList stations={stations} className="hidden lg:block" />
                <LocaleSwitch cn="hidden lg:flex rounded-badge border border-(--line) px-2 py-0.75 font-mono text-2xs leading-4 font-medium tracking-label uppercase justify-self-end" />
            </div>
        </header>
    );
}
