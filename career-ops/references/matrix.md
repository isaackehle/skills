# Pipeline Matrix

The matrix is one markdown file, `{workspace}/comparison-matrix.md`. It's the index of every role in play. Details live
in the role files it links to.

## Layout

```markdown
# Comparison Matrix

Last updated: YYYY-MM-DD — [what changed]

> Comp floors and pipeline notes (from the candidate profile; the workspace is private, so this is fine here)

## Screening / Interviewing
## Applied
## Exploring
## Archived
```

Every section has the same table:

| Column     | Content                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| Company    | `[Name](companies/<slug>/<slug>.md)`                                           |
| Role       | `[Title](companies/<slug>/roles/<role-file>.md)`                               |
| Level      | The company's level or title band                                              |
| Priority   | P1 / P2 / P3 (rules below)                                                     |
| Status     | Icon + label from the status table                                             |
| Score      | Total, `—` if unscored, `N/A` if rejected before scoring                       |
| Max        | Scale total (50 by default)                                                    |
| Comp Range | As posted or as told, with source                                              |
| Location   | Remote / hybrid / on-site and where                                            |
| Source     | Where the role came from                                                       |
| Added      | YYYY-MM-DD                                                                     |
| Notes      | Newest event first, separated by `;`, keep older notes                         |

Links are standard markdown links with relative paths. No wikilinks.

## Statuses

| Status       | Icon | Section                |
| ------------ | ---- | ---------------------- |
| Exploring    | 🔍   | Exploring              |
| Pursuing     | 🚀   | Exploring              |
| Applied      | 📤   | Applied                |
| Screening    | 📞   | Screening / Interviewing |
| Interviewing | 🎯   | Screening / Interviewing |
| Offer        | 🎁   | Screening / Interviewing |
| Hold         | ⏸️   | wherever it was        |
| Future       | 📅   | Exploring              |
| Rejected     | ❌   | Archived               |
| Withdrawn    | ➡️   | Archived               |
| Lapsed       | ⏱️   | Archived               |

New rows start at Exploring. Pursuing or later needs the user's explicit word.

## Priority

- **P1:** Pursuing or later, or score at or above the Strong Pursue band.
- **P2:** Applied, or Exploring in the Conditional Pursue band.
- **P3:** everything else.

## Staleness

Prompt (never auto-change) when there's no activity for:

| Status            | Prompt after |
| ----------------- | ------------ |
| Applied           | 14 days      |
| Screening         | 21 days      |
| Exploring         | 30 days      |
| Interviewing      | 30 days      |

The prompt offers: follow up, keep (resets the clock by adding a dated note), or mark Lapsed.

## Update order

Always: role file first, then the matrix row, then the company page. A rescore appends to the role file's score
history:

```markdown
### Score History

| Date       | Score | Change | Reason            |
| ---------- | ----- | ------ | ----------------- |
| YYYY-MM-DD | X/50  | +/- N  | [one-line reason] |
```

## Archiving

- Rejected, Withdrawn, or Lapsed: move the row to Archived, move the role file to `companies/<slug>/archive/`, and
  update the company page's Active and Closed tables.
- If that leaves the company with no active roles, offer to archive the whole company folder to
  `{workspace}/archive/<slug>/`. Confirm first.
- Never delete a row or a file.
