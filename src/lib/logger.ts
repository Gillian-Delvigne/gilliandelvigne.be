type Mode = "DEBUG" | "INFO" | "WARN" | "ERROR";

export function logger(mode: Mode, log: string, data?: unknown): void {
    if (mode === "ERROR") {
        console.error(log, data);
        return;
    }
    if (process.env.NODE_ENV === "development") {
        switch (mode) {
            case "DEBUG":
                console.debug(log, data);
            case "INFO":
                console.log(log, data);
                break;
            case "WARN":
                console.warn(log, data);
                break;
            default:
                break;
        }
    }
}
