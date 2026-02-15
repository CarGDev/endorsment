---
name: custom-hook-crafter
description: "Extracts reusable hooks (e.g., useArXivFetch, useLocalStorage) to isolate side effects from presentation."
license: MIT
triggers:
  - "create useArXivFetch"
  - "extract hook"
  - "make custom hook"
---

# Custom Hook Crafter

When to use this skill

- Use when component logic involves side effects or needs to be shared across components.
- Triggered by requests to move data fetching, pagination, caching, or subscriptions into hooks.

Instructions

1. First Step: Identify repeated data-fetching or local-state patterns and define hook API (inputs, outputs, error handling).

2. Second Step: Implement the hook under `src/hooks/` using `useEffect`, `useRef` for abort controllers, and caching strategies as needed.

3. Third Step: Add unit tests and examples showing usage in components; document returned values and loading/error semantics.

Examples

- `useArXivFetch(query, options)` returns `{ data, loading, error, refetch }` and uses an internal cache keyed by query.

Notes

- Prefer small, focused hooks and keep them composable (e.g., `usePagination` + `useArXivFetch`).
