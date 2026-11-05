import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { renderMermaid } from "@mermaid-js/mermaid-cli";
import puppeteer from "puppeteer";

const ROOT = join(import.meta.dirname, "..");
const SOURCE_DIR = join(ROOT, "diagrams");
const MMD_EXT = ".mmd";
const THEME_FILE = "theme.json";
const TOKENS_FILE = "tokens.json";
const browser = await puppeteer.launch();

const swapPlaceholders = (svg, pairs) => {
    for (const [placeholder, value] of pairs) {
        svg = svg.replaceAll(placeholder, value);
    }
    return svg;
};

// assert there is no remaining raw hexadecimal, rgb(…), rgba(…) and hsl(…) color in svg
const assertNoRawColor = (name, svg, ignored) => {
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

const assertAccessibleAttributes = (file, title, desc) => {
    if (!title)
        throw new Error(
            `${file} does not own an accessible title. Add accTitle to source .mmd file.`,
        );
    if (!desc)
        throw new Error(
            `${file} does not own a required description. Add accDesc to source .mmd file.`,
        );
};

try {
    const files = (await readdir(SOURCE_DIR)).filter(
        (file) => extname(file) === MMD_EXT,
    );
    const config = JSON.parse(
        await readFile(join(SOURCE_DIR, THEME_FILE), "utf8"),
    );
    const tokens = JSON.parse(
        await readFile(join(SOURCE_DIR, TOKENS_FILE), "utf8"),
    );
    const tokenToReplace = Object.entries({
        ...tokens.colors,
        ...tokens.derived,
        ...tokens.fonts,
    });
    const allSVGs = {};

    for (const file of files) {
        const name = basename(file, MMD_EXT);
        const content = await readFile(join(SOURCE_DIR, file), "utf8");
        const { title, desc, data } = await renderMermaid(
            browser,
            content,
            "svg",
            {
                backgroundColor: "transparent",
                svgId: name,
                mermaidConfig: config,
            },
        );
        let svg = new TextDecoder().decode(data);

        svg = swapPlaceholders(svg, tokenToReplace);
        assertNoRawColor(name, svg, tokens.ignored);
        assertAccessibleAttributes(file, title, desc);

        allSVGs[name] = { title, desc, svg };
        console.info(`${name} --> ok`);
    }
    const generated = `export const diagrams = ${JSON.stringify(allSVGs)};\n`;
    await writeFile(join(ROOT, "src", "diagrams", "generated.ts"), generated);
    console.info("All SVG generated!");
} catch (error) {
    console.error("SVG generation failed.");
    console.error(error);
    process.exitCode = 1;
} finally {
    await browser.close();
}
