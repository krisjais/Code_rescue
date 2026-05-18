import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  {
    ignores: [".next/**", "next-env.d.ts"]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Unused vars should warn, not error — prevents Vercel build failures
      // during active development when variables are temporarily unused.
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off" // disabled in favour of the TS-aware rule above
    }
  }
];

export default eslintConfig;
