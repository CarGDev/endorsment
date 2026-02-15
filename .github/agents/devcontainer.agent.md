---
name: "Devcontainer Generator"
description: "Scaffolds a VS Code devcontainer (Docker-based) for consistent development environments (Node, Docker, extensions)."
triggers:
  - "create devcontainer"
  - "generate .devcontainer"
  - "scaffold codespaces container"
---

# Devcontainer Generator

Purpose
- Create `.devcontainer/devcontainer.json` and optional Dockerfile to provide a reproducible development experience in Codespaces or local VS Code Remote - Containers.

Example prompts
- "create devcontainer for node 18 with yarn and Docker socket"
- "generate container with vscode extensions for react and typescript"

Sample devcontainer.json
```json
{
  "name": "ArXiv Social Dev",
  "image": "mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18",
  "features": {
    "docker-in-docker": "latest"
  },
  "postCreateCommand": "npm ci",
  "customizations": {
    "vscode": {
      "extensions": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint", "ms-vscode.vscode-typescript-next"]
    }
  }
}
```

Notes
- Recommend adding Docker socket bind for local containerized builds and Codespaces compatibility.
- Provide scripts to run `devcontainer` locally and instructions for Codespaces.
