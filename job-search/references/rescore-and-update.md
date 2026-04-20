# Rescore and Update Protocol

Use this reference any time a position's status, score, or content needs to change after initial creation. Covers three scenarios: status-only updates, rescores triggered by new information, and post-interview updates.

---

## When to Trigger a Rescore

Rescore when new evidence materially changes one or more scoring categories:

| Trigger | Categories likely affected |
|---------|---------------------------|
| Salary range confirmed or corrected | Financial Fit |
| Layoff news, funding round, acquisition | Financial Fit, Nervous System Fit |
| Glassdoor trend shift (new reviews) | Nervous System Fit |
| Interview reveals management quality signals | Nervous System Fit, Strategic Fit |
| Role scope clarified (higher/lower than expected) | Technical Fit, Strategic Fit |
| Comp floor or candidate constraints changed | Financial Fit |
| Interview stage advanced or stalled | Strategic Fit |

If the score changes by 3+ points, treat it as a full rescore. If less, update evidence in the affected category row only.

---

## Update Sequence

Always update in this order — never partial:

1. **JD file** — `companies/[Company]/job-descriptions/[Position]-[ID].md`
2. **Markdown matrix** — `comparison-matrix.md`
3. **SQLite database** — `comparison-matrix.sqlite`
4. **Company overview** — `companies/[Company]/[Company].md` (only if company-level facts changed)

Never update the matrix or sqlite without first updating the JD file. The JD file is the source of truth for score evidence.

---

## JD File Updates

Update the following fields in the JD file header:

```markdown
**Status:** [new status icon + label + date]
**Last Updated:** YYYY-MM-DD
**Score:** [new total]/50
```

In the Scoring table, update affected rows — replace the old score and evidence inline. Do not append a second scoring table. The table is a living record, not a log.

If post-interview notes exist, add them below the scoring table under:

```markdown
### Score History

| Date | Score | Change | Reason |
|------|-------|--------|--------|
| YYYY-MM-DD | X/50 | +/- N | [one-line reason] |
```

---

## Markdown Matrix Updates

Update the row in `comparison-matrix.md`:

- **Status column**: update icon and label
- **Score column**: update to new total (use `N/A` for roles rejected before scoring)
- **Notes column**: prepend the new status event — e.g. `Rejected without discussion 2026-04-20;` — keep prior notes after a semicolon
- **Last updated** date at the top of the file

If status moves to Rejected, Withdrawn, or Lapsed:
- Move the row from Active or Potential section to the **Archived** section
- Do not delete the row

---

## SQLite Updates

The sqlite database at `comparison-matrix.sqlite` mirrors the markdown matrix. Always sync it after any markdown update.

**Download → modify → re-upload sequence:**

```python
# 1. Download via GitHub API
gh api repos/[owner]/job-search-content/contents/comparison-matrix.sqlite
# decode base64 content, write to /tmp/comparison-matrix.sqlite

# 2. Modify with sqlite3
import sqlite3
conn = sqlite3.connect('/tmp/comparison-matrix.sqlite')
cur = conn.cursor()

# Status-only update:
cur.execute("""
    UPDATE positions
    SET status = ?,
        notes = ?,
        updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now')
    WHERE company_slug = ? AND role_title = ?
""", (new_status, new_notes, company_slug, role_title))

# Score update:
cur.execute("""
    UPDATE positions
    SET score = ?,
        status = ?,
        notes = ?,
        updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now')
    WHERE company_slug = ? AND role_title = ?
""", (new_score, new_status, new_notes, company_slug, role_title))

conn.commit()
conn.close()

# 3. Re-upload via GitHub API (include current SHA)
```

**Field mapping from markdown matrix to sqlite:**

| Matrix column | SQLite field |
|--------------|-------------|
| Company | company_name |
| Role | role_title |
| Level | level |
| Status (text only, no icon) | status |
| Score (number only) | score |
| Comp Range | comp_range |
| Location | location |
| Source (text) | source |
| Source (URL) | source_url |
| Added | added_date |
| Notes (without age prefix) | notes |

**Score field rules:**
- Use `NULL` for unscored roles (not `0`, not `-1`)
- Use the integer total only (e.g., `30`, not `"30/50"`)
- Roles rejected before scoring: `score = NULL`, notes indicate "Rejected before scoring"

---

## Status-Only Updates (No Rescore)

When only the status changes (e.g., Applied → Screening, or any → Rejected):

1. Update `**Status:**` and `**Last Updated:**` in the JD file header
2. Update the matrix row status column and notes
3. Update sqlite `status`, `notes`, `updated_at`
4. If moving to Archived: move matrix row to Archived section

Do not touch the scoring table unless evidence changed.

---

## Post-Interview Rescore

After each interview stage (see also `references/interview-debrief.md`):

1. Run debrief to extract scored signals
2. Identify which categories have new evidence
3. Update affected category rows in the JD scoring table with new evidence
4. Recalculate total — update header score and matrix row
5. Add a row to the Score History table in the JD file
6. Update sqlite score field
7. If recommendation tier changed (e.g., Hold → Conditional Pursue), note it explicitly

---

## Hard Rules

- Never leave sqlite out of sync with the markdown matrix after an update
- Never append a second scoring table to a JD file — update the existing one in place
- Never change status to Pursuing without explicit user confirmation
- Score = NULL means not yet scored. Score = 0 is a valid (very low) score — don't conflate them
- Always update `Last Updated` in the JD header and `last updated` at the top of the matrix file
