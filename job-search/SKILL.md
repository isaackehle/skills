---
name: job-search
description: "End-to-end job search skill for Claude Code and OpenCode. Covers opportunity research and scoring, resume tailoring, recruiter screens, interview prep, live note-taking, post-interview debriefs, and job matrix maintenance. Load when the user is evaluating a job posting, prepping for an interview, tailoring a resume, tracking a company, or managing their job search pipeline. Trigger phrases: score this job, add to matrix, tailor resume, prep for interview, debrief, job search, find jobs, searching for work."
license: MIT
metadata:
  author: ikehle
  version: "3.3.0"
---

# Job Search

End-to-end job search workflow. Each command below maps to a distinct task. Load reference files as needed — do not load all of them upfront.

## Internal Aliases

| Preference               | Default Value                       | Internal Alias         |
| :----------------------- | :---------------------------------- | :--------------------- |
| Customization Folder     | `{JOB_SEARCH_WORKSPACE}/custom`     | `customization_folder` |
| Resumes Folder           | `{JOB_SEARCH_WORKSPACE}/resumes`    | `resumes_folder`       |
| Companies Folder         | `{JOB_SEARCH_WORKSPACE}/companies`  | `companies_folder`     |
| References Folder        | `{JOB_SEARCH_WORKSPACE}/references` | `references_folder`    |
| Templates Folder         | `{JOB_SEARCH_WORKSPACE}/templates`  | `templates_folder`     |
| Auto-Research Preference | `ask`                               | `auto_research`        |

## Config Discovery

On the first invocation of any command in a session, run config discovery. **Priority: Always check `AGENTS.md` in the customization folder (if available) before asking the user for a workspace preference.**

### Step 1: Verify Workspace Root

1. **Check memory** for `job_search_workspace` (absolute path to workspace root).
2. If found, verify the path exists on disk. If valid, proceed to Step 2.
3. If missing or invalid, ask: **"What is the absolute path to your job search workspace?"**
4. Once you have the workspace path, ask: **"Should I scan this workspace to discover existing content (resumes, company folders, templates, etc.)?"** (yes/no, default: yes)

### Step 2: Locate and Load Candidate Profile

1. Check memory for `candidate_profile_path`.
2. If missing, check the default location: `{customization_folder}/candidate-profile.md` or `{customization_folder}/candidate-profile.*.md`.
3. If found:
   - Read the file to extract candidate-specific data (experience, target roles, etc.).
   - **Migration Check:** Check for a `## Workspace Config` section. If found, extract the preferences and migrate them to `AGENTS.md` in the customization folder, then remove the section from the candidate profile to ensure a single source of truth.
4. If not found, ask: **"Do you have an existing candidate profile, or should I help you create one?"**
   - **If yes:** Ask for the path to the profile file.
   - **If no:** Create a new profile using `{templates_folder}/candidate-profile.template.md` in the default customization folder.
5. Store the final profile path in memory.

### Step 3: Resolve Preferences (Read-Before-Ask)

For each of the internal aliases (above), first check the `## Workspace Config` section of `AGENTS.md` in the customization folder. If a value is present, use it and skip the question. If missing or the user wishes to change it, ask the user and **immediately write the answer back to `AGENTS.md` in the customization folder**.

### Step 4: Save Final Config to Memory

Immediately after resolution, write the following to session memory:

- `job_search_workspace`
- `customization_folder`
- `candidate_profile_path`
- `resumes_folder`
- `companies_folder`
- `references_folder`
- `templates_folder`
- `base_floor` (from candidate profile)
- `ttc_floor` (from candidate profile)
- `auto_research` (from candidate profile)

On every new session, re-check memory and the candidate profile before asking questions.

---

### Resume Folder Structure

If the user confirms or creates a `resumes/` folder, explain the expected structure:

```
resumes/
├── focus-area-1/
│   ├── prompt.md              # Positioning guide for this focus
│   ├── resume-v1.md
│   └── resume-v2.md
├── focus-area-2/
│   ├── prompt.md
│   └── resume.md
└── general/
    └── resume.md
```

**Rules:**

- Each focus subfolder represents a distinct positioning theme (e.g., "AI/ML", "embedded systems", "general backend").
- `prompt.md` in each focus folder describes the positioning, key stories, and trade-offs for that focus.
- Resume files can be in `.md` or `.docx` format.
- When tailoring a resume for a role, select the most relevant focus folder as the base.

Once the workspace and folder paths are configured, use those discovered paths for all subsequent operations.

## Commands

### `score this job`

Research and score one opportunity. Load `{references_folder}/opportunity-evaluation.md`.

- Phase 1: Quick screen (comp floor, Glassdoor, funding/stability)
- Phase 2: Deep research — dispatch up to **5 parallel subagents**, one per scoring category (see `{references_folder}/opportunity-evaluation.md` for the parallel dispatch pattern)
- Phase 3: Score and decide
- Output: Formatted scorecard ready to paste into the position file

