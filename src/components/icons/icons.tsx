import type { CSSProperties } from "react";
import { Icon } from "./Icon";

type IconProps = { className?: string };

export const IconDemo = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M28,4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4ZM18,28H14V24h4Zm10-6H4V6H28Z" />
    </Icon>
);

export const IconGallery = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M19,14a3,3,0,1,0-3-3A3,3,0,0,0,19,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,19,10Z" />
        <path d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,22H6V20l5-5,5.59,5.59a2,2,0,0,0,2.82,0L21,19l5,5Zm0-4.83-3.59-3.59a2,2,0,0,0-2.82,0L18,19.17l-5.59-5.59a2,2,0,0,0-2.82,0L6,17.17V6H26Z" />
    </Icon>
);

export const IconChevronLeft = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M10 16 20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z" />
    </Icon>
);

export const IconChevronRight = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M22 16 12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z" />
    </Icon>
);

export const IconArrowRight = ({ className }: IconProps) => (
    <Icon className={className} viewBox="0 0 44 32">
        <path d="M30 6 28.57 7.393 36.15 15 4 15 4 17 36.15 17 28.57 24.573 30 26 40 16 30 6z" />
    </Icon>
);

export const IconExternal = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z" />
        <path d="M20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z" />
    </Icon>
);

export const IconAll = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M12,4H6A2,2,0,0,0,4,6v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V6A2,2,0,0,0,12,4Zm0,8H6V6h6Z" />
        <path d="M26,4H20a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,8H20V6h6Z" />
        <path d="M12,18H6a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V20A2,2,0,0,0,12,18Zm0,8H6V20h6Z" />
        <path d="M26,18H20a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V20A2,2,0,0,0,26,18Zm0,8H20V20h6Z" />
    </Icon>
);

export const IconExpand = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M20 2 20 4 26.586 4 18 12.582 19.414 14 28 5.414 28 12 30 12 30 2 20 2z" />
        <path d="M14 19.416 12.592 18 4 26.586 4 20 2 20 2 30 12 30 12 28 5.414 28 14 19.416z" />
    </Icon>
);

export const IconCollapse = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M4 18 4 20 10.586 20 2 28.582 3.414 30 12 21.414 12 28 14 28 14 18 4 18z" />
        <path d="M30 3.416 28.592 2 20 10.586 20 4 18 4 18 14 28 14 28 12 21.414 12 30 3.416z" />
    </Icon>
);

export const IconClose = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M17.4141 16 26 7.4141 24.5859 6 16 14.5859 7.4143 6 6 7.4141 14.5859 16 6 24.5859 7.4143 26 16 17.4141 24.5859 26 26 24.5859 17.4141 16z" />
    </Icon>
);

export const IconPlay = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,1.4819-.8763l20,11a1,1,0,0,1,0,1.7525l-20,11A1.0005,1.0005,0,0,1,7,28Z" />
    </Icon>
);

export const IconPause = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M12,6H10A2,2,0,0,0,8,8V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" />
        <path d="M22,6H20a2,2,0,0,0-2,2V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" />
    </Icon>
);

export const IconSound = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M27.16,8.08,25.63,9.37a10,10,0,0,1-.29,13.23L26.81,24a12,12,0,0,0,.35-15.88Z" />
        <path d="M21.58,12a6,6,0,0,1-.18,7.94l1.47,1.36a8,8,0,0,0,.23-10.59Z" />
        <path d="M18,30a1,1,0,0,1-.71-.3L9.67,22H3a1,1,0,0,1-1-1H2V11a1,1,0,0,1,1-1H9.67l7.62-7.7a1,1,0,0,1,1.41,0A1,1,0,0,1,19,3V29A1,1,0,0,1,18,30ZM4,20h6.08a1,1,0,0,1,.71.3L17,26.57V5.43L10.79,11.7a1,1,0,0,1-.71.3H4Z" />
    </Icon>
);

export const IconMute = ({ className }: IconProps) => (
    <Icon className={className}>
        <path d="M31 12.41 29.59 11 26 14.59 22.41 11 21 12.41 24.59 16 21 19.59 22.41 21 26 17.41 29.59 21 31 19.59 27.41 16 31 12.41z" />
        <path d="M18,30a1,1,0,0,1-.71-.3L9.67,22H3a1,1,0,0,1-1-1H2V11a1,1,0,0,1,1-1H9.67l7.62-7.7a1,1,0,0,1,1.41,0A1,1,0,0,1,19,3V29A1,1,0,0,1,18,30ZM4,20h6a1.17,1.17,0,0,1,.79.3L17,26.57V5.43L10.79,11.7A1.17,1.17,0,0,1,10,12H4Z" />
    </Icon>
);

const BAR = { x: -13.142, y: -1, width: 26.284, height: 2 };

export const IconMenu = ({ className }: IconProps) => (
    <Icon className={className}>
        <rect
            {...BAR}
            className="menu-bar"
            style={
                {
                    "--closed": "translate(16px, 11px) rotate(0deg) scaleX(1)",
                    "--open": "translate(16px, 16px) rotate(45deg) scaleX(1)",
                } as CSSProperties
            }
        />
        <rect
            {...BAR}
            className="menu-bar"
            style={
                {
                    "--closed": "translate(20.6px, 21px) rotate(0deg) scaleX(0.65)",
                    "--open": "translate(16px, 16px) rotate(-45deg) scaleX(1)",
                } as CSSProperties
            }
        />
    </Icon>
);
