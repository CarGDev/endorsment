# GitHub Copilot Agent Skills

This directory contains project-specific skills for GitHub Copilot agents. Skills help Copilot perform specialized tasks in a consistent, repeatable way.

## About Agent Skills

Agent Skills are folders containing instructions, scripts, and resources that Copilot can load when relevant to improve its performance. They work with:
- Copilot coding agent
- GitHub Copilot CLI
- Visual Studio Code agent mode

## Directory Structure

Each skill should be in its own subdirectory with the following structure:

```
.github/skills/
├── skill-name/
│   ├── SKILL.md          # Required: Skill instructions with YAML frontmatter
│   ├── scripts/          # Optional: Helper scripts
│   └── examples/         # Optional: Example files or templates
└── another-skill/
    └── SKILL.md
```

## Creating a New Skill

1. **Create a directory** for your skill with a lowercase, hyphenated name:
   ```
   .github/skills/your-skill-name/
   ```

2. **Create a `SKILL.md` file** with:
   - **YAML frontmatter** containing:
     - `name` (required): Unique identifier (lowercase, hyphenated)
     - `description` (required): When and why to use this skill
     - `license` (optional): Skill license information
   - **Markdown body** with detailed instructions, examples, and guidelines

3. **Add resources** (optional):
   - Scripts, templates, or other files Copilot might need
   - Store them in the same skill directory

## SKILL.md Template

```markdown
---
name: skill-name
description: Brief description of what this skill does and when to use it
license: MIT
---

# Skill Name

Detailed instructions for Copilot to follow when using this skill.

## When to Use

Describe the scenarios where this skill should be applied.

## Instructions

1. Step-by-step guidance
2. Include specific commands or tools to use
3. Provide examples and best practices
```

## Example Skills

Check the `example-skill/` directory for a complete skill template.

## How Copilot Uses Skills

When you interact with Copilot:
1. Copilot analyzes your prompt and context
2. It decides which skills are relevant based on skill descriptions
3. It loads the relevant `SKILL.md` files into its context
4. It follows the instructions and uses any included resources

## Skills vs Custom Instructions

- **Skills**: Detailed, task-specific instructions loaded when relevant (e.g., debugging workflows, testing patterns)
- **Custom Instructions**: Simple, always-active guidelines for your repository (e.g., coding standards, conventions)

## Resources

- [Agent Skills Documentation](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Agent Skills Standard](https://github.com/agentskills/agentskills)
- [Example Skills Repository](https://github.com/anthropics/skills)
- [Awesome Copilot Collection](https://github.com/github/awesome-copilot)
