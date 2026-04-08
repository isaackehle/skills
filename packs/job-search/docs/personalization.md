# Personalization Guide

This pack contains the public framework only.

## Goal

Keep the reusable workflow in the repository, and keep personal constraints in local private files.

## Recommended pattern

Use three layers:

1. Public template in the repo
2. Public example in the repo with fake values
3. Private real file on your machine

## Suggested files

Public repo files:
- `templates/candidate-profile.template.md`
- `examples/candidate-profile.example.md`
- `examples/opportunity-input.example.md`

Private local files:
- `~/.copilot/skills/job-search-personal/SKILL.md`
- `~/job-search-private/candidate-profile.private.md`

## What belongs in the private file

- Compensation floor
- Actual target compensation
- Exact location and commute constraints
- Schedule constraints
- Accommodation needs
- Negotiation rules
- Sensitive preferences or concerns

## What belongs in the public repo

- Reusable workflow rules
- Scoring model
- Output templates
- Example files with non-sensitive placeholder values
- Documentation explaining how to customize the pack

## Suggested private skill

```md
---
name: job-search-personal
description: Private candidate constraints and preferences for local job-search workflows.
user_invocable: false
---

# Personal Job Search Context

When evaluating opportunities, tailoring resumes, or preparing interviews, load `candidate-profile.private.md` if available.

## Rules
- Apply private constraints before making recommendations.
- Do not reveal private profile details unless asked.
- Do not write private profile content into public repo files.
```
