---
name: alias-guardian
description: "Refactors relative imports into tsconfig/Vite aliases (e.g., `@/components`) to keep imports consistent and resilient to file moves."
license: MIT
triggers:
  - "refactor imports to @/"
  - "apply tsconfig aliases"
  - "clean relative imports"
---

# Alias Guardian

When to use this skill

- Run after adding `tsconfig` path aliases or when many long relative imports exist.
- Triggered by prompts to convert `../../..` style imports to `@/` aliases.

Instructions

1. First Step: Ensure `tsconfig.json` has `paths` configured (`"@/*": ["src/*"]`) and `vite.config.ts` supports the aliases (via `vite-tsconfig-paths` or manual `resolve.alias`).

2. Second Step: Use an AST-based tool (e.g., `jscodeshift`, `ts-morph`) or a controlled regex to find and replace relative import paths. Prefer AST to avoid accidental matches.

3. Third Step: Update affected files' imports to the alias form and run TypeScript to verify no resolution errors.

Examples

- Before: `import PaperCard from '../../components/molecules/PaperCard'`
- After: `import PaperCard from '@/components/molecules/PaperCard'`

Additional Resources

- ts-morph: https://github.com/dsherret/ts-morph
- jscodeshift: https://github.com/facebook/jscodeshift

Notes

- Always run tests and TypeScript type-check after mass refactors; commit in a dedicated branch and use Git to move files safely.
