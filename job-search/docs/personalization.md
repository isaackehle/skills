# Personalization Guide

This skill is public and reusable. Personal values and working artifacts stay outside the repository in a private local directory or synced vault.

## Two local roots

### PRIVATE_CONFIG_ROOT

For private configuration and personal constraints.

Recommended path:

```bash
~/Obsidian/Documents/primary/private/job-search/candidate-profile.private.md
```


This file can contain:
- Compensation floor and current salary
- Phone number and location
- Schedule constraints (Shabbat, protected time)
- Accommodation needs
- Sole provider context
- Burnout or energy management context
- Security clearance details
- Negotiation rules and hard limits
- Contracting preferences
- Niche market priorities and channels to monitor

### JOB_SEARCH_WORKSPACE

For working documents and generated artifacts.

Recommended path:

```shell 
~/Obsidian/Documents/primary/job_search
```


See `references/workspace-structure.md` for the full layout.

## Syncing across machines

If your Obsidian vault is synced via iCloud or Obsidian Sync, both roots travel with the vault automatically. Symlink your runtime tool directories to the vault skills folder:

```shell
ln -sfn ~/Obsidian/Documents/primary/skills ~/.claude/skills
ln -sfn ~/Obsidian/Documents/primary/skills ~/.config/opencode/skills
```

## What stays in the public repo

- SKILL.md
- All references/ files
- All templates/ files
- All examples/ files (with placeholder values only)
- docs/

## What never goes in the public repo

- candidate-profile.private.md
- experience-inventory.md
- reference resumes
- tailored resumes
- company files
- job-matrix.json
- Any file containing real compensation, location, or personal constraints
