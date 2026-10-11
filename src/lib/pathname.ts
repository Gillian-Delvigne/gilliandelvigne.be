import { Pathname, routing } from "@/i18n/routing";

const isDynamic = (item: string): boolean => {
    return item.startsWith("[") && item.endsWith("]");
};

export const getRoutingPathname = (path: string): Pathname | undefined => {
    const templates = Object.keys(routing.pathnames) as Pathname[];
    if ((templates as string[]).includes(path)) return path as Pathname;
    const segments = path.split("/").slice(1);
    for (const template of templates) {
        const base = template.split("/").slice(1);
        if (
            segments.length === base.length &&
            segments.every(
                (segment, i) => segment === base[i] || isDynamic(base[i]),
            )
        )
            return template;
    }
};
