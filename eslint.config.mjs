// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,mts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "jsx-a11y": eslintPluginJsxA11y,
      "@next/next": nextPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Next.js rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-unwanted-polyfillio": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-script-component-in-head": "error",
      "@next/next/no-page-custom-font": "error",
      "@next/next/no-duplicate-head": "error",
      "@next/next/no-document-import-in-page": "error",
      "@next/next/no-css-tags": "error",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",

      // Import rules
      "import/no-unresolved": "off", // TypeScript handles this
      "import/named": "error",
      "import/default": "error",
      "import/no-named-as-default": "warn",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
    },
  },
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      // Add JSX specific rules here
    },
  },
  {
    // Specific rules for Next.js pages and components
    files: [
      "src/app/**/*.{js,jsx,ts,tsx}",
      "src/pages/**/*.{js,jsx,ts,tsx}",
      "src/components/**/*.{js,jsx,ts,tsx}",
    ],
    rules: {
      // Rules specific to Next.js structure
      "@next/next/no-head-element": "error",
    },
  },
];
