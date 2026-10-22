import { SITE } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import BrandMark from "./BrandMark";

export default function Brand({ className }: { className: string }) {
    return (
        <Link
            href="/"
            aria-label={SITE.name}
            className={cn("rounded-xs text-ink", className)}
        >
            <BrandMark className="h-brand w-auto site-brand" />
        </Link>
    );
}
