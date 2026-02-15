---
name: "TSConfig Aliases"
description: "Adds and documents TypeScript path aliases and how to wire them into Vite, Jest/Vitest, and ESLint."
triggers:
  - "add tsconfig paths"
  - "create tsconfig alias mapping"
  - "wire alias to vite and eslint"
---

# TSConfig Aliases

Purpose
- Add `paths` and `baseUrl` to `tsconfig.json` and document the steps to wire the aliases to tooling (Vite, Vitest/Jest, ESLint, IDEs).

Example prompts
- "create tsconfig paths for @/components, @/utils"
- "make imports use @/ alias and configure Vite"

Output
- Suggested `tsconfig.json` patch and example `paths` mapping.

Example tsconfig snippet
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

Wiring notes
- Add `vite-tsconfig-paths` to Vite plugins or set the same aliases in `vite.config.ts`.
- For ESLint resolver, add `eslint-import-resolver-typescript` to `settings.import/resolver`.
- Update IDE settings if necessary (VSCode uses tsconfig by default).

Common pitfalls
- Ensure `baseUrl` is set (often `.`) and that path globs match the file layout.
- Restart the TypeScript server in the editor after changes.
