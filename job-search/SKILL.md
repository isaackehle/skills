---
name: job-search
description: "End-to-end job search skill for Claude Code and OpenCode. Covers opportunity research and scoring, resume tailoring, recruiter screens, interview prep, live note-taking, post-interview debriefs, and comparison matrix maintenance. Load when the user is evaluating a job posting, prepping for an interview, tailoring a resume, tracking a company, or managing their job search pipeline. Trigger phrases: score this job, add to matrix, tailor resume, prep for interview, debrief, job search, find jobs, searching for work."
license: MIT
metadata:
  author: ikehle
  version: '3.0'
---

# Job Searches

End-to-end job search workflow. Each command below maps to a distinct task. Load reference files as needed — do not load all of them upfront.

## Workspace

All paths are relative to `JOB_SEARCH_WORKSPACE`:

```
JOB_SEARCH_WORKSPACE = <your-vault>/job_search/
PRIVATE_CONFIG_ROOT  = <your-vault>/private/
```

Set these to your actual paths. See `docs/workspace-setup.md` for details.

Expected layout:

```
job_search/
├── comparison-matrix.sqlite        # Source of truth — SQLite database
├── comparison-matrix.md             # Generated view for Obsidian (do not edit directly)
├── generate_matrix_md.sh            # Markdown generator script
├── companies/
│   └── [Company]/
│       ├── [Company].md          # Company overview, links to all positions
│       ├── job-descriptions/     # One file per position — JD, scoring, status
│       ├── interviews/           # Dated prep and debrief files
│       ├── people/               # One file per contact
│       └── resumes/              # Tailored resume versions for this company
├── resume/
│   ├── experience-inventory.md   # Master source — all roles and accomplishments
│   ├── reference-resume-ai-workflows.md
│   ├── reference-resume-embedded.md
│   └── cover-letter-template-v1.dotx  # Branded cover letter template
├── contracting/
├── niche-markets/
├── templates/
└── archive/
```

Private profile (never in the repo):
```
PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md
```

If private profile exists, apply it before scoring or making recommendations. Never expose private values unless the user explicitly asks.

## Commands

### `score this job`
Research and score one opportunity. Load `references/job-scoring-rules.md`.
- Phase 1: Quick screen (comp floor, GlassDoor, funding/stability)
- Phase 2: Deep research (configurable scorecard — see `references/scoring-defaults.md`)
- Phase 3: Score and decide
- Output: Formatted scorecard ready to paste into the position file

### `add to matrix`
Add or update a role in the comparison matrix. Load `references/matrix-management.md`.
- Write to `comparison-matrix.sqlite` (INSERT or UPDATE) — never edit the `.md` file directly
- Regenerate `comparison-matrix.md` by running `generate_matrix_md.sh`
- Each row links to both the company file and the JD file
- Priority and section are computed from status and score — never set manually
- Create company folder and main file if they don't exist (use `templates/company-note.template.md`)
- Never update the matrix without confirming status first — default is Exploring
- When the company overview file includes an "Active Positions" table or role-level status, include that status in the matrix Notes column

### `tailor resume for [Company]`
Create a tailored resume for a specific role. Load `references/resume-build-defaults.md`.
- Source: `resume/experience-inventory.md` + reference resume
- If multiple reference resume versions are found (by name or in subfolders under `resume/reference/`), ask the user which one to use before proceeding
- Output: both `.md` and `.docx` to `companies/[Company]/resumes/`
- Filename: `[CandidateName]-[identifier]` where identifier = job req number, URL uuid, or role title

