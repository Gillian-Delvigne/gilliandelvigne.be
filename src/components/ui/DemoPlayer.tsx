"use client";
import "media-chrome/lang/fr";
import {
    MediaController,
    MediaControlBar,
    MediaPlayButton,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";
import {
    IconPlay,
    IconPause,
    IconSound,
    IconMute,
    IconExpand,
    IconCollapse,
} from "../icons/icons";
import { cn } from "@/lib/cn";

interface DemoPlayerProps {
    src: string;
    poster?: string;
    lang: string;
}

const SLOT = "flex";
const ICON = "size-icon-md";
const CONTROL = "p-2 rounded-sm";
const BUTTON = "size-11";

export const DemoPlayer = ({ src, poster, lang }: DemoPlayerProps) => (
        <MediaController
            lang={lang}
            className="player block size-full rounded-sm"
        >
            <video
                slot="media"
                src={src}
                poster={poster}
                preload="none"
                playsInline
                className="size-full"
            />
            <MediaControlBar className="mx-10 my-2 flex gap-1 py-1 px-4 rounded-md bg-surface/80">
                <MediaPlayButton className={cn(CONTROL, BUTTON)}>
                    <span slot="play" className={SLOT}>
                        <IconPlay className={ICON} />
                    </span>
                    <span slot="pause" className={SLOT}>
                        <IconPause className={ICON} />
                    </span>
                </MediaPlayButton>
                <MediaTimeRange className={cn("grow", CONTROL)} />
                <MediaTimeDisplay
                    showDuration
                    className={cn(CONTROL, "max-md:hidden")}
                />
                <MediaMuteButton className={cn(CONTROL, BUTTON)}>
                    <span slot="off" className={SLOT}>
                        <IconMute className={ICON} />
                    </span>
                    <span slot="low" className={SLOT}>
                        <IconSound className={ICON} />
                    </span>
                    <span slot="medium" className={SLOT}>
                        <IconSound className={ICON} />
                    </span>
                    <span slot="high" className={SLOT}>
                        <IconSound className={ICON} />
                    </span>
                </MediaMuteButton>
                <MediaFullscreenButton className={cn(CONTROL, BUTTON)}>
                    <span slot="enter" className={SLOT}>
                        <IconExpand className={ICON} />
                    </span>
                    <span slot="exit" className={SLOT}>
                        <IconCollapse className={ICON} />
                    </span>
                </MediaFullscreenButton>
            </MediaControlBar>
        </MediaController>
);
