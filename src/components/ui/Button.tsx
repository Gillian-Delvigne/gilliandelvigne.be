import {
    ReactNode,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    ComponentProps,
} from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";

type BtnBase = {
    className?: string;
    variant?: Variant;
    children: ReactNode;
};

interface AsButton extends BtnBase, ButtonHTMLAttributes<HTMLButtonElement> {
    href?: undefined;
    children: ReactNode;
}
/* Since `pathnames`, an internal link is no longer a free string: it is the
   closed union <Link> accepts. An outbound link stays an absolute URL. */
type InternalHref = ComponentProps<typeof Link>["href"];
type ExternalHref = `http${string}`;

const isExternal = (href: unknown): href is ExternalHref =>
    typeof href === "string" && href.startsWith("http");

interface AsLink
    extends BtnBase, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: InternalHref | ExternalHref;
    children: ReactNode;
}

type BtnProps = AsButton | AsLink;

const BASE =
    "inline-flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-4 py-2.25 text-sm font-medium transition-colors duration-(--dur-micro) active:translate-y-px aria-disabled:cursor-not-allowed aria-disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
    primary: "bg-ink text-bg hover:bg-ink/90",
    secondary:
        "border-(--line) text-ink hover:border-(--brand-border) hover:text-brand",
    quiet: "text-dim hover:text-ink",
};

export default function Button({
    children,
    className,
    variant = "secondary",
    ...rest
}: BtnProps) {
    const classes = cn(BASE, VARIANTS[variant], className);

    if (rest.href === undefined) {
        const { type, ...props } = rest;
        return (
            <button type={type ?? "button"} className={classes} {...props}>
                {children}
            </button>
        );
    }

    const { href, ...props } = rest as AsLink;

    if (!isExternal(href))
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...props}
        >
            {children}
        </a>
    );
}
