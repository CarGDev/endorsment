---
name: "Vite Configurator"
description: "Scaffolds Vite + React + TypeScript configuration (plugins, CSS handling, alias wiring).
Useful for setting up a performant Vite dev server and production build for frontend apps."
triggers:
  - "setup vite"
  - "generate vite.config.ts"
  - "configure vite for react"
---

# Vite Configurator

Purpose
- Create or update `vite.config.ts` for React + TypeScript projects.
- Wire common plugins: `@vitejs/plugin-react`, `vite-tsconfig-paths`, PostCSS/Tailwind support, and env-based base paths.

Example prompts
- "generate vite.config.ts with tsconfig path aliases"
- "configure Vite for Tailwind and CSS modules"

Output
- A suggested `vite.config.ts` with recommended plugins and comments for options to change (base, build.target, chunking).
- Guidance to install packages: `npm i -D vite @vitejs/plugin-react vite-tsconfig-paths`

Sample Vite config (snippet)
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 5173 },
  build: {
    target: 'es2018',
    sourcemap: false,
  },
  resolve: {
    alias: {
      // if not using vite-tsconfig-paths, add manual aliases here
      // '@': '/src'
    }
  }
})
```

Notes
- Recommend `vite-tsconfig-paths` to keep `tsconfig.json` and Vite aliases synchronized.
- If using Tailwind, ensure `postcss.config.cjs` and `tailwind.config.cjs` exist and include Vite's PostCSS pipeline.
- Provide a `preview` script (`vite preview`) for local testing of production builds.