### `write cover letter for [Company]`
Create a cover letter for a specific role using the branded template.
- Template: `resume/cover-letter-template-v1.dotx` (or latest `cover-letter-template*.dotx` in `resume/` or `templates/`)
- If no `.dotx` template found, fall back to plain format (Arial 11pt, 1" margins)
- Content source: company research + JD analysis + `templates/cover-letter-template.md` for structure guidance
- Output: both `.md` and `.docx` to `companies/[Company]/resumes/`
- Filename: `cover-letter-[Company]-v1`
- When generating `.docx`, unpack the `.dotx` template to extract exact styling (fonts, colors, spacing, paragraph formatting) and reproduce it using docx-js
- Template placeholders: `[Company]`, `[Role]`, `[Paragraph N]` — replace with tailored content

### `prep for [Company] [stage]`
Create an interview prep document. Load `references/interview-prep.md`.
- Output: dated file at `companies/[Company]/interviews/[Stage]-[Date].md`
- Cover: what the stage is testing, 3–5 strong stories, questions to ask, risks to probe

### `take notes` / `live notes`
Start a structured live note-taking session. Load `references/interview-note-taker.md`.
- Use the note-taking markers from that reference
- Output to `companies/[Company]/interviews/live-notes-[Date].md`

### `debrief [Company] [stage]`
Run a post-interview debrief from live notes. Load `references/interview-debrief.md`.
- Separate facts, interpretations, and open questions
- Output recommendation: advance, pause, withdraw, lapse, or unclear

### `search niche markets`
Find new job postings matching the candidate profile. Load `references/niche-markets.md` if it exists, otherwise use `niche-markets/` directory.
- Search job boards directly (LinkedIn, Greenhouse, Lever, Ashby)
- Match against differentiators and comp floor from private profile

### `queue [url]`
Append a job link to `job_search/incoming.md` for later batch processing. Does **not** score or research the link now.
- Append the URL on a new line to `incoming.md`, along with a comment line with the date queued
- Format: `<!-- queued YYYY-MM-DD -->\n<url>`
- If `incoming.md` starts with a "processed" notice (e.g., `Processed on YYYY-MM-DD`), replace that notice with the new entries
- If the URL already appears in the file (not inside a comment), skip it and tell the user it's already queued
- Confirm to the user that the link was queued and remind them to run `process incoming` when ready

### `process incoming`
Batch-process all job links in `job_search/incoming.md`. For each link:
- Fetch the JD and score it using the standard scoring workflow
- Create company folder and position files as needed
- Add or update entries in `comparison-matrix.sqlite`
- Remove the processed line from `incoming.md`
- Report results as a summary

### `show matrix` / `pipeline status`
Query `comparison-matrix.sqlite` directly and display results grouped by section (Active, Potential, Archived).

### `review pipeline`
Walk through roles needing attention and decide per role: Lapse, Withdraw, Keep, or Skip. Load `references/matrix-management.md`.
- **Selection order:** Active roles (Applied/Screening/Interviewing) with no activity 14+ days → Potential roles (Exploring) added 28+ days (🔴 Cold) → Potential roles added 14–28 days (🟠 Stale)
- **Per-role interaction:** Display company, title, status, age, score, notes. Ask: Lapse, Withdraw, Keep, or Skip.
  - **Lapse** → status = `Lapsed`, notes updated with reason
  - **Withdraw** → status = `Withdrawn`, notes updated with reason
  - **Keep** → `updated_at` set to now (resets age clock to 🟢); no status change
  - **Skip** → no changes, move to next role
- **Hard rules:**
  - Never auto-lapse — always require explicit user confirmation per role
  - Never change status from Active (Applied/Screening/Interviewing) to Lapsed without flagging that this was an active application — suggest Withdrawn instead
  - Keep resets the review clock by updating `updated_at` — not `added_date`
- **After all decisions:** Regenerate `comparison-matrix.md`, report summary (X lapsed, Y withdrawn, Z kept, W skipped)

### `rebuild db`
Emergency command to recreate `comparison-matrix.sqlite` from scratch. Load `references/db-schema.md`.
1. Back up the existing `.sqlite` file if present
2. Create new `.sqlite` file
3. Execute all DDL from `references/db-schema.md` (tables → indexes → views)
4. Seed `config` table
5. Enable WAL mode
6. If `comparison-matrix.md.pre-sqlite-backup` exists, parse and re-migrate (legacy fallback)
7. Regenerate `comparison-matrix.md`

### `archive [Company]`
Move all roles for a company to Archived status in the matrix. Set final status (Rejected, Withdrawn, Lapsed). Move company files to `archive/[Company]/` only if no active positions remain.

### `delete [Company] [role]` / `delete [id]`
Remove a role from the comparison matrix and clean up associated files.
1. **Delete from `comparison-matrix.sqlite`** — use `DELETE FROM positions WHERE id = ?` (by row ID) or `WHERE company_slug = ? AND role_title = ?` (by company + title). If the user provides a job ID (e.g., `f9a8d518`, `b1748497`), match against `jd_filename` or `source_url` to find the row.
2. **Delete the JD file** from `companies/[Company]/job-descriptions/` if it exists.
3. **Update the company overview file** (`companies/[Company]/[Company].md`):
   - Move the role from Active to Closed/Removed in the Positions table
   - Remove from any Open Engineering Roles or similar tables
   - Update `Last Updated` date
   - If no active positions remain, suggest running `archive [Company]`
4. **Regenerate `comparison-matrix.md`** by running `generate_matrix_md.sh`
5. **Confirm** what was deleted — report the role title, company, JD file, and matrix row

**Hard rules:**
- Always confirm before deleting — show the user what will be removed
- If the role is the only one for a company, warn the user that the company will have no remaining positions
- Never delete a company folder or company overview file — only JD files for the specific role

## Hard Rules

- All internal vault links must use **CommonMark** `[text](<path>)` syntax — not Obsidian `[[wikilink]]` syntax. The vault uses the **Better Markdown Links** plugin, which resolves CommonMark links with spaces and Unicode in paths. Per [CommonMark spec](https://commonmark.org/), wrap link destinations containing spaces in angle brackets: `[Acme](<Acme/Acme.md>)`, not `[[Acme/Acme]]`.
- **Never edit `comparison-matrix.md` directly.** All matrix writes go through `comparison-matrix.sqlite`, then the markdown is regenerated via `generate_matrix_md.sh`.
- Never assume status = Pursuing. Default is Exploring until the user explicitly confirms.
- Never let Financial Fit slide below comp floor without flagging it. Comp floor = $225K TTC minimum AND $200K base minimum.
- Never state the comp floor or base minimum first in any negotiation context.
- Flag any role where base salary is below $200K (hard floor) or TTC is below $225K.
- Never skip versioning on file outputs (resume files must be versioned).
- Always check GlassDoor before scoring a company.
- Confirm before any irreversible action (status changes, file moves, matrix updates).
- Prefer action items over open-ended summaries.
- Surface missing context explicitly rather than guessing.
- **Unscored roles must include a reason.** When a role has no score, always explain why in the `notes` field prefixed with `⏳` (e.g., `⏳ JD behind auth wall; comp TBD`). Never leave a score gap without a ⏳ reason. Use the correct score value depending on status:
  - **Rejected or Withdrawn:** Score is `N/A` — these roles were never scored because the process ended before scoring. Set `score = -1` (the generate script renders -1 as N/A). The ⏳ reason should say "Rejected before scoring" or "Withdrawn before scoring".
  - **All other statuses:** Score is `TBD` — these roles haven't been scored yet but may be in the future. The ⏳ reason should explain what's blocking the score (e.g., "⏳ Comp range not confirmed", "⏳ Awaiting recruiter response", "⏳ JD behind auth wall").
- Each matrix row = one job description, not one company. Companies with multiple roles get multiple rows.
- Split Score and Max into separate columns (e.g., 39 | 50, not 39/50).
- Link both the company file and the JD file in each row.
- Priority is computed from status + score — never set manually.
- Source URLs in the matrix are rendered as markdown links using just the domain as display text: `[lever.co](<full-url>)`, `[ashbyhq.com](<full-url>)`, `[greenhouse.io](<full-url>)`, etc. Store the full URL in `source_url`; use `source` for the short domain/platform name. The `generate_matrix_md.sh` script combines them automatically.
- The `updated_at` column tracks the last review/interaction — `review pipeline` updates it on Keep decisions to reset the age clock. Never update `added_date` for this purpose.

## Reference Files

Load these on demand — only when the relevant command is invoked:

| File | Load when |
|------|-----------|
| `references/ai-tooling-framing.md` | Framing AI tooling experience |
| `references/coaching-guardrails.md` | Coaching style and behavior constraints |
| `references/db-schema.md` | Full SQLite DDL, views, seed data, recovery procedure |
| `references/fetch-permission.md` | Data fetch permission rules for scoring |
| `references/gap-answers.md` | Scripted answers for tech stack gaps |
| `references/interview-debrief.md` | Post-interview debrief |
| `references/interview-note-taker.md` | Live note-taking during an interview |
| `references/interview-prep.md` | Preparing for an interview stage |
| `references/job-scoring-rules.md` | Scoring a job |
| `references/matrix-management.md` | Adding/updating the job matrix |
| `references/negotiation-rules.md` | Any comp or offer negotiation |
| `references/resume-build-defaults.md` | Tailoring a resume |
| `references/scoring-defaults.md` | Default scoring categories (overridable via private profile) |
| `references/scoring-framework.md` | How to resolve config and apply decision bands |
| `references/tech-stack.md` | Full tech stack reference |
| `resume/cover-letter-template-v1.dotx` | Branded cover letter template (styling source for `.docx` output) |


## Deprecated Skills

- 'opportunity-evaluation' — replaced by 'job-scoring-rules' for clarity and actionability