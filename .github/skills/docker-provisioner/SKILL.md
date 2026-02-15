---
name: docker-provisioner
description: "Generates a multi-stage Dockerfile for production builds of the Vite + React app and provides guidance for Docker Compose/CI."
license: MIT
triggers:
  - "generate dockerfile"
  - "dockerize frontend"
---

# Docker Provisioner

When to use this skill

- Use when packaging the frontend for production or preparing a devcontainer/Codespaces image.
- Triggered by commands to create or update a `Dockerfile` and `docker-compose.yml` for static serving.

Instructions

1. First Step: Generate a multi-stage `Dockerfile` that builds the app in a Node builder stage and serves the `dist` via `nginx` or a minimal static server.

2. Second Step: Optionally create `docker-compose.yml` for local runs and include build args to pass environment variables.

3. Third Step: Add CI steps to build and optionally push Docker images to GHCR or Docker Hub with secrets managed in the repository settings.

Examples

- Multi-stage Dockerfile snippet provided and notes about caching `node_modules` layers.

Notes

- Document how to set `VITE_` prefixed env vars at build time and how to use `npm run preview` for local tests.
