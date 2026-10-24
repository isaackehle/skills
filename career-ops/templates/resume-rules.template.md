# Resume Rules — SAMPLE

> Sample for an invented person, Jordan Rivera. The real file lives at `{custom}/resume-rules.md` and is never
> committed. It overrides the skill's references and any older rule files in the workspace.
>
> This file grows from corrections. Whenever the user says "never say X" or "that's wrong," `customize` offers to add a
> line here with the date.

## Precedence

> Q: Are there older rule or style files in your workspace? List them so this file can say it supersedes them.

This file > `resumes/old-style-notes.md`.

## Never write

> Q: Has a resume, letter, or AI draft ever said something about you that was wrong or overstated? What exactly, and
> what's true instead?

| Claim                                          | Status / what's true instead                           | Since      |
| ---------------------------------------------- | ------------------------------------------------------ | ---------- |
| Contoso: "migrated," any uptime or savings     | Proof of concept only, cancelled before cutover        | 2026-01-15 |
| Northwind: "reduced costs"                     | It was a latency fix, not a cost project               | 2026-01-15 |
| Mentoring counts ("mentored 10 engineers")     | Say "mentored engineers," no number                    | 2026-02-02 |

Patterns the verifier script blocks outright (regex, case-insensitive, one per line):

```banned
# comp and level codes never go on a resume
\$\d{2,3}k
\bTTC\b
compensation
\bavailability\b
# retired claims
contoso[^.]*\bmigrat
mentored \d+
```

## Never put on a resume

> Q: Anything that should never appear on a resume, regardless of the role (comp, home address, a former name, a
> clearance for non-defense roles)?

- Compensation of any kind, target level, availability, interview prep, version footers.

## Confirmed numbers

> Q: Which numbers are you fully confident in, and what's the basis for each? (These can be used freely.)

- Northwind: p95 1.2s → 300ms (Grafana before/after).

## Facts that are easy to get wrong

> Q: Exact titles per role? Years of experience and how they're counted? Dates that people tend to get wrong?

- Years of experience: career began June 2012. Compute from that date; don't round up.
- Northwind title is Staff Software Engineer. Never "Principal."

## Format

> Q: Separator style, date style, section order, page limit, how contract roles are shown, where a clearance or patent
> goes?

- Separators: pipes. Contract roles: `Client (Agency)`.
- Page limit: 2.
- ATS keyword coverage target: 75%.

## Open items

> Things the user hasn't settled. Tasks ask instead of deciding.

- None.
