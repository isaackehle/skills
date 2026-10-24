# AGENTS

This repository is a shared library of installable skills.

## Intent

Use this repository to browse, copy, adapt, and install grouped skill folders. Each top-level folder is intended to
represent one installable skill, with `SKILL.md` at the root of that folder and optional supporting files nearby.

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

## Commits

Every commit in this repository is authored and committed by the repository owner, `isaackehle`.

- Use the git identity already configured in the clone. Never set, override, or pass a different author or committer.
- Never add AI attribution: no `Co-Authored-By` trailers for an agent, no session links, no "Generated with" lines, in
  commit messages or pull request descriptions.
- If the configured identity is not the owner's, stop and ask instead of committing.

## Runtime guidance

This repository is a source library. The usual workflow is:

1. pick a top-level skill folder
2. copy or symlink it into your runtime skill directory
3. keep your private personalization in local files outside the repo

Example runtime locations:

- `~/.claude/skills/`
- `~/.config/opencode/skills/`
- `~/.agents/skills/`

## Career-ops skill

`career-ops/` is the reference example of the grouped-skill layout: a thin `SKILL.md` router, one file per task in
`tasks/`, generic method in `references/`, sample-filled templates in `templates/`, and scripts in `scripts/`.

Personal data never enters this repo. `career-ops` reads it at runtime from the user's private workspace. The
pre-commit and commit-msg hooks in `career-ops/scripts/hooks/` block commits containing any term from the user's
private term list. Enable them in a clone with:

```shell
git config core.hooksPath career-ops/scripts/hooks
git config career-ops.privateTerms /path/to/workspace/custom/private-terms.txt
```

Do not write implementation summaries, completion reports, or status files into the repo.
