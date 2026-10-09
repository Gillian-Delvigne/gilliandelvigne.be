"use client"

import { useRef } from "react";
import type { Station } from "@/types/navigation";
import { CompassTab } from "./CompassTab";
import { CompassSheet } from "./CompassSheet";

interface CompassMobileProps {
    stations: Station[];
}

export function CompassMobile({ stations }: CompassMobileProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
   
    return (
        <>
            <CompassTab stations={stations} dialogRef={dialogRef} />
            <CompassSheet stations={stations} dialogRef={dialogRef} />
        </>
    );
}
