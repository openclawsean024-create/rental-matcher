// ESLint flat config — rental-matcher (Vite + React 19 + TS)
// 輕量版：直接用 @typescript-eslint 設定，避免和 Vite/React 19 + Tailwind 4 的 plugin 衝突
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".vite/**",
      "public/**",
      "*.config.mjs",
      "*.config.js",
      "*.config.ts",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // React 19 + jsdom + Vite
        React: "readonly",
        JSX: "readonly",
        process: "readonly",
        console: "readonly",
        global: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        queueMicrotask: "readonly",
        crypto: "readonly",
        AbortController: "readonly",
        AbortSignal: "readonly",
        performance: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLAnchorElement: "readonly",
        Event: "readonly",
        KeyboardEvent: "readonly",
        MouseEvent: "readonly",
        beforeEach: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        vi: "readonly",
        // Vite import.meta.env types
        import: "readonly",
        export: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "prefer-const": "warn",
    },
  },
];
