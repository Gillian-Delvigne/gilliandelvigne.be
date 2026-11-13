import { Icon, Node } from "./Icon";

type IconProps = { className?: string };

export const IconDemo = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M2 3 H22 V15.75 H2 Z" />
        <path d="M12 15.75 V20.5" />
        <path d="M8 20.5 H16" />
        <Node cx={12} cy={9.38} />
    </Icon>
);

export const IconGallery = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M3 4 H21 V20 H3 Z" />
        <path d="M3 16 L6.5 12.5 L14 20" />
        <Node cx={14.63} cy={10.38} />
    </Icon>
);

export const IconChevronLeft = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M16.88 4.64 L4.13 12 L16.88 19.36" />
        <Node cx={16.88} cy={12} />
    </Icon>
);

export const IconChevronRight = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M7.13 4.64 L19.88 12 L7.13 19.36" />
        <Node cx={7.13} cy={12} />
    </Icon>
);

export const IconExternal = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M11 3 H3 V21 H21 V13" />
        <path d="M13.83 10.17 L21 3" />
        <path d="M15 3 H21 V9" />
        <Node cx={9.38} cy={14.63} />
    </Icon>
);

export const IconExpand = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M3 9.5 V3 H9.5" />
        <path d="M14.5 3 H21 V9.5" />
        <path d="M21 14.5 V21 H14.5" />
        <path d="M9.5 21 H3 V14.5" />
        <Node cx={12} cy={12} />
    </Icon>
);

export const IconClose = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M3.5 3.5 L7.55 7.55" />
        <path d="M16.45 16.45 L20.5 20.5" />
        <path d="M20.5 3.5 L16.45 7.55" />
        <path d="M7.55 16.45 L3.5 20.5" />
        <Node cx={12} cy={12} />
    </Icon>
);

export const IconMenu = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M3 5.63 H21" />
        <path d="M3 12 H12.83" />
        <path d="M3 18.38 H21" />
        <Node cx={19.13} cy={12} />
    </Icon>
);

export const IconAll = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M13.5 3 H21 V10.5 H13.5 Z" />
        <path d="M3 13.5 H10.5 V21 H3 Z" />
        <path d="M13.5 13.5 H21 V21 H13.5 Z" />
        <Node cx={6.75} cy={6.75} />
    </Icon>
);
