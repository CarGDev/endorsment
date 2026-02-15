---
name: bug-hunter
description: "Analyzes console stack traces and source files to suggest likely root causes and pinpoint lines to inspect."
license: MIT
triggers:
  - "analyze stack trace"
  - "find undefined error"
  - "debug crash"
---

# Bug Hunter

When to use this skill

- Use when an uncaught exception or runtime error appears in the dev console or during test runs.
- Triggered by pasting stack traces or describing symptoms such as `undefined` is not a function.

Instructions

1. First Step: Parse the supplied stack trace, map frames to repository files and commit contexts, and verify file paths exist in `src/`.

2. Second Step: Open the suspected file and locate the referenced line; inspect common causes (null/undefined deref, incorrect prop shape, async timing issues).

3. Third Step: Suggest a minimal repro or test and provide a small patch or code comment describing the likely fix.

Examples

- Given: `TypeError: Cannot read property 'map' of undefined at PaperFeed.tsx:42` -> check `papers` prop initialization and defensive checks.

Notes

- Recommend adding guard clauses and unit tests reproducing the failure; avoid speculative fixes without repro.
