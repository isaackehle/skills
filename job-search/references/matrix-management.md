# Comparison Matrix Management

The comparison matrix uses **SQLite as the source of truth** with a generated markdown view for Obsidian.

- **Database:** `JOB_SEARCH_WORKSPACE/comparison-matrix.sqlite`
- **Markdown view:** `JOB_SEARCH_WORKSPACE/comparison-matrix.md` (generated, do not edit directly)

The markdown file exists only so Obsidian can render and link to the matrix. All writes go through SQLite, then the markdown is regenerated.

---

## SQLite Schema

Full DDL (tables, indexes, views, seed data, recovery procedure) lives in **`references/db-schema.md`**. This file documents behavior and protocol only.

### Key design decisions

- **Priority is computed**, never stored. P1 = Pursuing OR Score ≥ 40; P2 = Applied OR (Exploring AND 35–39); P3 = everything else.
- **Age indicators are computed** at generation time from `MAX(added_date, DATE(updated_at))`. Never stored as emoji. The `review pipeline` command bumps `updated_at` on Keep decisions to reset the age clock.
- **Section membership is derived** from `status`. Changing status from Exploring to Applied automatically moves a row from Potential to Active.
- **`company_slug`** matches the folder name under `companies/`. **`jd_filename`** is the basename of the JD file under `companies/[slug]/job-descriptions/`.
- **`updated_at`** tracks the last review or interaction — not just the original insert time. The `review pipeline` Keep decision updates this field to reset the age clock.

---

## Markdown Generation

After any write to the `positions` table, regenerate the markdown view:

```bash
bash JOB_SEARCH_WORKSPACE/generate_matrix_md.sh [db_path] [output_path]
```

Default paths: `comparison-matrix.sqlite` and `comparison-matrix.md` in the workspace directory.

The generator:
1. Queries `v_matrix_sorted` grouped by section
2. Emits header, comp floor blockquote, and three section tables
3. Uses CommonMark `[text](<path>)` link syntax (not `[[wikilinks]]`)
4. Writes to `comparison-matrix.md`

### Company file generation

The `positions` table also powers the "Active Positions" and "Closed / Archived Positions" tables in each `[Company].md` file. Query by `company_slug` to regenerate just those sections:

```sql
SELECT role_title, jd_filename, status_icon || ' ' || status,
       CASE WHEN score IS NULL THEN '—/' || max_score ELSE score || '/' || max_score END,
       comp_range, added_date
FROM v_positions
WHERE company_slug = :slug AND section IN ('Active', 'Potential')
ORDER BY section_order, priority_order;
```

When regenerating a company file, **only replace the positions tables** — preserve the manually-written overview, research, and notes sections.

---

## Matrix Column Definitions

| Column | Source | Notes |
|--------|--------|-------|
| Company | `company_name` + `company_slug` → CommonMark link | `[Name](<slug.md>)` |
| Role | `role_title` + `jd_filename` → CommonMark link | `[Title](<jd_filename>)` |
| Level | `level` column | Free-text: Staff, Principal, Senior, etc. |
| Priority | **Computed** from status + score | P1/P2/P3 — never manually set |
| Status | `status` column + `status_icon` from view | Icon + text from status table |
| Score | `score` column | NULL = "TBD" |
| Max | `max_score` column | Default 50 |
| Comp Range | `comp_range` column | Free text |
| Location | `location` column | Free text |
| Source | `source` column | Where the role was found |
| Source URL | `source_url` column | Direct link to posting |
| Added | `added_date` column | YYYY-MM-DD |
| Notes | `notes` column with `age_prefix` prepended | Age prefix is computed, not stored |

---

## Status Values

| Status | Icon | Section |
|--------|------|---------|
| Exploring | 🔍 | Potential |
| Pursuing | 🚀 | Potential |
| Applied | ✅ | Active |
| Screening | 📞 | Active |
| Interviewing | 🎯 | Active |
| Hold | ⏸️ | Potential |
| Future | 📅 | Potential |
| Offer | 🎁 | Active |
| Rejected | ❌ | Archived |
| Withdrawn | ➡️ | Archived |
| Lapsed | ⏱️ | Archived |

