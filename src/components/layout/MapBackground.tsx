import Image from "next/image";
import { PaperLayers } from "./PaperLayers";

export default function MapBackground() {
    return (
        <div aria-hidden="true" className="fixed inset-0 -z-10">
            {/* Engraved map (background) */}
            <Image
                src="/illustrations/map-texture.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-(--map-opacity) transition-opacity duration-(--dur-route) ease-map"
            />
            <PaperLayers />
        </div>
    );
}
