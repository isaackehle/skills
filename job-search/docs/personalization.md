# Personalization Guide

This skill is public and reusable. Personal values and working artifacts should stay outside the repository, in a private local directory or workspace that you control.

## Roots

Use two local roots:

- `PRIVATE_CONFIG_ROOT` — for private configuration and constraints.
- `JOB_SEARCH_WORKSPACE` — for job-search working documents and artifacts.

### PRIVATE_CONFIG_ROOT

Suggested structure:

```text
PRIVATE_CONFIG_ROOT/
└── job-search/
    └── candidate-profile.private.md
```

This private profile can contain:

- Compensation floor and targets
- Exact location and commute constraints
- Schedule constraints
- Accommodation needs
- Negotiation rules
- Sensitive preferences or concerns
- Contracting preferences (openness to contract, fractional, contract-to-hire, minimum length, preferred scope)
- Niche-market preferences (target markets, channels, job boards to monitor, sectors to avoid)

### JOB_SEARCH_WORKSPACE

Inside an Obsidian vault, a clean mapping is:

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

Use this pattern for additional companies by adding more subfolders under `companies/` (e.g., `companies/CompanyA/`, `companies/CompanyB/`, etc.).

- `source/` holds your global experience inventory and reference resumes, which act as the canonical “stuff I’ve done” source.
- `companies/<Company>/` mirrors your CompanyXYZ-style workspaces: company overview, job descriptions, people, interviews, and per-company resumes.
- `contracting/` can hold contract and fractional leads, notes on terms/scope/rates, and any templates you reuse.
- `niche-markets/` can hold notes on niche sectors and target markets, job boards/channels worth monitoring, and search strategies.

## How the skill uses these roots

- For personalization, the skill reads from `PRIVATE_CONFIG_ROOT/job-search/candidate-profile.private.md` when available.
- For resume and experience context, the skill prefers:
  - `JOB_SEARCH_WORKSPACE/job-search/source/experience-inventory.md`
  - and the relevant `reference-resume-*.md` files.
- For company-specific work, the skill uses folders under `JOB_SEARCH_WORKSPACE/job-search/companies/` that match the opportunity being discussed.

If any of these files or folders are absent, the skill continues with available context and explicitly calls out missing inputs rather than guessing.