---
name: tech-skill-development
description: "Analyze job descriptions for technology gaps, design targeted learning projects, and track skill development progress. Use when the user wants to identify what technologies they need to learn for a specific role, create a project plan for building those skills, or track progress on learning goals. Trigger phrases: skill gap, what do I need to learn, learning plan, tech skills, skill development, build a project to learn."
license: MIT
metadata:
  author: ikehle
  version: "1.0"
---

# Tech Skill Development

Identify technology gaps from job descriptions, design learning projects, and track skill development.

## Workspace

| Preference           | Default Value                   | Internal Alias         |
| :------------------- | :------------------------------ | :--------------------- |
| Workspace root       | ``                              |                        |
| Customization Folder | `{JOB_SEARCH_WORKSPACE}/custom` | `customization_folder` |

Set these to your actual paths.

Expected layout:

```
tech learning/
├── plans/                    # Learning project plans (one per target role)
├── projects/                 # Built project code (referenced from plans)
├── progress.md               # Running progress tracker
└── notes/                    # Technology-specific notes and cheatsheets
```

Cross-reference with job search:

```
job_search/
└── companies/[Company]/
    └── roles/[Role].md   # Source JDs for gap analysis
```

If a custom profile exists at `{customization_folder}/candidate-profile.custom.md`, apply it to understand the candidate's current skill set before performing gap analysis.

## Commands

### `analyze gaps for [url or company/role]`

Extract technologies from a JD and identify skill gaps against the candidate's current profile.

1. **Fetch the JD** from URL or read from `{companies_folder}/[Company]/roles/`
2. **Extract technologies** — categorize into: Languages, Frameworks, Infrastructure, AI/ML, Security, Domain Knowledge
3. **Map to current skills** — using `candidate-profile.custom.md` + `{references_folder}/tech-stack.md` (from job-search skill) + any explicitly stated skills
4. **Rate gap severity** per technology:
   - 🔴 Critical — Required, no production experience
   - 🟠 Significant — Required, partial/related experience only
   - 🟡 Moderate — Required or preferred, conceptual understanding but no hands-on
   - 🟢 Small — Known technology or trivial to pick up
5. **Output:** Gap analysis table saved to `tech learning/plans/[company]-[role]-gaps.md`

### `design learning project for [technology or gap]`

Design a hands-on project to close a specific skill gap.

1. **Load the gap analysis** from `tech learning/plans/` if it exists
2. **Design a project** that:
   - Uses the target technology in a realistic, production-adjacent way
   - Is domain-relevant to the target company (if known)
   - Produces an artifact that's discussable in interviews
   - Takes 1-3 evenings to complete
   - Has clear learning outcomes and interview talking points
3. **Output:** Project plan saved to `tech learning/plans/[project-name].md` with:
   - Architecture diagram (ASCII)
   - Tech stack
   - Key learning outcomes
   - Implementation steps
   - Interview talking points
   - Verification steps

### `plan all gaps for [url or company/role]`

Full pipeline: analyze gaps + design learning projects for all 🔴 and 🟠 gaps.

1. Run `analyze gaps` for the JD
2. For each 🔴 Critical and 🟠 Significant gap, run `design learning project`
3. Determine suggested build order (dependencies between projects)
4. Include quick wins (non-project resources for 🟡 Moderate gaps)
5. **Output:** Combined plan at `tech learning/plans/[company]-[role]-skills.md`

### `track progress`

Update and display skill development progress.

1. Read `tech learning/progress.md`
2. Show status of all active learning projects
3. For each: Not Started / In Progress / Complete
4. Highlight what's next in the build order
5. **Output:** Progress summary

### `mark complete [project]`

Mark a learning project as complete and update progress.

1. Update status in `tech learning/progress.md`
2. Record key takeaways and interview talking points
3. Suggest next project in build order
4. **Output:** Updated progress summary

## Hard Rules

- All internal vault links must use **CommonMark** `[text](<path>)` syntax — not Obsidian `[[wikilink]]` syntax.
- **Never build the project code.** This skill designs plans only. The user or a separate build skill implements them.
- Learning projects must be **hands-on, not tutorial-only.** Every project must produce a runnable artifact.
- Learning projects must be **domain-relevant** when the target company/role is known — mirror their business in the project data.
- Every project plan must include **interview talking points** — the whole point is discussability.
- Gap severity ratings must be **honest**, not optimistic. A technology you've read about but never used is 🟡 at best.
- Distinguish **production experience** from **learning projects** in interview talking points. Never misrepresent a learning project as production work.
- Cross-reference the job-search skill's `{references_folder}/tech-stack.md` and `{references_folder}/gap-answers.md` when available — don't duplicate that knowledge.
- Prefer **composable projects** — later projects should build on earlier ones when possible (e.g., RAG → agents → observability).
- Include **quick wins** for 🟡 Moderate gaps (articles, docs, short exercises) — not everything needs a full project.

## Reference Files

Load these on demand — only when the relevant command is invoked:

| File                                                   | Load when                                |
| ------------------------------------------------------ | ---------------------------------------- |
| `{references_folder}/ai-patterns-catalog.md`           | Designing AI/ML learning projects        |
| `{references_folder}/project-templates.md`             | Scaffolding a new learning project plan  |
| Job-search `{references_folder}/tech-stack.md`         | Mapping candidate's current tech stack   |
| Job-search `{references_folder}/gap-answers.md`        | Scripted answers for known tech gaps     |
| Job-search `{references_folder}/ai-tooling-framing.md` | Framing AI tooling experience accurately |

## Integration with Job Search

This skill is designed to work alongside the `job-search` skill:

- **Input:** JDs and gap analyses from job search scoring
- **Output:** Learning plans that make the candidate stronger for specific roles
- **Shared references:** tech-stack.md, gap-answers.md, ai-tooling-framing.md
- **Progress tracking:** Skill development status can inform job search decisions (e.g., "hold off on applying until RAG project is done")

When the user runs `analyze gaps` with a job-search JD, read the JD file from the job_search workspace rather than re-fetching it.
