import { readdir, readFile, writeFile } from "node:fs/promises";
import { argv } from "node:process";
import { join, basename, extname } from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { renderMermaid } from "@mermaid-js/mermaid-cli";

const CHECK = "--check";
const ROOT = join(import.meta.dirname, "..");
const SOURCE_DIR = join(ROOT, "diagrams");
const TARGET = join(ROOT, "src", "diagrams", "generated.ts");
const MMD_EXT = ".mmd";
const THEME_FILE = "theme.json";
const TOKENS_FILE = "tokens.json";
interface Tokens {
    colors: Record<string, string>;
    derived: Record<string, string>;
    fonts: Record<string, string>;
    ignored: string[];
}

interface Diagram {
    title: string;
    desc: string;
    svg: string;
    hash: string;
}

const isCheckMode = (): boolean => {
    const args = argv.slice(2);
    if (args.length) {
        if (args.length > 1) throw new Error("Invalid number of arguments");
        if (args[0] !== CHECK) throw new Error(`Invalid arguments: ${args[0]}`);
        return true;
    }
    return false;
};

const hashCommons = async (config: string, tokens: string): Promise<string> => {
    const script = await readFile(import.meta.filename, "utf8");
    const mermaidVersion: string = JSON.parse(
        await readFile(
            join(ROOT, "node_modules", "mermaid", "package.json"),
            "utf8",
        ),
    ).version;
    const hash = createHash("sha256");
    hash.update(script);
    hash.update(mermaidVersion);
    hash.update(tokens);
    hash.update(config);
    return hash.digest("hex");
};

const hashSource = async (
    source: string,
    commonsHash: string,
): Promise<string> => {
    const hash = createHash("sha256");
    hash.update(source);
    hash.update(commonsHash);
    return hash.digest("hex");
};

const readPrevious = async (): Promise<Record<string, Diagram>> => {
    try {
        const previous = await import(pathToFileURL(TARGET).href);
        return previous.diagrams;
    } catch (error: unknown) {
        if (
            error instanceof Error &&
            "code" in error &&
            error.code === "ERR_MODULE_NOT_FOUND"
        )
            return {};
        throw error;
    }
};

const swapPlaceholders = (svg: string, pairs: [string, string][]): string => {
    for (const [placeholder, value] of pairs) {
        svg = svg.replaceAll(placeholder, value);
    }
    return svg;
};

// assert there is no remaining raw hexadecimal, rgb(…), rgba(…) and hsl(…) color in svg
const assertNoRawColor = (
    name: string,
    svg: string,
    ignored: string[],
): void => {
    const regex =
        /#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\( ?\d{1,3}%? ?, ?\d{1,3}%? ?, ?\d{1,3}%?(?: ?, ?[01]?(?:\.\d+)?)? ?\)|hsla?\( ?\d+(?:\.\d+)?(?:deg|rad|turn)? ?, ?\d+(?:\.\d+)?% ?, ?\d+(?:\.\d+)?%?(?: ?, ?\d+(?:\.\d+)?%?)? ?\)/g;
    const matches = svg.match(regex);
    if (matches) {
        const forbiddenTokens = matches.filter(
            (match) => !ignored.includes(match),
        );
        if (forbiddenTokens.length)
            throw new Error(
                `Unknown color found in ${name}.svg: ${forbiddenTokens.join(", ")}`,
            );
    }
};

const requireAccessibleText = (
    name: string,
    title: string | null,
    desc: string | null,
): { title: string; desc: string } => {
    if (!title)
        throw new Error(
            `${name} has no accessible title. Add accTitle to ${name}${MMD_EXT}.`,
        );
    if (!desc)
        throw new Error(
            `${name} has no description. Add accDescr to ${name}${MMD_EXT}.`,
        );
    return { title, desc };
};

// Script starts here

let browser;

try {
    const check = isCheckMode();
    const config = await readFile(join(SOURCE_DIR, THEME_FILE), "utf8");
    const tokens: Tokens = JSON.parse(
        await readFile(join(SOURCE_DIR, TOKENS_FILE), "utf8"),
    );
    const commonsHash = await hashCommons(config, JSON.stringify(tokens));
    const previousDiagrams = await readPrevious();
    const newDiagrams: Record<string, Diagram> = {};
    const sourcesToCheck = [];

    const names = (await readdir(SOURCE_DIR))
        .filter((file) => extname(file) === MMD_EXT)
        .map((file) => basename(file, MMD_EXT));
    const tokenToReplace: [string, string][] = Object.entries({
        ...tokens.colors,
        ...tokens.derived,
        ...tokens.fonts,
    });

    for (const name of names) {
        const content = await readFile(
            join(SOURCE_DIR, `${name}${MMD_EXT}`),
            "utf8",
        );
        const hash = await hashSource(content, commonsHash);
        if (previousDiagrams[name]?.hash === hash)
            newDiagrams[name] = previousDiagrams[name];
        else {
            if (check) sourcesToCheck.push(name);
            else {
                if (!browser) {
                    const puppeteer = await import("puppeteer");
                    browser = await puppeteer.launch();
                }
                const { title, desc, data } = await renderMermaid(
                    browser,
                    content,
                    "svg",
                    {
                        backgroundColor: "transparent",
                        svgId: name,
                        mermaidConfig: JSON.parse(config),
                    },
                );
                let svg = new TextDecoder().decode(data);

                svg = swapPlaceholders(svg, tokenToReplace);
                assertNoRawColor(name, svg, tokens.ignored);
                const valid = requireAccessibleText(name, title, desc);
                newDiagrams[name] = {
                    title: valid.title,
                    desc: valid.desc,
                    svg,
                    hash,
                };
                console.info(`${name} --> ok`);
            }
        }
    }

    const previousNames = Object.keys(previousDiagrams);
    sourcesToCheck.push(
        ...previousNames.filter((name) => !names.includes(name)),
    );

    if (check) {
        if (sourcesToCheck.length)
            throw new Error(
                `The following diagrams need to be rerendered ${sourcesToCheck.join(", ")}. Run npm run diagrams`,
            );
        else console.info("No changes since the last time");
    } else {
        const generated = `export const diagrams = ${JSON.stringify(newDiagrams)};\n`;
        await writeFile(TARGET, generated);
        console.info("All SVG generated!");
    }
} catch (error) {
    console.error("SVG generation failed.");
    console.error(error);
    process.exitCode = 1;
} finally {
    if (browser) await browser.close();
}
