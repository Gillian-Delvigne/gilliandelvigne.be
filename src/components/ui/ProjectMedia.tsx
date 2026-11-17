"use client";
import {
    useRef,
    useState,
    KeyboardEvent,
    type RefObject,
    ReactNode,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";
import { useTranslations } from "next-intl";
import Button from "./Button";
import {
    IconChevronLeft,
    IconChevronRight,
    IconDemo,
    IconExpand,
    IconGallery,
} from "../icons/icons";
import { Dialog, TARGET } from "./Dialog";
import { Dot } from "./Dot";

const STAGE =
    "relative overflow-hidden bg-(--sunk) border border-(--line-soft) aspect-video rounded-md col-span-full cursor-pointer";

export const ProjectMedia = ({
    project,
    diagrams,
    fullscreenDiagrams,
}: {
    project: Project;
    diagrams: ReactNode[];
    fullscreenDiagrams: ReactNode[];
}) => {
    const demoRef = useRef<HTMLDialogElement>(null);
    const galleryRef = useRef<HTMLDialogElement>(null);
    const fullRef = useRef<HTMLDialogElement>(null);
    const [index, setIndex] = useState<number>(0);
    const t = useTranslations("Media");
    if (!project.media) return null;
    const demo = project.media.demo;
    const gallery = project.media.gallery;

    const isFirst = index === 0;
    const isLast = gallery && index === gallery.length - 1;

    const next = (): void => {
        if (gallery && index < gallery.length - 1) setIndex(index + 1);
    };

    const previous = (): void => {
        if (gallery && index > 0) setIndex(index - 1);
    };

    const handleArrowKeys = (event: KeyboardEvent<HTMLDialogElement>): void => {
        if (event.key === "ArrowRight") next();
        else if (event.key === "ArrowLeft") previous();
    };

    const openDialog = (ref: RefObject<HTMLDialogElement | null>): void => {
        ref.current?.showModal();
        setIndex(0);
    };

    const openFullscreen = (): void => {
        fullRef.current?.showModal();
    };

    return (
        <section>
            <div className="flex gap-2">
                {demo && (
                    <Button
                        variant="secondary"
                        onClick={() => openDialog(demoRef)}
                    >
                        <IconDemo className="size-icon-sm" />
                        {t("demo")}
                    </Button>
                )}
                {gallery && (
                    <Button
                        variant="secondary"
                        onClick={() => openDialog(galleryRef)}
                    >
                        <IconGallery className="size-icon-sm" />
                        {t("gallery")}
                        <span className="text-dim">{gallery.length}</span>
                    </Button>
                )}
            </div>
            {demo && (
                <Dialog
                    variant={"panel"}
                    ref={demoRef}
                    dialogLabel={t.rich("demoTitle", {
                        dot: () => <Dot />,
                        project: project.title,
                    })}
                    closeLabel={t("close")}
                >
                    {demo.kind === "video" && (
                        <video
                            controls
                            preload="none"
                            poster={demo.poster?.src}
                            className="w-full aspect-video"
                        >
                            <source src={demo.src} />
                        </video>
                    )}
                </Dialog>
            )}
            {gallery && (
                <>
                    <Dialog
                        variant={"panel"}
                        ref={galleryRef}
                        dialogLabel={t.rich("galleryTitle", {
                            dot: () => <Dot />,
                            project: project.title,
                        })}
                        closeLabel={t("close")}
                        onKeyDown={handleArrowKeys}
                    >
                        <figure className="grid grid-cols-media max-md:grid-cols-1 gap-4">
                            <button
                                type="button"
                                className={STAGE}
                                onClick={openFullscreen}
                            >
                                {gallery[index].kind === "capture" ? (
                                    <Image
                                        src={gallery[index].src}
                                        alt=""
                                        placeholder="blur"
                                        fill
                                        className="object-contain"
                                        sizes="(min-width: 67.5rem) 59.75rem, (min-width: 48rem) calc(100vw - 7.75rem), calc(100vw - 4rem)"
                                    ></Image>
                                ) : (
                                    diagrams[index]
                                )}
                            </button>
                            <span className="flex items-center text-sm gap-3 col-start-2 row-start-2 max-md:col-start-1 max-md:justify-center">
                                <Button
                                    variant="quiet"
                                    aria-label={t("expand")}
                                    onClick={openFullscreen}
									className={TARGET}
                                >
                                    <IconExpand className="size-icon-md" />
                                </Button>
								<span aria-hidden="true" className="w-px h-icon-md bg-(--line) mx-2" />
                                <Button
                                    className={TARGET}
                                    variant="quiet"
                                    onClick={previous}
                                    aria-label={t("previous")}
                                    aria-disabled={isFirst}
                                >
                                    <IconChevronLeft
                                        className={cn("size-icon-md")}
                                    />
                                </Button>
                                <span
                                    aria-hidden="true"
                                    className="text-dim font-mono text-center"
                                >
                                    {t("counter", {
                                        current: index + 1,
                                        total: gallery.length,
                                    })}
                                </span>
                                <span className="sr-only" aria-live="polite">
                                    {t("counterLabel", {
                                        current: index + 1,
                                        total: gallery.length,
                                    })}
                                </span>
                                <Button
                                    className={TARGET}
                                    variant="quiet"
                                    onClick={next}
                                    aria-label={t("next")}
                                    aria-disabled={isLast}
                                >
                                    <IconChevronRight
                                        className={cn("size-icon-md")}
                                    />
                                </Button>
                            </span>
                            <figcaption
                                aria-hidden
                                className="text-sm text-dim col-start-1 max-md:row-start-3 max-md:text-center max-md:min-h-12 flex items-center"
                            >
                                {gallery[index].caption}
                            </figcaption>
                        </figure>
                    </Dialog>
                    <Dialog
                        variant="full"
                        ref={fullRef}
                        dialogLabel={t.rich("fullTitle", {
                            dot: () => <Dot />,
                            project: project.title,
                            current: index + 1,
                            total: gallery.length,
                        })}
                        closeLabel={t("expandedClose")}
                    >
                        <div className="relative flex-1 min-h-0 overflow-auto">
                            {gallery[index].kind === "capture" ? (
                                <Image
                                    src={gallery[index].src}
                                    alt=""
                                    placeholder="blur"
                                    className="h-full w-auto max-w-none mx-auto"
                                    sizes="(min-width: 75rem) calc(100vw - 10.75rem), 300vw"
                                ></Image>
                            ) : (
                                fullscreenDiagrams[index]
                            )}
                        </div>
                    </Dialog>
                </>
            )}
        </section>
    );
};
