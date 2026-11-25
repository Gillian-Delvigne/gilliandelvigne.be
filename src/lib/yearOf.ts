export const yearOf = (date: Date): number => {
    const year = date.getUTCFullYear();
    const start = Date.UTC(year, 0, 1);
    const end = Date.UTC(year + 1, 0, 1);
    const elapsed = date.getTime() - start;
    return year + elapsed / (end - start);
};
