---
name: job-search
description: "End-to-end job search skill for Claude Code and OpenCode. Covers opportunity research and scoring, resume tailoring, recruiter screens, interview prep, live note-taking, post-interview debriefs, and job matrix maintenance. Load when the user is evaluating a job posting, prepping for an interview, tailoring a resume, tracking a company, or managing their job search pipeline. Trigger phrases: score this job, add to matrix, tailor resume, prep for interview, debrief, job search, find jobs, searching for work."
license: MIT
metadata:
  author: ikehle
  version: '2.1'
---

# Job Searches

End-to-end job search workflow. Each command below maps to a distinct task. Load reference files as needed — do not load all of them upfront.

## Workspace

All paths are relative to `JOB_SEARCH_WORKSPACE`:

```
JOB_SEARCH_WORKSPACE = <your-vault>/job_search/
PRIVATE_CONFIG_ROOT  = <your-vault>/private/
```

Set these to your actual paths. See `docs/workspace-setup.md` for details.

Expected layout:

```
job_search/
├── comparison-matrix.md             # Single source of truth — the full pipeline tracker
├── companies/
│   └── [Company]/
│       ├── [Company].md          # Company overview, links to all positions
│       ├── job-descriptions/     # One file per position — JD, scoring, status
│       ├── interviews/           # Dated prep and debrief files
│       ├── people/               # One file per contact
│       └── resumes/              # Tailored resume versions for this company
├── resume/
│   ├── experience-inventory.md   # Master source — all roles and accomplishments
│   ├── reference-resume-ai-workflows.md
│   └── reference-resume-embedded.md
├── contracting/
├── niche-markets/
├── templates/
└── archive/
```

Private profile (never in the repo):
```
PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md
```

If private profile exists, apply it before scoring or making recommendations. Never expose private values unless the user explicitly asks.

## Commands

### `score this job`
Research and score one opportunity. Load `references/job-scoring-rules.md`.
- Phase 1: Quick screen (comp floor, GlassDoor, funding/stability)
- Phase 2: Deep research (configurable scorecard — see `references/scoring-defaults.md`)
- Phase 3: Score and decide
- Output: Formatted scorecard ready to paste into the position file

### `add to matrix`
Add or update a company in the job matrix. Load `references/matrix-management.md`.
- Create or update `comparison-matrix.md`
- Create company folder and main file if they don't exist (use `templates/company-note.template.md`)
- Create position file in `companies/[Company]/job-descriptions/` (use `templates/opportunity-input.template.md`)
- Never update the matrix without confirming status first — default is Exploring

### `tailor resume for [Company]`
Create a tailored resume for a specific role. Load `references/resume-build-defaults.md`.
- Source: `resume/experience-inventory.md` + most relevant reference resume
- Output: both `.md` and `.docx` to `companies/[Company]/resumes/`
- Filename: `[CandidateName]-[identifier]` where identifier = job req number, URL uuid, or role title

### `prep for [Company] [stage]`
Create an interview prep document. Load `references/interview-prep.md`.
- Output: dated file at `companies/[Company]/interviews/[Stage]-[Date].md`
- Cover: what the stage is testing, 3–5 strong stories, questions to ask, risks to probe

### `take notes` / `live notes`
Start a structured live note-taking session. Load `references/interview-note-taker.md`.
- Use the note-taking markers from that reference
- Output to `companies/[Company]/interviews/live-notes-[Date].md`

### `debrief [Company] [stage]`
Run a post-interview debrief from live notes. Load `references/interview-debrief.md`.
- Separate facts, interpretations, and open questions
- Output recommendation: advance, pause, withdraw, or unclear

### `search niche markets`
Find new job postings matching the candidate profile. Load `references/niche-markets.md` if it exists, otherwise use `niche-markets/` directory.
- Search job boards directly (LinkedIn, Greenhouse, Lever, Ashby)
- Match against differentiators and comp floor from private profile

### `show matrix` / `pipeline status`
Read and display the current `comparison-matrix.md` in a clean summary format.

### `archive [Company]`
Move a company to archive status in the matrix. Set final status (Rejected, Withdrawn). Do not delete company files — move them to `archive/[Company]/`.

## Hard Rules

- Never assume status = Pursuing. Default is Exploring until the user explicitly confirms.
- Never let Financial Fit slide below comp floor without flagging it.
- Never state the comp floor first in any negotiation context.
- Never skip versioning on file outputs (resume files must be versioned).
- Always check GlassDoor before scoring a company.
- Confirm before any irreversible action (status changes, file moves, matrix updates).
- Prefer action items over open-ended summaries.
- Surface missing context explicitly rather than guessing.

## Reference Files

Load these on demand — only when the relevant command is invoked:

| File | Load when |
|------|-----------|
| `references/ai-tooling-framing.md` | Framing AI tooling experience |
| `references/coaching-guardrails.md` | Coaching style and behavior constraints |
| `references/gap-answers.md` | Scripted answers for tech stack gaps |
| `references/interview-debrief.md` | Post-interview debrief |
| `references/interview-note-taker.md` | Live note-taking during an interview |
| `references/interview-prep.md` | Preparing for an interview stage |
| `references/job-scoring-rules.md` | Scoring a job |
| `references/matrix-management.md` | Adding/updating the job matrix |
| `references/negotiation-rules.md` | Any comp or offer negotiation |
| `references/resume-build-defaults.md` | Tailoring a resume |
| `references/scoring-defaults.md` | Default scoring categories (overridable via private profile) |
| `references/scoring-framework.md` | How to resolve config and apply decision bands |
| `references/tech-stack.md` | Full tech stack reference |


## Deprecated Skills

- 'opportunity-evaluation' — replaced by 'job-scoring-rules' for clarity and actionability