---
name: atomic-scaffolder
description: "Generates the Atomic Design directory structure (atoms, molecules, organisms, templates, pages) and adds index barrels for clean exports."
license: MIT
triggers:
  - "scaffold atomic"
  - "generate atoms molecules organisms"
  - "create components structure"
---

# Atomic Scaffolder

When to use this skill

- Use when starting the UI layer or when reorganizing components into Atomic Design.
- Triggered by prompts that request a structured components tree or sample atoms/molecules.

Instructions

1. First Step: Create `src/components/{atoms,molecules,organisms,templates,pages}` directories and ensure `src/components/index.ts` exists as a barrel.

2. Second Step: Add `index.ts` in each folder that re-exports components to simplify imports (e.g., `export * from './atoms/Button'`).

3. Third Step: Optionally scaffold a small set of example atoms (Button, Input, Badge) and a molecule (PaperCard) to demonstrate wiring and naming conventions.

Examples

- Generated tree:
  src/components/
    atoms/
      Button.tsx
      index.ts
    molecules/
      PaperCard.tsx
      index.ts

Additional Resources

- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/

Notes

- Keep atoms minimal and focused; molecules compose atoms; organisms compose molecules.
- Use TypeScript interfaces for component props and default Tailwind utility patterns.
