---
name: typescript-type-factory
description: "Creates and centralizes TypeScript types (Paper, User, Endorsement) under `src/types` to keep store and UI consistent."
license: MIT
triggers:
  - "generate Paper type"
  - "create types index"
  - "centralize interfaces"
---

# TypeScript Type-Factory

When to use this skill

- Use when adding new domain models or when types diverge between UI and store.
- Triggered by requests to generate types, add optional fields, or migrate type shapes.

Instructions

1. First Step: Create `src/types/index.ts` and define exported interfaces/types: `Paper`, `User`, `Endorsement`, `ApiResponse`.

2. Second Step: Ensure stores, components, and services import types from `@/types` to avoid duplication.

3. Third Step: Add comments and sample fixtures that match `mockData` for easy testing.

Examples

```ts
export type Paper = { id: string; title: string; authors: string[]; categories: string[]; abstract?: string }
```

Notes

- Keep versioning/migrations in mind if types are persisted to localStorage; consider a simple `schemaVersion` field.
