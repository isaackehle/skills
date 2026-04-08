# Personalization Guide

This skill is public and reusable. Personal values should stay outside the repository in a private local directory.

## Recommended model

Use a private config root that you control and sync across your machines.
Under that root, keep a `job-search/` folder with your private profile.

Expected structure:

```text
<PRIVATE_CONFIG_ROOT>/
└── job-search/
    └── candidate-profile.private.md
```

Example private config roots:

```text
~/Documents/ObsidianVault/private
~/Library/Mobile Documents/com~apple~CloudDocs/Documents/ObsidianVault/private
```

Resulting private profile path:

```text
<PRIVATE_CONFIG_ROOT>/job-search/candidate-profile.private.md
```

## Public repo layout

The public skill stays in your repository, for example:

```text
skills/
└── job-search/
    ├── SKILL.md
    ├── templates/
    ├── examples/
    ├── references/
    ├── docs/
    └── scripts/
```

## Suggested synced vault layout

If you are syncing your skills through an Obsidian vault, a clean structure is:

```text
<ObsidianVault>/
├── skills/
│   ├── job-search/
│   └── other-skill/
└── private/
    └── job-search/
        └── candidate-profile.private.md
```

Then you can point your runtime tools at the synced `skills/` folder and keep `private/` nearby.

## Suggested symlink pattern

Examples:

```text
~/.claude/skills -> <ObsidianVault>/skills
~/.config/opencode/skills -> <ObsidianVault>/skills
```

## What belongs in the private file

- Compensation floor
- Exact location and commute constraints
- Schedule constraints
- Accommodation needs
- Negotiation rules
- Sensitive preferences or concerns

## What belongs in the public repo

- Reusable workflow rules
- Scoring model
- Output templates
- Example files with fake or placeholder values
- Installation and personalization docs

## Private companion skill

If you want a separate local companion skill, keep it outside the public repo and have it point at your real private file.

Example:

```text
~/.claude/skills/job-search-personal/SKILL.md
~/.config/opencode/skills/job-search-personal/SKILL.md
```

That companion skill can define your actual private config root explicitly.
