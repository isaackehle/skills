# Job Matrix Management

The job matrix is a single markdown table at:
`JOB_SEARCH_WORKSPACE/_system/job-matrix.md`

This is the **only** tracker. There is no JSON counterpart.

## Matrix Schema

```markdown
# Job Matrix

Last updated: YYYY-MM-DD

| Company | Role | Level | Status | Score | Comp Range | Location | Source | Added | Notes |
|---------|------|-------|--------|-------|------------|----------|--------|-------|-------|
| [[companies/Acme/Acme]] | Staff SWE — Platform | Staff | 🔍 Exploring | 38/50 | $220k–$260k | Remote | LinkedIn | 2026-04-01 | AI platform team |
```

## Status Values

| Status | Icon | Meaning |
|--------|------|---------|
| Exploring | 🔍 | Initial research — no commitment |
| Pursuing | 🚀 | Active target — preparing to apply |
| Applied | 📨 | Application submitted |
| Screening | 📞 | Recruiter or phone screen active |
| Interviewing | 🎯 | In interview process |
| Hold | ⏸️ | Blocked — waiting on a condition |
| Future | 📅 | No active opening — monitor |
| Offer | 🎁 | Offer received |
| Rejected | ❌ | Application declined |
| Withdrawn | ➡️ | Self-withdrawn |

Default on add: **Exploring**. Never write Pursuing without explicit user confirmation.

## Update Protocol

1. Confirm status with the user before writing.
2. Update `_system/job-matrix.md` — this is the source of truth.
3. Create or update the company folder and main file (`companies/[Company]/[Company].md`).
4. Create the position file in `companies/[Company]/job-descriptions/[Position-Name]-[ID].md`.
5. Score notes and status narrative go on the company/position pages — not in matrix cells.

## Column Definitions

- **Company**: Obsidian wiki-link to company overview file
- **Role**: Role title — link to position file if it exists
- **Level**: IC level (Staff, Principal, Senior, etc.)
- **Status**: Icon + text from table above
- **Score**: X/50 from 5-category scorecard (blank if not yet scored)
- **Comp Range**: Advertised or researched range in $k
- **Location**: Remote / city / hybrid
- **Source**: Where the role was found (LinkedIn, Greenhouse, recruiter, referral)
- **Added**: Date first added (YYYY-MM-DD)
- **Notes**: One-line context, key concerns, or blockers

## Archive

When a role ends (Rejected, Withdrawn, or stale):
- Update status in matrix with final icon
- Add final outcome note in Notes column
- Move company files to `archive/[Company]/` only if no active positions remain

Do not delete matrix rows — the history is valuable.
