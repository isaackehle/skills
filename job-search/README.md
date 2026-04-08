# Job Search

Grouped job-search skill for structured opportunity evaluation, resume tailoring, interview preparation, live interview note-taking, and post-interview debrief.

## What this skill covers

- Opportunity evaluation
- Resume tailoring
- Recruiter and interview prep
- Live interview note-taking
- Post-interview debrief
- Optional private personalization via a local candidate profile

## Inputs

Use any that are available:

- Job description
- Company or recruiter notes
- Reference resume document(s)
- Experience inventory (source document)
- Candidate profile
- Interview notes
- Private local profile

If some context is missing, continue with the best available information and explicitly list what is missing.

## Workspace conventions

This skill expects a local job-search workspace root, referred to here as `JOB_SEARCH_WORKSPACE`.

For your setup, a good mapping inside your Obsidian vault is:

```text
JOB_SEARCH_WORKSPACE = <OBSIDIAN_VAULT>/job_search
```

Recommended structure:

```text
JOB_SEARCH_WORKSPACE/job-search/
├── source/
│   ├── experience-inventory.md
│   ├── reference-resume-ai-workflows.md
│   └── reference-resume-embedded.md
├── companies/
│   └── CompanyXYZ/
│       ├── CompanyXYZ.md
│       ├── CompanyXYZ-product-screenshot.png
│       ├── interviews/
│       ├── job-descriptions/
│       ├── people/
│       └── resumes/
├── contracting/
└── niche-markets/
```

- `source/` holds your global experience inventory and reference resumes (“stuff I’ve done”).
- `companies/` holds per-company workspaces (like the CompanyXYZ example above).
- `contracting/` holds contract/fractional leads, terms, notes, and templates.
- `niche-markets/` holds research, target sectors, channels, and search experiments.

## Private personalization

This public skill supports optional private personalization via a separate root, `PRIVATE_CONFIG_ROOT`.

Under that root, place:

- `job-search/candidate-profile.private.md`

Example private config roots:

```text
~/Documents/ObsidianVault/private
~/Library/Mobile Documents/com~apple~CloudDocs/Documents/ObsidianVault/private
```

Expected private profile path:

```text
PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md
```

If a private candidate profile is available, apply it before making recommendations.
If it is not available, continue using public templates and explicitly note missing personal context.

Never expose private values unless the user asks.
Never copy private profile content into public repository files.

See `docs/personalization.md` for more detail.