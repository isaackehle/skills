# AGENTS

This repository is a shared library of installable skills.

## Intent

Use this repository to browse, copy, adapt, and install grouped skill folders.
Each top-level folder is intended to represent one installable skill, with `SKILL.md` at the root of that folder and optional supporting files nearby.

## Repository pattern

A typical skill folder looks like:

```text
skill-name/
├── SKILL.md
├── templates/
├── examples/
├── docs/
├── references/
└── scripts/
```

## Editing guidance

When updating a skill:

- keep public files generic and reusable
- keep private user-specific settings out of the repository
- provide templates for required inputs
- provide examples with fake or placeholder values only
- document how a user should personalize the skill locally

## Runtime guidance

This repository is a source library. The usual workflow is:

1. pick a top-level skill folder
2. copy or symlink it into your runtime skill directory
3. keep your private personalization in local files outside the repo

Example runtime locations:

- `~/.claude/skills/`
- `~/.config/opencode/skills/`
- `~/.agents/skills/`

## Job-search skill

The `job-search/` folder is the current reference example of the intended grouped-skill layout.
