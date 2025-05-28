import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});
/**
 * @doc https://nextjs.org/docs/app/api-reference/config/eslint
 */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript","prettier"),
  ...compat.config({
    settings: {
      next: {
        rootDir: 'packages/frontend/',
      },
    },
  })
];

export default eslintConfig;
