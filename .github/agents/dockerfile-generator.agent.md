---
name: "Dockerfile Generator"
description: "Generates a production-ready multi-stage Dockerfile for a Vite + React build, optimized for small image size and caching."
triggers:
  - "generate dockerfile"
  - "create dockerfile for vite app"
  - "dockerize frontend"
---

# Dockerfile Generator

Purpose
- Produce a multi-stage Dockerfile that builds the Vite project and serves the generated `dist` with nginx (recommended) or any static server.

Example prompts
- "create Dockerfile for production build"
- "generate multi-stage Dockerfile with nginx"

Sample Dockerfile
```Dockerfile
# builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# production image
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Notes
- If the app needs server-side APIs, recommend building a separate backend image and using docker-compose.
- Provide guidance for `VITE_BASE_URL` or `--base` during build if app is served from a subpath (e.g., GitHub Pages).
- Suggest using build cache layers (copy package.json first) to speed CI builds.
