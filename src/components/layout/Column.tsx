import { useId } from "react";

type Item = { title: string; body: string };

interface ColumnProps {
    title: string;
    items: Item[];
}

export const Column = ({ title, items }: ColumnProps) => {
    const id = useId();
    if (!items.length) return null;
    return (
        <section aria-labelledby={id}>
            {
                <>
                    <h2
                        id={id}
                        className="mb-3 border-b border-(--line) pb-2.25 font-mono text-2xs font-semibold tracking-label text-dim uppercase"
                    >
                        {title}
                    </h2>
                    <ul>
                        {items.map((item) => {
                            return (
                                <li
                                    key={item.title}
                                    className="not-last:border-b border-(--line-soft) py-2.75 text-sm text-dim"
                                >
                                    <strong className="mb-0.5 block font-semibold text-ink">
                                        {item.title}
                                    </strong>
                                    <p>{item.body}</p>
                                </li>
                            );
                        })}
                    </ul>
                </>
            }
        </section>
    );
};
