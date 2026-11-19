import { codeToHtml } from "shiki";
import { codeTheme } from "@/lib/code-theme";

interface CodeWindowProps {
    file: string;
    lang: string;
    code: string;
}

export const CodeWindow = async ({ file, lang, code }: CodeWindowProps) => {
    const html = await codeToHtml(code.trimEnd(), {
        lang: lang,
        theme: codeTheme,
        transformers: [
            {
                name: "remove-tabindex",
                pre(hast) {
                    delete hast.properties.tabindex;
                },
            },
        ],
    });
    return (
        <div aria-hidden="true" className="code-window">
            <div className="code-window-tab">
                <span>{file}</span>
                <span>{lang}</span>
            </div>
            <div
                className="contents"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};
