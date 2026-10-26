export const yearsSince = (start: Date, now: Date) => {
    let years = now.getUTCFullYear() - start.getUTCFullYear();
    const nowMonth = now.getUTCMonth();
    const startMonth = start.getUTCMonth();

    if (
        nowMonth < startMonth ||
        (nowMonth === startMonth && now.getUTCDate() < start.getUTCDate())
    )
        years -= 1;
    return years;
};
