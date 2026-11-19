import { createCssVariablesTheme } from "shiki";

const base = createCssVariablesTheme({ 
  name: 'portfolio',
  variablePrefix: '--code-',
})

export const codeTheme = {
    ...base,
    tokenColors: [
        ...(base.tokenColors ?? []),
        {
            scope: ["comment", "punctuation.definition.comment"],
            settings: { fontStyle: "italic" },
        },
    ],
};