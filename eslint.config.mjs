import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error"
    }
},
  pluginJs.configs.recommended,
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error"
    }
},
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];