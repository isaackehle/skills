# Workspace Structure

## Roots

| Variable | Purpose |
|---|---|
| PRIVATE_CONFIG_ROOT | Private configuration and personal constraints |
| JOB_SEARCH_WORKSPACE | Working documents and generated artifacts |

Recommended mapping inside an Obsidian vault:

PRIVATE_CONFIG_ROOT = ~/Obsidian/Documents/primary/private
JOB_SEARCH_WORKSPACE = ~/Obsidian/Documents/primary/job_search


## JOB_SEARCH_WORKSPACE layout

job_search/
├── _system/
│ ├── job-matrix.json # Source of truth -- update first
│ └── company-comparison-matrix.md # Regenerate from JSON
├── companies/
│ └── [Company]/
│ ├── [Company].md
│ ├── interviews/
│ ├── job-descriptions/
│ ├── people/
│ └── resumes/
├── resume/
│ ├── experience-inventory.md # Master source document
│ ├── reference-resume-ai-workflows.md
│ ├── reference-resume-embedded.md
│ └── tailored/ # Legacy tailored versions
├── interviews/ # Global interview prep
├── templates/ # Reusable templates
├── contracting/ # Contract and fractional leads
├── niche-markets/ # Sector research and channels
└── archive/ # Old resumes and assets


## PRIVATE_CONFIG_ROOT layout

```shell
private/
└── job-search/
└── candidate-profile.private.md
```

## _system update protocol

1. Update `job-matrix.json` first -- it is the source of truth.
2. Regenerate `company-comparison-matrix.md` from JSON.
3. Sync individual company files under `companies/`.
4. Status changes and score notes go on the company page, not in the matrix.

## companies/ file naming

- One folder per company: `companies/[CompanyName]/`
- Main file: `[CompanyName].md`
- Interviews folder contains dated prep and debrief files
- Job descriptions folder contains PDF and/or Markdown JD
- People folder contains one file per interviewer or contact
- Resumes folder contains tailored versions for that company

## resume/ source hierarchy

1. `experience-inventory.md` -- comprehensive source of truth, all roles and accomplishments
2. `reference-resume-ai-workflows.md` -- baseline resume for AI/platform/fullstack roles
3. `reference-resume-embedded.md` -- baseline resume for embedded/systems roles
4. `tailored/` -- company-specific output versions (also mirrored under companies/)
