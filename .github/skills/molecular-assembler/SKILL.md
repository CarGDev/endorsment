---
name: molecular-assembler
description: "Composes Atoms into Molecules (e.g., SearchField = Input + IconButton) and minimizes prop-drilling by exposing concise props."
license: MIT
triggers:
  - "assemble SearchField"
  - "create molecule from atoms"
---

# Molecular Assembler

When to use this skill

- Use when combining atoms into reusable UI patterns that encapsulate small behavior and layout.
- Triggered by requests to create a composite component that uses two or more atoms.

Instructions

1. First Step: Identify the atoms to compose and define a minimal props surface for the molecule (avoid exposing internal atom implementation details).

2. Second Step: Implement the molecule in `src/components/molecules/` with clear prop destructuring and forwarding of refs where appropriate.

3. Third Step: Add unit tests to verify rendering and interactions and an example usage in a page or story.

Examples

- SearchField: uses `Input` and `IconButton`, exposes `value`, `onChange`, and `onSearch` props.

Notes

- Molecules should be easy to reuse in multiple organisms; prefer composition over conditional internals.