### `add to matrix`

Add or update a company in the job matrix. Load `{references_folder}/matrix-management.md`.

- Create or update `comparison-matrix.md`
- Create company folder and main file if they don't exist (use `{templates_folder}/company-note.template.md`)
- Create position file in `companies/[Company]/roles/` (use `{templates_folder}/opportunity-input.template.md`)
- Never update the matrix without confirming status first — default is Exploring

### `tailor resume for [Company]`

Create a tailored resume for a specific role. Load `{references_folder}/resume-build-defaults.md`.

- Source: `{resumes_folder}/experience-inventory.md` + most relevant reference resume
- Output: both `.md` and `.docx` to `companies/[Company]/resumes/`
- Filename: `[CandidateName]-[identifier]` where identifier = job req number, URL uuid, or role title

### `prep for [Company] [stage]`

Create an interview prep document. Load `{references_folder}/interview-prep.md`.

- Output: dated file at `companies/[Company]/interviews/[Stage]-[Date].md`
- Cover: what the stage is testing, 3–5 strong stories, questions to ask, risks to probe

### `take notes` / `live notes`

Start a structured live note-taking session. Load `{references_folder}/interview-note-taker.md`.

- Use the note-taking markers from that reference
- Output to `companies/[Company]/interviews/live-notes-[Date].md`

### `debrief [Company] [stage]`

Run a post-interview debrief from live notes. Load `{references_folder}/interview-debrief.md`.

- Separate facts, interpretations, and open questions
- Output recommendation: advance, pause, withdraw, or unclear

### `search niche markets`

Find new job postings matching the candidate profile. Load `{references_folder}/niche-markets.md` if it exists, otherwise use `niche-markets/` directory.

- Search job boards directly (LinkedIn, Greenhouse, Lever, Ashby)
- Match against differentiators and comp floor from custom profile

### `process incoming`

Score and triage a batch of new job postings. For each posting:

1. Load the URL or JD text.
2. Run `score this job` using the parallel Phase 2 dispatch pattern.
3. Present all scorecards together ranked by score.

**Batch dispatch:** Process up to **5 postings simultaneously** using parallel subagents. If more than 5 are provided, batch them in groups of 5 and present results per batch before proceeding.

### `show matrix` / `pipeline status`

Read and display the current `comparison-matrix-matrix.md` in a clean summary format.

### `archive [Company]`

Move a company to archive status in the matrix. Set final status (Rejected, Withdrawn). Do not delete company files — move them to `archive/[Company]/`.

### `rescore [Company] [Role]`

Update score, status, or content for an existing position. Load `{references_folder}/rescore-and-update.md`.

- Triggers: new comp data, post-interview signals, layoff news, status change
- Updates JD file → markdown matrix → sqlite (always in this order)
- Never leave sqlite out of sync with the markdown matrix

## Hard Rules

- **Terminology:** Never refer to the workspace as the "Obsidian vault". Always use "Job search workspace".
- Never assume status = Pursuing. Default is Exploring until the user explicitly confirms.
- Never let Financial Fit slide below comp floor without flagging it.
- Never state the comp floor first in any negotiation context.
- Never skip versioning on file outputs (resume files must be versioned).
- Always check Glassdoor before scoring a company.
- **Auto-research preference:** Before running any web search (job boards, Glassdoor, comp research, company research), check the `auto_research` memory key. If set to `ask` (default) or unset, confirm with the user before searching. If set to `auto`, proceed with searches without asking.
- Confirm before any irreversible action (status changes, file moves, matrix updates).
- Prefer action items over open-ended summaries.
- Surface missing context explicitly rather than guessing.

## Reference Files

Load these on demand — only when the relevant command is invoked:

| File                                            | Load when                                                    |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `{references_folder}/opportunity-evaluation.md` | Scoring a job                                                |
| `{references_folder}/matrix-management.md`      | Adding/updating the job matrix                               |
| `{references_folder}/resume-build-defaults.md`  | Tailoring a resume                                           |
| `{references_folder}/interview-prep.md`         | Preparing for an interview stage                             |
| `{references_folder}/interview-note-taker.md`   | Live note-taking during an interview                         |
| `{references_folder}/interview-debrief.md`      | Post-interview debrief                                       |
| `{references_folder}/scoring-defaults.md`       | Default scoring categories (overridable via custom profile)  |
| `{references_folder}/scoring-framework.md`      | How to resolve config and apply decision bands               |
| `{references_folder}/rescore-and-update.md`     | Rescoring a position or updating status/score after new info |
| `{references_folder}/negotiation-rules.md`      | Any comp or offer negotiation                                |
| `{references_folder}/gap-answers.md`            | Scripted answers for tech stack gaps                         |
| `{references_folder}/ai-tooling-framing.md`     | Framing AI tooling experience                                |
| `{references_folder}/coaching-guardrails.md`    | Coaching style and behavior constraints                      |
| `{references_folder}/tech-stack.md`             | Full tech stack reference                                    |
