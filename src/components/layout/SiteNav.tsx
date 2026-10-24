import type { NavItem } from "@/types/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import Brand from "./Brand";
import NavList from "./NavList";
import MobileMenu from "./MobileMenu";

interface SiteNavProps {
    items: NavItem[];
}

export default function SiteNav({ items }: SiteNavProps) {
    return (
        <header className="sticky top-0 z-20 border-b border-(--line-soft) bg-bg [--brand-dot:var(--brand-solid)]">
            <div className="site-bar mx-auto grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-(--width-content) gap-5 px-(--gutter) py-5.5">
                <Brand className="justify-self-start" />
                <NavList items={items} className="hidden lg:block" />
                <LocaleSwitch className="hidden lg:flex justify-self-end" />
                <MobileMenu
                    className="col-start-3 justify-self-end lg:hidden"
                    footer={<LocaleSwitch />}
                >
                    <NavList items={items} vertical />
                </MobileMenu>
            </div>
        </header>
    );
}
