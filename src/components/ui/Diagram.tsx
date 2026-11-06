import { diagrams } from "@/diagrams/generated";

type DiagramName = keyof typeof diagrams;

const Diagram = ({ name, caption }: { name: DiagramName; caption: string }) => {
    const { title, desc, svg } = diagrams[name];

    return (
        <figure className="border border-(--line) rounded-card bg-surface">
            <div
                dangerouslySetInnerHTML={{ __html: svg }}
                lang="en"
                role="img"
                aria-label={title}
                aria-labelledby={desc ?? undefined}
            />
            <figcaption className="text-dim">{caption}</figcaption>
        </figure>
    );
};

export default Diagram;
