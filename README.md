# Skills

Skills I have developed and hope others might find useful.

## Repository layout

This repository is a shared library of skill packs.

- `packs/job-search/` — structured workflows for job-search evaluation, resume tailoring, interview prep, live note-taking, debriefs, and pipeline operations.
- Additional packs can be added over time for other domains.

## How to use this repo

This repository is organized for browsing, reuse, and copying.

Each pack may include:
- `.github/skills/` for the actual skill definitions
- `templates/` for blank input files
- `examples/` for non-sensitive sample files
- `docs/` for usage and personalization guidance

## Important note on discovery

Some tools only auto-discover skills from a repository root-level `.github/skills/` directory.

Because this repository is a shared library of packs, many packs keep their skills nested under their own folders, such as:

```text
packs/job-search/.github/skills/
```

That makes the repo easier to organize, but it may mean you need to:
- copy a pack into its own repo,
- open a pack folder as the active workspace, or
- mirror selected skills into a root-level `.github/skills/` directory

if your tool requires root-level discovery.

## Public vs private

This repo contains reusable frameworks and examples.

Keep personal values outside the repo, such as:
- compensation floor
- exact location constraints
- accommodation needs
- negotiation preferences
- personal job-search priorities

## Packs

### `packs/job-search`

A structured job-search skill pack with:
- opportunity evaluation
- resume tailoring
- interview preparation
- interview note-taking
- interview debrief
- local pipeline operations
