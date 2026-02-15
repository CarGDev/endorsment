---
name: linter-policeman
description: "Runs ESLint and Prettier, fixes trivial issues, and produces a report of remaining linting errors."
license: MIT
triggers:
  - "run lint"
  - "fix formatting"
  - "enforce eslint"
---

# Linter Policeman

When to use this skill

- Use before committing or when tests show linting/style failures.
- Triggered by prompts to run or autofix style issues across the repo.

Instructions

1. First Step: Ensure `eslint` and `prettier` are installed and `package.json` contains `lint` and `format` scripts.

2. Second Step: Run `npm run lint -- --fix` and `npm run format` and report files changed plus any remaining errors that require manual attention.

3. Third Step: Suggest rule tweaks or suppression only when justified; avoid disabling rules globally.

Examples

- `npm run lint` -> list of files with errors; `npm run lint -- --fix` to autocorrect.

Notes

- Encourage using pre-commit hooks (Husky + lint-staged) so formatting occurs automatically.
