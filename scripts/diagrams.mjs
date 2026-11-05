import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { renderMermaid } from "@mermaid-js/mermaid-cli";
import puppeteer from "puppeteer";

const ROOT = join(import.meta.dirname, "..");
const SOURCE_DIR = join(ROOT, "diagrams");
// const TARGET_FILE = join(ROOT, "generated.ts");
const MMD_EXT = ".mmd";
const browser = await puppeteer.launch();

try {
    const files = (await readdir(SOURCE_DIR)).filter(
        (file) => extname(file) === MMD_EXT,
    );

    for (const file of files) {
        const name = basename(file, MMD_EXT);
        const buffer = await readFile(join(SOURCE_DIR, file), "utf8");
        const { data } = await renderMermaid(browser, buffer, "svg", {
            backgroundColor: "transparent",
            svgId: name,
        });
        await writeFile(join(SOURCE_DIR, `${name}.svg`), data);
        console.info(`${name} --> ok`);
    }
} catch (error) {
    console.log(error);
} finally {
    await browser.close();
    console.info("File conversion done!");
}
