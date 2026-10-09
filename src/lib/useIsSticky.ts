"use client";

import { useEffect, useRef, useState } from "react";

export function useIsSticky(offsetTop: number) {
    const sentinel = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const target = sentinel.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([input]) => {
                setIsSticky(!input.isIntersecting);
            },
            { rootMargin: `-${offsetTop + 1}px 0px 0px 0px`, threshold: 0 },
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, [offsetTop]);

    return { sentinel, isSticky };
}
