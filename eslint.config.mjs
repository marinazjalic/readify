// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Convert the configurations using FlatCompat
const configs = compat.extends("next/core-web-vitals");

// Create a new array with only the necessary properties
const eslintConfig = configs.map((config) => {
  // Remove problematic properties that contain functions
  const { languageOptions, ...rest } = config;

  // If languageOptions exist, create a safe version without the parser
  const safeLanguageOptions = languageOptions
    ? {
        ...languageOptions,
        parser: null, // Remove the parser object that contains functions
      }
    : undefined;

  // Return a new configuration object
  return {
    ...rest,
    ...(safeLanguageOptions ? { languageOptions: safeLanguageOptions } : {}),
  };
});

export default eslintConfig;
