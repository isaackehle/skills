# Database Schema — comparison-matrix.sqlite

Single source of truth for all DDL. If the `.sqlite` file is corrupted or missing, everything below is sufficient to recreate it.

## Tables

### positions

One row per job description. Rows identified by `(company_slug, role_title)` — not by `id`.

```sql
CREATE TABLE positions (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name    TEXT NOT NULL,
    company_slug    TEXT NOT NULL,
    role_title      TEXT NOT NULL,
    jd_filename     TEXT,
    level           TEXT DEFAULT 'TBD',
    status          TEXT NOT NULL DEFAULT 'Exploring'
        CHECK (status IN ('Exploring','Pursuing','Applied','Screening','Interviewing',
                          'Hold','Future','Offer','Rejected','Withdrawn','Lapsed')),
    score           INTEGER,
    max_score       INTEGER DEFAULT 50,
    comp_range      TEXT DEFAULT 'TBD',
    location        TEXT DEFAULT 'TBD',
    source          TEXT DEFAULT 'TBD',
    source_url      TEXT DEFAULT 'TBD',
    added_date      TEXT NOT NULL,
    notes           TEXT DEFAULT '',
    created_at      TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
    updated_at      TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
    UNIQUE (company_slug, role_title)
);
```

### config

Key-value pipeline settings.

```sql
CREATE TABLE config (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
```

## Indexes

```sql
CREATE INDEX idx_positions_status ON positions(status);
CREATE INDEX idx_positions_company ON positions(company_slug);
CREATE INDEX idx_positions_score ON positions(score DESC);
CREATE INDEX idx_positions_added ON positions(added_date);
```

## Views

### v_positions

Derives section, priority, age prefix, status icon, and CommonMark links from the `positions` table. Age prefix uses `MAX(added_date, DATE(updated_at))` so that the review clock resets when `updated_at` is bumped (e.g., during `review pipeline` Keep decisions).

```sql
CREATE VIEW v_positions AS
SELECT
    p.id,
    p.company_name,
    p.company_slug,
    p.role_title,
    p.jd_filename,
    p.level,
    p.status,
    p.score,
    p.max_score,
    p.comp_range,
    p.location,
    p.source,
    p.source_url,
    p.added_date,
    p.notes,
    p.created_at,
    p.updated_at,
    CASE
        WHEN p.status IN ('Applied','Screening','Interviewing','Offer') THEN 'Active'
        WHEN p.status IN ('Exploring','Pursuing','Hold','Future') THEN 'Potential'
        WHEN p.status IN ('Rejected','Withdrawn','Lapsed') THEN 'Archived'
    END AS section,
    CASE
        WHEN p.status = 'Pursuing' OR (p.score IS NOT NULL AND p.score >= 40) THEN 'P1'
        WHEN p.status = 'Applied' OR (p.status = 'Exploring' AND p.score IS NOT NULL AND p.score BETWEEN 35 AND 39) THEN 'P2'
        WHEN p.status = 'Hold' OR (p.score IS NOT NULL AND p.score < 35) THEN 'P3'
        WHEN p.score IS NULL AND p.status IN ('Exploring','Future','Screening') THEN 'P3'
        ELSE 'P3'
    END AS priority,
    CASE
        WHEN p.added_date IS NULL OR p.added_date = '' THEN ''
        WHEN julianday('now') - julianday(MAX(p.added_date, DATE(p.updated_at))) <= 7 THEN '🟢 '
        WHEN julianday('now') - julianday(MAX(p.added_date, DATE(p.updated_at))) <= 14 THEN '🟡 '
        WHEN julianday('now') - julianday(MAX(p.added_date, DATE(p.updated_at))) <= 28 THEN '🟠 '
        ELSE '🔴 '
    END AS age_prefix,
    CASE p.status
        WHEN 'Exploring'    THEN '🔍'
        WHEN 'Pursuing'     THEN '🚀'
        WHEN 'Applied'      THEN '✅'
        WHEN 'Screening'    THEN '📞'
        WHEN 'Interviewing' THEN '🎯'
        WHEN 'Hold'         THEN '⏸️'
        WHEN 'Future'       THEN '📅'
        WHEN 'Offer'        THEN '🎁'
        WHEN 'Rejected'     THEN '❌'
        WHEN 'Withdrawn'    THEN '➡️'
        WHEN 'Lapsed'       THEN '⏱️'
    END AS status_icon,
    '[' || p.company_name || '](companies/' || p.company_slug || '/' || p.company_slug || '.md)' AS company_link,
    CASE
        WHEN p.jd_filename IS NOT NULL AND p.jd_filename != ''
        THEN '[' || p.role_title || '](companies/' || p.company_slug || '/roles/' || p.jd_filename || ')'
        ELSE '[' || p.role_title || '](companies/' || p.company_slug || '/' || p.company_slug || '.md)'
    END AS role_link
FROM positions p;
```

### v_matrix_sorted

Orders rows by section, then priority, then score descending.

```sql
CREATE VIEW v_matrix_sorted AS
SELECT
    v.*,
    CASE v.section
        WHEN 'Active'    THEN 1
        WHEN 'Potential' THEN 2
        WHEN 'Archived'  THEN 3
    END AS section_order,
    CASE v.priority
        WHEN 'P1' THEN 1
        WHEN 'P2' THEN 2
        WHEN 'P3' THEN 3
    END AS priority_order
FROM v_positions v
ORDER BY section_order, priority_order,
    CASE WHEN v.score IS NULL THEN 999 ELSE -v.score END,
    v.company_name, v.role_title;
```


## Age Indicators

Computed at generation time from `MAX(added_date, DATE(updated_at))`. The clock resets whenever `updated_at` is bumped (e.g. after a rescore or status update).

| Age     | Indicator | Criteria                            |
| ------- | --------- | ----------------------------------- |
| Fresh   | 🟢         | Most recent activity within 7 days  |
| Aging   | 🟡         | Most recent activity 7–14 days ago  |
| Stale   | 🟠         | Most recent activity 14–28 days ago |
| Cold    | 🔴         | Most recent activity 28+ days ago   |
| Unknown | (none)    | Missing or invalid date             |

The `age_prefix` column in `v_positions` prepends this indicator to the `notes` field in the generated markdown. When writing or updating a row, always bump `updated_at` so the age clock resets correctly.

## Seed Data

```sql
INSERT INTO config (key, value) VALUES
    ('comp_floor_base', '200000'),
    ('comp_floor_ttc', '225000'),
    ('default_max_score', '50'),
    ('last_updated', strftime('%Y-%m-%dT%H:%M:%SZ','now'));
```

## WAL Mode

Enable WAL (Write-Ahead Logging) for crash recovery and concurrent read access:

```sql
PRAGMA journal_mode = WAL;
```

## Recovery Procedure

### Backup

```sql
VACUUM INTO 'comparison-matrix.sqlite.backup';
```

Run periodically or before risky operations.

### Restore from backup

```bash
cp comparison-matrix.sqlite.backup comparison-matrix.sqlite
```

### Rebuild from scratch

1. Delete the corrupted `.sqlite` file
2. Create a new empty file
3. Execute all DDL above (tables → indexes → views)
4. Execute seed data INSERT
5. Enable WAL mode
6. If `comparison-matrix.md.pre-sqlite-backup` exists, parse and re-migrate the markdown rows
7. Run `generate_matrix_md.sh` to regenerate the view

### If SQLite is unavailable

The generated `comparison-matrix.md` can be read for display, but all writes are blocked until the database is restored.