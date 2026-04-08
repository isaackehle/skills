# Skills

Skills I have developed and hope others might find useful.

## Repository layout

This repository is a shared library of installable skills.

Each top-level skill is intended to be usable as its own grouped skill folder, typically with:
- `SKILL.md`
- `templates/`
- `examples/`
- `docs/`
- `references/`
- `scripts/`

## Current skills

### `job-search/`

An end-to-end job-search workflow skill covering:
- opportunity evaluation
- resume tailoring
- recruiter and interview prep
- live interview note-taking
- post-interview debrief
- private personalization support

Key files:
- `job-search/SKILL.md`
- `job-search/templates/`
- `job-search/examples/`
- `job-search/docs/personalization.md`
- `job-search/references/`
- `job-search/scripts/`

## Public vs private

This repository contains reusable skill logic and non-sensitive examples.

Keep personal values outside the repo, such as:
- compensation floor
- exact location constraints
- accommodation needs
- private negotiation preferences
- sensitive career decision criteria

## Installation concept

This repo is designed to work well as a source library.

A typical installation pattern is to copy a top-level skill folder into a local skills directory, for example:

```text
~/.claude/skills/job-search/
~/.config/opencode/skills/job-search/
~/.agents/skills/job-search/
```

The installed skill folder should contain `SKILL.md` at its root.

## Notes

Some older parts of the repository may still reflect the earlier `packs/` layout while the repo is being simplified toward top-level installable skills.
