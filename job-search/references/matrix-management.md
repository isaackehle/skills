# Job Matrix Management

The job matrix is a single markdown table at:
`JOB_SEARCH_WORKSPACE/_system/job-matrix.md`

This is the **primary** tracker. A sqlite database (`comparison-matrix.sqlite`) mirrors it and must be kept in sync. See `references/rescore-and-update.md` for the full update sequence.

## Matrix Schema

```markdown
# Job Matrix

Last updated: YYYY-MM-DD

| Company | Role | Level | Status | Score | Comp Range | Location | Source | Added | Notes |
|---------|------|-------|--------|-------|------------|----------|--------|-------|-------|
| [[companies/Acme/Acme]] | Staff SWE — Platform | Staff | 🔍 Exploring | 38/50 | $220k–$260k | Remote | LinkedIn | 2026-04-01 | AI platform team |

*(Score denominator reflects the active scoring config total. Default is /50.)*
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
2. Update the JD file (`companies/[Company]/job-descriptions/[Position-Name]-[ID].md`) — source of truth for score evidence.
3. Update the markdown matrix (`comparison-matrix.md`).
4. Update the sqlite database (`comparison-matrix.sqlite`) — must stay in sync with the markdown matrix.
5. Create or update the company overview file (`companies/[Company]/[Company].md`) if company-level facts changed.
6. Score notes and status narrative go on the JD file — not in matrix cells.

See `references/rescore-and-update.md` for the full rescore and sqlite update sequence.

## Column Definitions

- **Company**: Link to company overview file (wiki-link if vault supports it)
- **Role**: Role title — link to position file if it exists
- **Level**: IC level (Staff, Principal, Senior, etc.)
- **Status**: Icon + text from table above
- **Score**: X/{total} from the active scoring config (blank if not yet scored)
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
