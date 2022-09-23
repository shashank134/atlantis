module.exports = {
  env: { browser: true, es6: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:import/typescript",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "prettier",
    "import",
    "jest",
  ],
  settings: {
    react: { version: "detect" },
    "import/resolver": { typescript: {} },
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "index", "sibling"],
        "newlines-between": "never",
      },
    ],
    "import/no-default-export": "error",
    "import/no-unresolved": ["error", { ignore: [".css$"] }],
    "import/namespace": "error",
    "import/default": "error",
    "import/export": "error",
    "import/no-duplicates": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-internal-modules": "error",
    "import/no-named-default": "error",
    "import/no-named-as-default": "error",
    "import/no-cycle": ["error", { maxDepth: Infinity }],
    "import/no-useless-path-segments": "error",
    "import/no-relative-parent-imports": "error",
    "import/no-deprecated": "error",
    "import/newline-after-import": "error",
    "jest/no-jasmine-globals": "error",
    "react/no-danger": "error",
    "prettier/prettier": [
      "error",
      { trailingComma: "all", arrowParens: "avoid" },
      { usePrettierrc: false },
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
      },
    ],
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true }],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true }],
    "@typescript-eslint/no-empty-function": "error",
    curly: ["error", "multi-line", "consistent"],
    "prefer-const": "error",
    "dot-notation": "error",
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "guard-for-in": "error",
    "max-statements": ["error", 12],
    "no-bitwise": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-shadow": "error",
    "no-sequences": "error",
    "no-new-func": "error",
    "no-template-curly-in-string": "error",
    "no-return-await": "error",
    "no-throw-literal": "error",
    "no-unused-expressions": "off",
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "no-octal-escape": "error",
    "no-restricted-imports": ["error", { patterns: ["../*"] }],
    radix: "error",
    "use-isnan": "error",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
};
