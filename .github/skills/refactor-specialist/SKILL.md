---
name: refactor-specialist
description: "Detects duplicated code in organisms and suggests moving repeated logic into shared molecules or utility functions."
license: MIT
triggers:
  - "find duplicate code"
  - "refactor repeated logic"
---

# Refactor Specialist

When to use this skill

- Use when multiple organisms contain the same rendering logic or state transformation.
- Triggered by requests to reduce duplication and improve maintainability.

Instructions

1. First Step: Scan the codebase for duplicated JSX blocks or near-identical functions using `grep`, `ripgrep`, or AST comparison.

2. Second Step: Propose a refactor plan: extract a Molecule, a utility function in `src/utils`, or move a hook into `src/hooks`.

3. Third Step: Provide a code diff or patch demonstrating the extraction and update imports across affected files.

Examples

- Extracting a `UserAvatarWithMeta` molecule used in two different organisms.

Notes

- Prefer small, incremental refactors and keep tests passing after each change.
