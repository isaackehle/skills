# Skills

Skills I have developed and hope others might find useful.

## Repository layout

This repository is a shared library of installable skills.

Each top-level skill is intended to be usable as its own grouped skill folder, typically with:

- `SKILL.md`
- `{templates_folder}`
- `{references_folder}`
- `examples/`
- `docs/`
- `scripts/`

## Current skills

### `job-search`

An end-to-end job-search workflow skill covering:

- opportunity evaluation
- resume tailoring
- recruiter and interview prep
- live interview note-taking
- post-interview debrief
- private personalization support

Key files:

- `job-search/SKILL.md`
- `{templates_folder}`
- `{references_folder}`
- `job-search/examples/`
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

## Templates

Templates for the different areas live under the `templates` folder:

```shell
job-search/
├── README.md
├── SKILL.md
├── templates/
│   ├── candidate-profile.template.md
│   ├── company-note.template.md
│   ├── interview-stage.template.md
│   ├── live-notes.template.md
│   └── recruiter-screen.template.md
```

| File                          | Purpose                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| candidate-profile.template.md | Public-safe placeholder for private candidate context and guardrails paste.txt                |
| company-note.template.md      | Main company research/evaluation note with score, status, links, and findings paste.txt       |
| interview-stage.template.md   | Prep + debrief doc for a specific round or stage paste.txt                                    |
| live-notes.template.md        | In-call scratchpad for realtime capture during interviews paste.txt                           |
| recruiter-screen.template.md  | Specialized external recruiter screen doc with comp, timeline, and signal gathering paste.txt |
