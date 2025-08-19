module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:nuxt/recommended", // Nuxt-specific rules
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Prettier LAST to avoid conflicts
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // ✅ Make <slot></slot> → <slot />
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],

    // ✅ Example: manage blank lines in TS/JS
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "block-like", next: "*" },
    ],

    // Optional Nuxt-specific cleanups
    "vue/multi-word-component-names": "off",
  },
};
