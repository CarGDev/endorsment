---
name: "CI Workflow Generator"
description: "Scaffolds a GitHub Actions workflow for install, lint, test, and build; optionally builds and pushes Docker images."
triggers:
  - "create ci workflow"
  - "generate github actions for frontend"
  - "ci for vite react"
---

# CI Workflow Generator

Purpose
- Provide a reusable GitHub Actions workflow to run installs, linters, tests (Vitest), and build steps for a Vite app.

Example prompts
- "create .github/workflows/ci.yml to run tests and build"
- "add workflow to build and push Docker image"

Workflow outline
- Runs on push/pull_request
- Steps: checkout, cache node modules, install, run lint, run tests, run build
- Optional: on push to main build and push Docker image to registry (requires secrets)

Sample job YAML (high-level)
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint --if-present
      - run: npm run test --if-present
      - run: npm run build
```

Notes
- Include caching for node modules (actions/cache) to speed up runs.
- If adding Docker publish, recommend using `docker/build-push-action` with `secrets.DOCKERHUB_TOKEN` or GHCR.
