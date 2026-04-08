---
name: job-search
description: End-to-end job search workflow for opportunity evaluation, resume tailoring, interview prep, live note-taking, debriefs, and private personalization.
---

# Job Search

Use this skill for structured job-search workflows.

## What this skill covers
- Opportunity evaluation
- Resume tailoring
- Recruiter screen preparation
- Interview preparation
- Live interview note-taking
- Post-interview debrief
- Private personalization via a local candidate profile

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

### Opportunity evaluation
Use `references/opportunity-evaluation.md`.

### Resume tailoring
Use `references/resume-tailoring.md`.

### Interview prep
Use `references/interview-prep.md`.

### Live interview notes
Use `references/interview-note-taker.md`.

### Interview debrief
Use `references/interview-debrief.md`.

## Personalization
If a private candidate profile is available, apply it before making recommendations.

Suggested local private files:
- `~/job-search-private/candidate-profile.private.md`
- `~/.claude/skills/job-search-personal/SKILL.md`
- `~/.config/opencode/skills/job-search-personal/SKILL.md`

Never expose private values unless the user asks.

## Rules
- Do not invent facts.
- Separate evidence from inference.
- Prefer concise structured outputs.
- Use the relevant template from `templates/` when producing structured output.
- Keep private user constraints out of public repo files.
- For interview workflows, distinguish facts, interpretations, and open questions.