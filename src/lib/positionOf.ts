import { yearOf } from "./yearOf";

export const positionOf = (
    year: number,
    start: number,
    width: number,
    end: number = yearOf(new Date()),
): number => {
    const gap = end - start;
    const diff = year - start;
    return (diff / gap) * width;
};
