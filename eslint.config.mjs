import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat ESLint config for Next.js 16. Uses eslint-config-next's native flat
 * exports directly (no FlatCompat shim, which crashes on ESLint 9.39).
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ["backup/**", ".next/**", "out/**", "node_modules/**"],
  },
];

export default eslintConfig;
