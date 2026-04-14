# Workspace Setup

## Two Roots

| Variable | Purpose | Recommended Path |
|----------|---------|-----------------|
| `JOB_SEARCH_WORKSPACE` | Working documents and generated artifacts | `<your-vault>/job_search/` |
| `PRIVATE_CONFIG_ROOT` | Private configuration and personal constraints | `<your-vault>/private/` |

Replace `<your-vault>` with the path to your notes vault (e.g. an Obsidian vault). If your vault syncs via iCloud or Obsidian Sync, both roots travel automatically.

## Workspace Layout

```
job_search/
├── comparison-matrix.md             # The only tracker — single markdown table
├── incoming.md                      # Staging area for job links to process
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

If your vault syncs, skills travel automatically. To symlink skills for Claude Code or OpenCode:

```bash
ln -sfn <your-vault>/skills ~/.claude/skills
ln -sfn <your-vault>/skills ~/.config/opencode/skills
```

## First-Time Setup

1. Create `job_search/comparison-matrix.md` — copy from `examples/job-matrix.example.md`
2. Copy `candidate-profile.template.md` to `private/job-search/candidate-profile.private.md` and fill it in
3. Add your `experience-inventory.md` to `resume/`
4. Start adding companies with `add to matrix`
