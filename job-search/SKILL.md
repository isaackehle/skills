---
name: job-search
description: End-to-end job search workflow for opportunity evaluation, resume tailoring, interview prep, live note-taking, debriefs, and private personalization.
---

# Job Search

## Workflow commands

- **"Score this job"** -- Phase 1 opportunity analysis. Output structured scores using the 5-category framework. See `references/scoring-framework.md`.
- **"Add to matrix"** -- Update `_system/job-matrix.json` AND `_system/company-comparison-matrix.md`. Create company file under `companies/`. Save the job posting URL in the company file. Status changes and score notes go on the company page, not in the matrix.
- **"Tailor resume for [Company]"** -- Read `resume/experience-inventory.md` + relevant reference resume + job post. Write output to `companies/[Company]/resumes/`. See `references/resume-build-defaults.md`.
- **"Prep for [Company] [stage]"** -- Create dated prep file under `companies/[Company]/interviews/`. See `references/scoring-framework.md`.
- **"Search niche markets"** -- Read `niche-markets/`. Evaluate against differentiators and comp floor from private profile.

## Inputs

Use any that are available:

- Job description
- Company or recruiter notes
- Reference resume document(s)
- Experience inventory (`resume/experience-inventory.md`)
- Candidate profile
- Interview notes
- Private local profile (`PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md`)

If some context is missing, continue with the best available information and explicitly list what is missing.

## Path conventions

- `PRIVATE_CONFIG_ROOT` -- private configuration and personal constraints
- `JOB_SEARCH_WORKSPACE` -- working documents and generated artifacts

`JOB_SEARCH_WORKSPACE` = `~/Obsidian/Documents/primary/job_search/`

Expected workspace layout:

```shell
JOB_SEARCH_WORKSPACE/
├── _system/
│ ├── job-matrix.json
│ └── company-comparison-matrix.md
├── companies/
│ └── [Company]/
│ ├── [Company].md
│ ├── interviews/
│ ├── job-descriptions/
│ ├── people/
│ └── resumes/
├── resume/
│ ├── experience-inventory.md
│ ├── reference-resume-ai-workflows.md
│ ├── reference-resume-embedded.md
│ └── tailored/
├── interviews/
├── templates/
├── contracting/
├── niche-markets/
└── archive/
```

## Reference files

- `references/scoring-framework.md`
- `references/resume-build-defaults.md`
- `references/ai-tooling-framing.md`
- `references/negotiation-rules.md`
- `references/gap-answers.md`
- `references/coaching-guardrails.md`
- `references/tech-stack.md`
- `references/workspace-structure.md`

## Hard rules

- Never assume Pursuing without explicit confirmation. Default is Exploring.
- Never let financial fit slide below comp floor without flagging it.
- Never skip versioning on file outputs.
- Never skip status confirmation before updating the job matrix.
- Always check Glassdoor for nervous system validation.
- Apply private candidate profile before making recommendations if available.
- Never expose private profile values unless the user asks.
