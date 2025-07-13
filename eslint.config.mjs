import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Default Next.js rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rule override section
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/exhaustive-deps": "off", // optional, hilangkan warning router
      "@typescript-eslint/no-unused-vars": "off", // optional
      "@next/next/no-img-element": "off", // optional
    }
  }
];

export default eslintConfig;
