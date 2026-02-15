---
name: module-encapsulator
description: "Groups related components, hooks, and types into feature-based modules (e.g., `modules/endorsements`) to improve encapsulation and reuse."
license: MIT
triggers:
  - "group into module"
  - "modularize feature"
  - "create feature module"
---

# Module Encapsulator

When to use this skill

- Use when several components, hooks, and types belong to a single feature and should be colocated.
- Triggered by requests to organize code by feature boundary rather than only by technical layer.

Instructions

1. First Step: Propose a module layout (e.g., `src/modules/endorsements/{components,hooks,types,services}`) and create an `index.ts` to re-export public APIs.

2. Second Step: Move or copy existing files into the module, update imports to use the module boundary (e.g., `@/modules/endorsements`).

3. Third Step: Add tests and README.md inside the module describing its public surface and example usage.

Examples

- Module index: `export * from './components/EndorseButton'; export * from './hooks/useEndorsements';`

Additional Resources

- Feature folder discussion: https://redux.js.org/style-guide/style-guide#structure

Notes

- Maintain clear public/private API: only `index.ts` exports become public; internal helpers remain in the module scope.
