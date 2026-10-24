# Task: analyze-jd

## Purpose

Turn a job description into a structured brief that tailor-resume can act on. This task reads the JD and the inventory.
It describes what the JD asks for and where the candidate's evidence is. It does not write resume text.

## Inputs

- JD text (pasted, fetched, or from the role file). Required.
- `{resumes}/experience-inventory.md`. Required.
- `{custom}/resume-rules.md`. Required.
- Company and role name. Required (used for file paths).

## Load

- [references/jd-analysis.md](../references/jd-analysis.md)

## Steps

1. Extract requirements into three lists: **required**, **preferred**, **implied** (scope, level, and culture signals
   from the wording). Quote the JD's own phrasing in each item, kept short.
2. Extract the keyword set: tools, languages, domains, certifications, and responsibilities, deduplicated, in the JD's
   spelling. Mark each one required or preferred.
3. Read the scope signals: level and title vs. actual scope, team size, ownership, customer-facing work, on-site
   expectations. Flag any title/scope mismatch.
4. For each requirement, find inventory evidence. Cite the inventory entry ID (for example `[acme-3]`). Classify it:
   - **Direct:** the inventory shows this exact thing.
   - **Adjacent:** related evidence exists. Name the bridge in one line.
   - **Gap:** no evidence. Never upgrade a gap to adjacent by inference.
5. Pick the base resume (the closest existing variant in `{resumes}`) and say why in one line.
6. Rank the 4–6 inventory entries that carry the most weight for this JD.
7. Compute keyword coverage two ways: (a) the base resume as it is now, (b) the maximum reachable using only direct
   and adjacent inventory evidence. If (b) is under the target in `resume-rules.md`, say so plainly. That number is the
   ceiling; tailoring does not get past it by adding claims.

## Output

Write `{companies}/<company>/roles/<role-id>-jd-analysis.md` with the sections: Requirements, Keywords, Scope Signals,
Evidence Map (requirement → class → inventory IDs), Base Resume, Lead Entries, Coverage (current, ceiling), and Gaps
(with a pointer to the private gap-answer notes if one exists).

Also write `<role-id>-keywords.txt` beside it: one keyword per line, variants separated by `|`, required keywords
prefixed with `!` (for example `!PostgreSQL|Postgres`). verify-resume uses it for coverage.

## Never

- Write or rewrite resume bullets.
- Mark a requirement as met without an inventory ID.
- Count a keyword as coverable when the only evidence is a gap.
- Pull candidate facts from memory or earlier conversations instead of the inventory.
