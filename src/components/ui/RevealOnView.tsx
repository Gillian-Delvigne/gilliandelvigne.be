"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export const RevealOnView = ({ children }: { children: ReactNode }) => {
    const sentinel = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const target = sentinel.current;
        if (!target) return;
        const observer = new IntersectionObserver(([input]) => {
            if (!input.isIntersecting) return;
            setIsVisible(true);
            observer.disconnect();
        });
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            data-reveal
            ref={sentinel}
            data-visible={isVisible ? "" : undefined}
        >
            {children}
        </div>
    );
};
