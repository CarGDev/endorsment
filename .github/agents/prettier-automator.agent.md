---
name: "Prettier Automator"
description: "Generates Prettier configuration and optional Husky + lint-staged hooks to auto-format code on commit."
triggers:
  - "setup prettier"
  - "create .prettierrc"
  - "add husky lint-staged"
---

# Prettier Automator

Purpose
- Create a consistent Prettier config and add scripts/hooks to keep code formatted automatically.

Example prompts
- "create .prettierrc and format script"
- "add husky pre-commit to run prettier via lint-staged"

Example .prettierrc
```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
```

Suggested package.json additions
```json
"scripts": {
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,css,scss,md}\""
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write"
  ]
}
```

Husky notes
- `npx husky-init && npm install` then `npx husky set .husky/pre-commit "npx lint-staged"` to hook formatting.
- This agent suggests commands and scaffold snippets; applying hooks requires running the commands locally.
