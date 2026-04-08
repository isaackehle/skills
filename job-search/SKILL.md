---
name: job-search
description: End-to-end job search workflow skill for opportunity evaluation, resume tailoring, interview prep, live interview note-taking, debriefs, and optional private personalization.
---

# Job Search

Use this skill for a structured job-search workflow from first-look opportunity review through interview follow-up.

## What this skill covers

- Opportunity evaluation
- Resume tailoring
- Recruiter screen preparation
- Interview preparation
- Live interview note-taking
- Post-interview debrief
- Optional private personalization via a local candidate profile

## Inputs
Use any that are available:
- Job description
- Company or recruiter notes
- Resume or base résumé
- Candidate profile
- Interview notes
- Private local profile

If some context is missing, continue with the best available information and explicitly list what is missing.

## Workflow routing

Choose the workflow based on the user’s request.

### 1. Opportunity evaluation
Use `references/opportunity-evaluation.md`.

### 2. Resume tailoring
Use `references/resume-tailoring.md`.

### 3. Interview prep
Use `references/interview-prep.md`.

### 4. Live interview notes
Use `references/interview-note-taker.md`.

### 5. Interview debrief
Use `references/interview-debrief.md`.

## Private personalization

This public skill supports optional private personalization.

Recommended convention:
- Define a private config root locally.
- Under that root, place:
  - `job-search/candidate-profile.private.md`

Examples of possible private config roots:
- `~/Documents/ObsidianVault/private`
- `~/Library/Mobile Documents/com~apple~CloudDocs/Documents/ObsidianVault/private`
- any synced private directory you control

Expected private profile path:

```text
<PRIVATE_CONFIG_ROOT>/job-search/candidate-profile.private.md
```

If a private candidate profile is available, apply it before making recommendations.
If it is not available, continue using public templates and explicitly note missing personal context.

Never expose private values unless the user asks.
Never copy private profile content into public repository files.

See `docs/personalization.md` for the recommended layout.

## Rules
- Do not invent facts.
- Separate evidence from inference.
- Prefer concise structured outputs.
- Use the relevant template from `templates/` when producing structured output.
- Keep private user constraints out of public repo files.
- For interview workflows, distinguish facts, interpretations, and open questions.

## Included files
- `templates/` for blank forms
- `examples/` for non-sensitive filled examples
- `references/` for workflow-specific guidance
- `docs/` for setup and personalization
