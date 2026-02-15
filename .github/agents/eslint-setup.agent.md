---
name: "ESLint Setup"
description: "Scaffolds ESLint for React + TypeScript with Prettier integration and recommended rules for frontend projects."
triggers:
  - "setup eslint"
  - "create .eslintrc for typescript react"
  - "configure eslint with prettier"
---

# ESLint Setup

Purpose
- Provide a production-ready ESLint configuration that works with TypeScript, React, imports resolution, and Prettier.

Example prompts
- "create eslint config for react + ts"
- "add eslint rules for accessibility and import order"

Suggested .eslintrc.cjs
```js
module.exports = {
  env: { browser: true, es2021: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'import'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { typescript: {} }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'warn'
  }
}
```

Notes
- Install: `npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-prettier`
- Consider `eslint --fix` via `npm run lint:fix` script and integrate with pre-commit hooks.
