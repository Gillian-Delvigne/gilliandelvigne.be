export const positionOf = (
    year: number,
    start: number,
    width: number,
    end: number,
): number => {
    const gap = end - start;
    const diff = year - start;
    return (diff / gap) * width;
};
