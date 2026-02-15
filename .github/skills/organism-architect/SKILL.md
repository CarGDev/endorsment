---
name: organism-architect
description: "Builds Organisms like PaperFeed or UserProfileCard by wiring Molecules, handling layout and local UI logic."
license: MIT
triggers:
  - "create PaperFeed"
  - "assemble organism"
  - "build UserProfileCard"
---

# Organism Architect

When to use this skill

- Use when creating page sections that aggregate molecules and small stateful interactions.
- Triggered by prompts to scaffold feed components, lists, or composite UI patterns.

Instructions

1. First Step: Design the organism's responsibilities (data fetching vs. purely presentational) and choose which molecules it composes.

2. Second Step: Implement the organism under `src/components/organisms/`, use hooks for data and local UI state, and expose minimal props for customization.

3. Third Step: Add skeletons or loading states (spinners/skeleton cards) and tests verifying interactions and accessibility.

Examples

- PaperFeed: fetches a list of papers via `useArXivFetch`, renders `PaperCard` molecules, supports infinite scroll or pagination.

Notes

- Keep organisms at the page level; avoid adding global app logic here—use stores or modules for cross-cutting concerns.
