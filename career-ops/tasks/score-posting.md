# Task: score-posting

## Purpose

Decide whether a posting is worth pursuing: quick screen, focused research, score, decide.

## Inputs

- Posting URL or JD text. Required.
- `{custom}/candidate-profile.md`. Required: comp floor, location, constraints, scoring overrides.
- Prior notes on this company in `{companies}/<company>/`, if any. Check before researching; a company may have been
  screened before.

## Load

- [references/scoring-framework.md](../references/scoring-framework.md)
- [references/research-sources.md](../references/research-sources.md)

## Steps

1. **Fetch.** Get the full JD. If the page is JS-rendered and won't fetch, use the job board mirror or ask for a paste.
   Respect `auto_research`: if it's `ask`, confirm before web research.
2. **Quick screen.** Check the candidate profile's hard constraints: comp floor, location and on-site, level, and any
   excluded sectors. A clear failure stops here with a short Pass note.
3. **Research.** Fill each scoring category from the sources in research-sources.md. Where the platform supports it,
   run one isolated research task per category in parallel. Each one gets the company, role, JD, and only the profile
   fields it needs, and returns a proposed score with evidence.
4. **Score.** Resolve the categories (profile override, otherwise defaults), score each one with evidence, apply any
   bonus rules from the profile, sum, and map to a decision band.
5. **Level check.** Compare title to scope. Flag mismatches against the profile's target level.
6. **Talking points.** List the 3–4 strongest inventory entries for this role by ID. Name them only; don't write
   bullets here.

## Output

Write `{companies}/<company>/roles/<role-id>-scoring.md`: header (posting, date, status Exploring, comp, location,
level), scorecard table with evidence, recommendation, key risks, key opportunities, blockers, screen questions, and
talking points. Then offer [pipeline](pipeline.md) to add it to the matrix.

## Never

- Leave an Evidence cell empty.
- Score Financial Fit above the band its numbers support because the role is otherwise attractive.
- Set status above Exploring.
- Write the comp floor into anything that leaves the workspace.
