# Workspace Setup

## Two Roots

| Variable | Purpose | Recommended Path |
|----------|---------|-----------------|
| `JOB_SEARCH_WORKSPACE` | Working documents and generated artifacts | `~/Obsidian/Documents/primary/job_search/` |
| `PRIVATE_CONFIG_ROOT` | Private configuration and personal constraints | `~/Obsidian/Documents/primary/private/` |

Both roots travel with your Obsidian vault if you use iCloud Sync or Obsidian Sync.

## Workspace Layout

```
job_search/
├── _system/
│   └── job-matrix.md             # The only tracker — single markdown table
├── companies/
│   └── [Company]/
│       ├── [Company].md          # Overview — links to all positions and people
│       ├── job-descriptions/     # One .md file per position
│       ├── interviews/           # Dated prep and debrief files
│       ├── people/               # One file per contact
│       └── resumes/              # Tailored resume versions
├── resume/
│   ├── experience-inventory.md   # Master source — all roles and accomplishments
│   ├── reference-resume-ai-workflows.md
│   └── reference-resume-embedded.md
├── contracting/                  # Contract and fractional leads
├── niche-markets/                # Sector research and search experiments
├── templates/                    # Copies of templates from this skill
└── archive/                      # Old company folders and stale materials
```

## Private Layout

```
private/
└── job-search/
    └── candidate-profile.private.md   # Never committed anywhere
```

## What Never Goes in the Public Repo

- `candidate-profile.private.md`
- `experience-inventory.md`
- Reference resumes
- Tailored resumes
- Company files
- `job-matrix.md`
- Any file with real comp, location, clearance, or personal constraints

## Syncing Across Machines

If your vault is iCloud or Obsidian Sync, it travels automatically. To symlink skills for Claude Code or OpenCode:

```bash
ln -sfn ~/Obsidian/Documents/primary/skills ~/.claude/skills
ln -sfn ~/Obsidian/Documents/primary/skills ~/.config/opencode/skills
```

## First-Time Setup

1. Create `job_search/_system/job-matrix.md` — copy from `examples/job-matrix.example.md`
2. Copy `candidate-profile.template.md` to `private/job-search/candidate-profile.private.md` and fill it in
3. Add your `experience-inventory.md` to `resume/`
4. Start adding companies with `add to matrix`
