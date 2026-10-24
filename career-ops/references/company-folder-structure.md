# Company Folder Structure Reference

This document defines the canonical company folder structure used throughout the
job-search skill. All company folders should conform to this layout.

## Expected Structure

```text
companies/<snake_case>/
├── <snake_case>.md                    # Main company page
├── roles/                             # Active role files
│   └── <role_name>-<jobreq_id>.md
├── archive/                           # Archived role files
│   └── <role_name>-<jobreq_id>.md
├── people/                            # Contact files
│   └── <contact_name>.md
├── discussions/                       # Call transcripts, live notes
│   ├── call-YYYY-MM-DD.md
│   └── live-notes-YYYY-MM-DD.md
├── interviews/                        # Interview prep/debriefs
│   └── <Stage>-YYYY-MM-DD.md
└── memory/                            # Auto-research permissions (optional)
    └── allowed_urls.md
```

## Folder Conventions

### Root Company Folder

- **Name:** `<snake_case>` derived from company name
- **Conversion rules:**
  - Convert to lowercase
  - Replace spaces and periods with underscores
  - Remove non-alphanumeric characters (except underscores)
- **Examples:**
  - `Acme Corp.` → `acme_corp`
  - `J. Q. Widgets` → `j_q_widgets`
  - `XYZ, Inc.` → `xyz_inc`

### Main Company Page

- **Filename:** `<snake_case>.md` (matches folder name)
- **Purpose:** Central overview of the company, active positions, people, and research

### Roles Subfolder (`roles/`)

- **Purpose:** Active job opportunities being tracked
- **Filename convention:** `<role_name>-<jobreq_id>.md`
  - `role_name`: snake_case version of the role title (e.g., `software_engineer`)
  - `jobreq_id`: numeric job requisition ID extracted from the posting URL
  - Example: `software_engineer_system_integration-16799744.md`
- **When moving to archive:** Move file to `archive/` subfolder, keep same naming convention

### Archive Subfolder (`archive/`)

- **Purpose:** Inactive or closed role opportunities
- **Filename convention:** Same as `roles/` (`<role_name>-<jobreq_id>.md`)
- **When to archive:**
  - Rejected
  - Withdrawn
  - Lapsed (>30 days inactive for Exploring, >14 days for Applied, >60 days for Interviewing)
  - Expired
  - Offer received

### People Subfolder (`people/`)

- **Purpose:** Contact persons at the company
- **Filename convention:** `<first_name>_<last_name>.md` (snake_case)
- **Examples:**
  - `meghan_domeck.md`
  - `john_smith.md`
- **Content:** Contact details, relationship notes, communication history

### Discussions Subfolder (`discussions/`)

- **Purpose:** Call transcripts and live note-taking sessions
- **Filename conventions:**
  - `call-YYYY-MM-DD.md` - Full call transcripts
  - `live-notes-YYYY-MM-DD.md` - Live notes during a call/meeting
- **Date format:** ISO 8601 (YYYY-MM-DD)

### Interviews Subfolder (`interviews/`)

- **Purpose:** Interview preparation and debrief documents
- **Filename convention:** `<Stage>-YYYY-MM-DD.md`
- **Examples:**
  - `Recruiter-Screen-2024-09-15.md`
  - `Technical-Phone-2024-09-20.md`
  - `Debrief-Hiring-Manager-2024-09-25.md`
- **Stage names:** Use descriptive stage names (e.g., `Recruiter-Screen`, `Technical-Phone`, `Hiring-Manager`,
  `Final-Round`)

### Memory Subfolder (`memory/`) - Optional

- **Purpose:** Store auto-research permissions to avoid repeated confirmation prompts
- **Filename:** `allowed_urls.md`
- **Content:** List of approved domains for automatic research
- **Example:**

  ```markdown
  - https://www.glassdoor.com
  - https://www.crunchbase.com
  ```

## File Naming Best Practices

1. **Snake Case:** Always use lowercase with underscores for folder and file names
2. **No Spaces:** Never use spaces in filenames
3. **No Special Characters:** Avoid parentheses, hyphens (except in role IDs), and other special characters
4. **Consistent Date Format:** Always use ISO 8601 (YYYY-MM-DD) for date-based files
5. **Job Req ID:** Always include the numeric job requisition ID in role filenames when available

## Link Conventions

When creating internal links between files:

1. **From matrix to company:** `[Company Name](companies/acme_corp/acme_corp.md#Section)`
2. **From company to matrix:** `[comparison-matrix](../../comparison-matrix.md#Company)`
3. **From company page to role:** `[Role Name](roles/role-name-jobreq-id.md)`
4. **From company page to person:** `[Contact Name](people/contact_name.md)`
5. **From person to call:** `[Call YYYY-MM-DD](../discussions/call-YYYY-MM-DD.md)`
6. **From company to archived role:** `[Role Name](archive/role-name-jobreq-id.md)`

## Normalization Procedure

When running `normalize company folder` (or aliases `cleanup company folder`, `fix company folder`,
`audit company folder`):

1. **Scan:** List all files and folders in the company directory
2. **Validate:** Check against expected structure and naming conventions
3. **Report:** Show discrepancies found (wrong names, missing folders, orphaned files)
4. **Fix:** Apply corrections (rename files/folders, create missing directories)
5. **Update Links:** Fix all internal markdown links that reference renamed items
6. **Summary:** Report all changes made

## Common Issues to Fix

- **Parentheses in filenames:** `Role (Senior).md` → `role_senior.md`
- **Missing job req ID:** `software_engineer.md` → `software_engineer-123456.md`
- **Wrong folder:** Files in `jobs/` or `positions/` → move to `roles/`
- **Missing directories:** Create `people/`, `discussions/`, `interviews/` if referenced but missing
- **Broken links:** Update all links after renaming files or folders
