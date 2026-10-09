"use client"

import { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    return (
        <dialog
            aria-labelledby="modal-title"
            open={open}
            onCancel={onClose}
            className="bg-parchment-raised border-t-rule rounded-t-card backdrop:bg-ink/55
                       fixed inset-x-0 top-20  m-auto h-2/3 max-h-none w-2/3
                       max-w-none border-t shadow-lg backdrop:backdrop-blur-[3px] z-20"
        >
            <div className="relative flex">
                <h2 id="modal-title">{title}</h2>
                {children}
            </div>
        </dialog>
    );
}
