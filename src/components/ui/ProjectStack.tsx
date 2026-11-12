import { getTranslations } from "next-intl/server";
import { Tag } from "./Tag";

const ProjectStack = async ({ stack }: { stack: string[] }) => {
    if (!stack.length) return;
    const t = await getTranslations("Projects");

    return (
        <div className="mt-6">
            <p
                id="project-stack"
                className="mb-2.5 font-mono text-2xs font-medium tracking-label text-dim uppercase"
            >
                {t("identity.stack")}
            </p>
            <ul
                aria-labelledby="project-stack"
                className="flex flex-wrap gap-1.5"
            >
                {stack.map((elem) => (
                    <li key={elem}>
                        <Tag>{elem}</Tag>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectStack;
