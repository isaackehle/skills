# Job Search Skill Pack

Reusable Agent Skills for structured job-search workflows.

## Included skills

- `opportunity-evaluation` — evaluate a role with a 5-category scorecard
- `resume-tailoring` — adapt a base resume to a target role
- `interview-prep` — prepare for a specific interview stage
- `interview-note-taker` — capture structured live notes during an interview
- `interview-debrief` — convert notes into decisions, flags, and next steps
- `pipeline-ops` — maintain a local workflow system for notes, scores, and reminders

## Included support files

- `templates/` — blank files to copy and fill in
- `examples/` — fake filled-in examples showing the expected level of detail
- `docs/personalization.md` — how to keep personal constraints private while using the pack

## Recommended workflow

1. Copy `templates/candidate-profile.template.md` to a private file outside the repo.
2. Fill in `templates/opportunity-input.template.md` for each target role.
3. Run `opportunity-evaluation` for a first-pass decision.
4. If still viable, run `resume-tailoring`.
5. Before each interview, run `interview-prep`.
6. During the interview, use `interview-note-taker`.
7. After the interview, run `interview-debrief`.
8. Use `pipeline-ops` for local workflow maintenance only.

## Public vs private

This pack is public and reusable.

Keep your real values in a private local file, for example:

```text
~/.copilot/skills/job-search-personal/SKILL.md
~/job-search-private/candidate-profile.private.md
```

Do not commit sensitive compensation, location, accommodation, or negotiation details to the public repository.

## Discovery note

The skills for this pack live under:

```text
packs/job-search/.github/skills/
```

That is ideal for a shared library repo, but some tools may only auto-discover skills from a root-level `.github/skills/` directory. If needed, copy or mirror this pack into its own workspace when using it directly.
