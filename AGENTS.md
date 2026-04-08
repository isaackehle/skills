# AGENTS

This repository is a shared library of skill packs rather than a single-purpose project.

## Intent

Use this repository to browse, copy, adapt, and reuse skill packs.
Each pack may contain one or more skill definitions, templates, examples, and supporting documentation.

## Repository pattern

- Root `README.md` explains the library.
- Each pack lives under `packs/<name>/`.
- Skills for a pack may live under `packs/<name>/.github/skills/`.
- Templates, examples, and docs live alongside the pack.

## Discovery caveat

Some tools only auto-discover skills from a root `.github/skills/` directory.
If you are trying to directly run a specific pack as project skills, copy or mirror that pack into a workspace where its `.github/skills/` folder is at the root.

## Editing guidance

When updating a pack:
- keep public files generic and reusable
- keep private user-specific settings out of the repository
- provide templates for required inputs
- provide examples with fake or placeholder values only
- document how a user should personalize the pack locally
