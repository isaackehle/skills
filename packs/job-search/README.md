# Job Search Skill Pack

Reusable Agent Skills for structured job-search workflows.

## Included skills

- `opportunity-evaluation` — evaluate a role with a 5-category scorecard
- `resume-tailoring` — adapt a base resume to a target role
- `interview-prep` — prepare for a specific interview stage
- `interview-note-taker` — capture structured live notes during an interview
- `interview-debrief` — convert notes into decisions, flags, and next steps
- `pipeline-ops` — maintain a local workflow system for notes, scores, and reminders

## Why this pack exists

Many job-search workflows are repetitive but poorly structured:
- role evaluation is inconsistent
- resume tailoring drifts into invented experience
- interview prep is too broad
- interview notes are hard to compare later

This pack provides smaller, focused skills with shared templates so the workflow is reusable and portable across skills-compatible agents.

## Structure

```text
.github/skills/     # Public project skills
templates/          # Shared fill-in templates
```

Each skill is a folder containing a `SKILL.md` and optional supporting templates.

## Public vs private

This pack contains the reusable framework only.

Keep private details outside the repository, such as:
- compensation floor
- location and commute constraints
- schedule or accommodation needs
- negotiation preferences
- personal career priorities

For tools that support personal skills, store those in a user-level skills folder such as `~/.copilot/skills/`.

## Recommended workflow

1. Fill in a private candidate profile using `templates/candidate-profile.template.md`.
2. Fill in `templates/opportunity-input.template.md` for a target job.
3. Run `opportunity-evaluation` for a quick decision.
4. If still viable, run `resume-tailoring`.
5. Before each interview, run `interview-prep`.
6. During the call, use `interview-note-taker`.
7. After the call, run `interview-debrief`.
8. Use `pipeline-ops` only for local tracking workflows.

## Design principles

- Small, focused skills instead of one monolithic prompt
- Public framework separated from private candidate context
- Evidence-first evaluation
- No invented experience
- Structured outputs for easier comparison and automation

## Intended compatibility

These skills are designed around the folder-based Agent Skills pattern used by GitHub Copilot and other compatible tools.