Default on add: **Exploring**. Never write Pursuing without explicit user confirmation.

---

## Priority Rules

Priority is **always computed** from status and score:

| Priority | Criteria | Description |
|----------|----------|-------------|
| P1 | Status = Pursuing **OR** Score ≥ 40 | Top targets |
| P2 | Status = Applied **OR** (Exploring AND Score 35–39) | Good candidates |
| P3 | Status = Hold **OR** Score < 35 **OR** TBD | Low priority |

When in doubt, the user decides. To override computed priority, change the status or score.

---

## Age Indicators

Computed at generation time from `MAX(added_date, DATE(updated_at))`:

| Age | Indicator | Criteria |
|-----|-----------|----------|
| Fresh | 🟢 | Most recent activity within 7 days |
| Aging | 🟡 | Most recent activity 7–14 days ago |
| Stale | 🟠 | Most recent activity 14–28 days ago |
| Cold | 🔴 | Most recent activity 28+ days ago |
| Unknown | (none) | Missing or invalid date |

When `review pipeline` keeps a role, `updated_at` is set to now — resetting the age clock to 🟢 without changing the original `added_date`.

---

## Update Protocol

All writes follow this sequence:

1. **Confirm status** with the user before writing (default: Exploring; never assume Pursuing).
2. **Write to SQLite** — `INSERT`, `UPDATE`, or `DELETE` on the `positions` table within a transaction.
3. **Update `config.last_updated`** — set to current timestamp.
4. **Commit the transaction**.
5. **Regenerate `comparison-matrix.md`** — run `generate_matrix_md.sh` or equivalent query.
6. **Update company file** — if the position changed status or score, regenerate the "Active Positions" table in `[Company].md`.
7. **Cross-reference company page status** — when the company overview file includes an "Active Positions" table, include that status in the matrix Notes column.

### Transaction pattern

```sql
BEGIN TRANSACTION;
INSERT INTO positions (company_name, company_slug, role_title, ...) VALUES (...);
UPDATE config SET value = strftime('%Y-%m-%dT%H:%M:%SZ','now') WHERE key = 'last_updated';
COMMIT;
-- Then regenerate markdown (outside the transaction)
```

No lockfile needed — SQLite WAL mode handles concurrent access natively.

### Operation types

| Operation | SQL | When |
|-----------|-----|------|
| Insert | `INSERT INTO positions (...)` | New role added |
| Update | `UPDATE positions SET ... WHERE company_slug = ? AND role_title = ?` | Status, score, notes change |
| Move | `UPDATE positions SET status = ? WHERE ...` | Status crosses section boundary — handled automatically |
| Delete | `DELETE FROM positions WHERE ...` | Role removed (use sparingly; prefer archiving) |

Rows are identified by `(company_slug, role_title)` — not by line number or ID.

---

## Row-Level Status

Each row represents one **job description**, not one company. Companies with multiple open roles get multiple rows.

---

## Archive

When a role ends (Rejected, Withdrawn, or stale):

1. `UPDATE positions SET status = 'Rejected'|'Withdrawn'|'Lapsed', notes = notes || '; ' || :outcome WHERE ...`
2. Regenerate `comparison-matrix.md`
3. Update the company file's "Active Positions" table
4. Move company files to `archive/` only if **no active/potential positions remain** for that company

Do not delete matrix rows — the history is valuable.

---

## Rollback

- **Pre-migration backup:** `comparison-matrix.md.pre-sqlite-backup`
- **SQLite backup:** `VACUUM INTO 'comparison-matrix.sqlite.backup'`
- **If SQLite is corrupted:** See the full recovery procedure in `references/db-schema.md`
- **If SQLite is unavailable:** The markdown file can be read for display, but writes are blocked
