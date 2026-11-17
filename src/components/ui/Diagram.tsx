import { diagrams } from "@/diagrams/generated";

export type DiagramName = keyof typeof diagrams;

export interface DiagramProps {
    name: DiagramName;
    caption?: string;
}

export const isDiagramName = (src: string): src is DiagramName => {
    return Object.keys(diagrams).includes(src);
};

export const DiagramArt = ({
    name,
    descId,
    className,
    zoomed = false,
}: {
    name: DiagramName;
    descId: string;
    className?: string;
    zoomed?: boolean;
}) => {
    const { title, desc, svg, width } = diagrams[name];
    return (
        <>
            <div
                dangerouslySetInnerHTML={{ __html: svg }}
                lang="en"
                role="img"
                aria-label={title}
                aria-describedby={descId}
                className={className}
                style={
                    zoomed
                        ? { width: `calc(${width}px * var(--diagram-zoom))` }
                        : undefined
                }
            />
            <p id={descId} lang="en" hidden>
                {desc}
            </p>
        </>
    );
};

export const Diagram = ({ name, caption }: DiagramProps) => {
    return (
        <figure className="border border-(--line) rounded-card bg-surface">
            <DiagramArt name={name} descId={`${name}-desc`} />
            <figcaption className="text-dim">{caption}</figcaption>
        </figure>
    );
};
