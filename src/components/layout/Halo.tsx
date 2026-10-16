export default function Halo() {
    return (
        <div
            className="relative isolate
                before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-140
                before:bg-(image:--halo-gradient) before:content-['']"
        ></div>
    );
}
