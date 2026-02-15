---
name: action-dispatcher
description: "Implements store actions for social behaviors (toggleEndorsement, toggleLike, requestEndorsement) and keeps logic testable."
license: MIT
triggers:
  - "generate toggleEndorsement"
  - "create store actions"
  - "add social handlers"
---

# Action Dispatcher

When to use this skill

- Use when adding or changing business logic inside Zustand stores or when moving UI logic into testable actions.
- Triggered by prompts about endorsement toggles, likes, and user profile updates.

Instructions

1. First Step: Implement pure functions for actions where possible (e.g., `addEndorsement(state, payload) => newState`).

2. Second Step: Hook these functions into the store actions so they can be unit-tested separately from UI.

3. Third Step: Add unit tests for each action and ensure edge cases (duplicate endorsements, idempotency) are handled.

Examples

- `toggleLike(paperId, userId)` checks current likes and adds/removes the user id.

Notes

- Keep action functions deterministic and avoid direct DOM or side-effect operations inside them; delegate I/O to services.
