---
name: build-run-script
description: "Ensures `package.json` scripts for dev, build, preview, lint, test, and format are present and validates environment variable usage before running."
license: MIT
triggers:
  - "add npm scripts"
  - "validate env vars"
  - "run dev build"
---

# Build & Run Script

When to use this skill

- Use when bootstrapping the project's `package.json` scripts or when validating build-time env variables.
- Triggered by requests to add/update `dev`, `build`, `preview`, or helper scripts.

Instructions

1. First Step: Ensure `package.json` contains scripts:
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview --port 4173`
  - `lint`, `test`, `format` helpers as needed.

2. Second Step: Add a script `start:ci` if CI needs to build and run a static server (e.g., `serve -s dist`).

3. Third Step: Validate that required `VITE_` variables are documented and, optionally, verified at runtime with a small pre-flight check.

Examples

- `npm run dev` to start local dev server; `npm run build && npm run preview` to test production output locally.

Notes

- Encourage `cross-env` or platform-neutral approaches when setting env vars in scripts.
