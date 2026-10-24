import type { Crumb } from "@/types/navigation";

export interface PageFrameProps {
    children: React.ReactNode;
    title: string;
    dek?: string;
    breadcrumb?: Crumb[];
}
