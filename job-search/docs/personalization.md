# Personalization Guide

This skill is public. Personal values and working artifacts stay outside the repository in your private local directory.

## What Lives Where

| Content | Location |
|---------|---------|
| Skill instructions (SKILL.md, references, templates) | Public repo — committed |
| Candidate profile (comp floor, constraints, context) | `PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md` — never committed |
| Experience inventory and reference resumes | `JOB_SEARCH_WORKSPACE/resume/` — never committed |
| Company files, tailored resumes, job matrix | `JOB_SEARCH_WORKSPACE/` — never committed |

## Using the Private Profile

The agent reads `candidate-profile.private.md` automatically if it exists. It applies your:
- Comp floor and negotiation constraints
- Schedule constraints and protected time blocks
- Location and remote requirements
- Burnout / energy context
- Security clearance status
- Mission preferences

The agent will never expose private profile values unless you explicitly ask.

If the private profile is missing, the agent continues using public templates and calls out what context is unavailable.

## Template → Private Profile

Copy `templates/candidate-profile.template.md` to:
```
PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md
```

Fill it in fully. The more complete it is, the less you need to re-explain your constraints in every session.
