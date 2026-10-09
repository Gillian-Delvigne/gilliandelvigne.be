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

const VARIANTS: Record<Variant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    quiet: "btn-quiet",
};

export default function Button({
    children,
    className,
    variant = "secondary",
    ...rest
}: BtnProps) {
    const classes = cn("btn", VARIANTS[variant], className);

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
