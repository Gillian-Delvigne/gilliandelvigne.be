import type { Numeral, Crumb } from "@/types/navigation";

type PageFrameBase = {
    children: React.ReactNode;
    dek?: string;
};

export interface EyebrowProps {
    numeral: Numeral;
    name: string;
    tag?: string;
}

type AsStation = PageFrameBase & {
    eyebrow: EyebrowProps;
    title?: string;
    breadcrumb?: Crumb[];
};

type AsDetail = PageFrameBase & {
	eyebrow?: never;
    title: string;
    breadcrumb: Crumb[];
};

export type PageFrameProps = AsStation | AsDetail;
