# Task: pipeline

## Purpose

Keep the comparison matrix and role files current: add, rescore, change status, archive, review, show.

## Inputs

- `{workspace}/comparison-matrix.md`. Created from the layout in the reference if it's missing.
- The role file and company page for the role in question.
- New information (scoring, interview outcome, comp data, news), or the operation the user asked for.

## Load

- [references/matrix.md](../references/matrix.md)
- [references/scoring-framework.md](../references/scoring-framework.md) (rescore only)

## Operations

- **add:** create the company page and role file from templates if missing ([company-records](company-records.md)),
  then add the matrix row at Exploring. Role file name: `<snake_role>-<job-id>.md`, using the job ID from the posting
  URL when there is one.
- **rescore:** update the scorecard in the role file and add a score-history row, then update the matrix row. Rescoring
  never changes status by itself.
- **status:** confirm the new status with the user, then update the role file, matrix row, and company page, in that
  order. Moving to Rejected, Withdrawn, or Lapsed triggers archiving.
- **archive:** follow the archiving rules in the reference. Confirm before moving a company folder.
- **review:** list stale rows using the staleness thresholds. For each one, offer follow up, keep, or Lapsed. Change
  nothing without an answer.
- **show:** print the matrix grouped by section, P1 first, with the counts. Read-only.

## Output

The updated files, and one line per row changed.

## Never

- Set Pursuing or later without explicit confirmation.
- Delete a row or a file.
- Edit the matrix before the role file.
