---
name: "Docs Automator"
description: "Keeps README.md and ARCHITECTURE.md in sync as components and agents are added."
triggers:
  - "update docs"
  - "generate architecture"
  - "sync README"
---

# Docs Automator

Purpose
- Automatically update or generate `README.md` and `ARCHITECTURE.md` entries when new Atomic components, stores, or agents are added so judges can easily see structure and how to demo the app.

Example prompts
- "update README with new PaperCard atom"
- "generate ARCHITECTURE.md based on components directory"

Output
- `README.md` (development + demo steps + agent list)
- `ARCHITECTURE.md` (Atomic Design overview + component map)

Example README snippet
```md
# ArXiv Social App (Frontend)

Lightweight React + Vite frontend demonstrating an arXiv social experience for finding endorsers and managing endorsements locally (no backend).

## Agents
- Zustand Sentry — generates persisted Zustand stores
- Vitest Navigator — scaffolds Vitest tests
- A11y Auditor — accessibility suggestions
- Docs Automator — keeps docs in sync

## Dev
1. npm install
2. npm run dev
3. npm run test
```

Notes
- The Docs Automator produces templates and diff-friendly updates so reviewers can see changes in PRs; it intentionally leaves final wording to the author but provides structured starting content.
