# skills

Public skill library — reusable agent skills, scrubbed of fleet-specific
and personal detail.

## Convention

Two repos, one rule:

| Repo                  | Visibility | Contents                                                                                                                                                                                                                                   |
| --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `skills/` (this repo) | Public     | Generic, reusable skills. Nothing here names a machine, IP address, Tailscale hostname, vault path, credential reference, or personal detail (job search, comp, health, family). Everything here should be safe to paste into a blog post. |
| `skills-private/`     | Private    | Skills carrying fleet specifics, personal context, or anything that fails the blog-post test.                                                                                                                                              |

**Sorting rule of thumb:** anything naming a machine, IP, vault path, or
personal circumstance goes in `skills-private/`. When in doubt, private —
promote to public only deliberately, after scrubbing.

**Scrubbing standard:** skills promoted from private to public must have
machine names replaced with hardware-tier placeholders, IPs/hostnames
replaced with `<example>` values, and secrets referenced only as
environment variable names — never values, never vault item paths.

## Deployment

Skills are consumed by tools (Hermes, etc.) via **symlinks** from their
runtime skill directories into this repo:

```bash
ln -s ~/code/isaackehle/skills/<skill-name> ~/.hermes/skills/<skill-name>
```

This repo is the source of truth. Never edit a skill through its symlink
target path in a tool's runtime directory during agent sessions — edit
here, commit, and the symlink picks it up.

## Skill structure

Each skill is a directory containing at minimum a `SKILL.md` with
frontmatter:

```markdown
---
name: skill-name
version: 1.0
category: category-name
description: One line description
---
```

Optional: `references/` for supporting docs, `scripts/` for executables.
No `.bak` files (git history serves that purpose), no `.DS_Store`
(gitignored).

## Plan documents

Any plan document in this repo follows the standard header:

```shell
Created: YYYY-MM-DD
Completed: YYYY-MM-DD  (or — if not yet complete)
Status: Complete | In progress — <reason> | Blocked — <reason>
```
