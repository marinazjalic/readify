// .eslintrc.js
module.exports = {
  extends: ["next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  rules: {
    // Disable React in scope errors (Next.js doesn't require React imports)
    "react/react-in-jsx-scope": "off",

    // Disable rules for unused variables (very common in React development)
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],

    // Allow JSX with apostrophes
    "react/no-unescaped-entities": "off",

    // Allow using <img> elements (Next.js prefers Image but sometimes <img> is needed)
    "@next/next/no-img-element": "warn",

    // Make explicit any warnings instead of errors
    "@typescript-eslint/no-explicit-any": "warn",

    // Relax some rules that frequently trigger in JS files
    "react/prop-types": "off",

    // Relax rules that trigger frequently in this project
    "prefer-const": "warn",

    // Fix JSX rules for NavDrawer.tsx
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["jsx", "global"],
      },
    ],

    // Allow some missing dependencies in useEffect
    "react-hooks/exhaustive-deps": "warn",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
