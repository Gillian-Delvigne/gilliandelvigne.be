import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        ".velite/**",
        "specs/**",
    ]),
    {
        rules: {
            "import/no-cycle": "error",
            // A variable destructured ALONGSIDE a rest element exists to EXCLUDE
            // it from that rest: a deliberate omission, not an oversight.
            // Used in Field.tsx to hold back the domain props (label, hint,
            // error) before spreading what remains onto the DOM.
            // The remaining options restate the rule's own defaults — leaving
            // them out would reset them.
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    args: "after-used",
                    caughtErrors: "all",
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
]);

export default eslintConfig;
