---
name: job-search
description: "End-to-end job search skill for Claude Code and OpenCode. Covers opportunity research and scoring, resume tailoring, recruiter screens, interview prep, live note-taking, post-interview debriefs, and job matrix maintenance. Load when the user is evaluating a job posting, prepping for an interview, tailoring a resume, tracking a company, or managing their job search pipeline. Trigger phrases: score this job, add to matrix, tailor resume, copy resume to, prep for interview, debrief, job search, find jobs, searching for work."
license: MIT
metadata:
  author: ikehle
  version: "3.4.0"
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

## Per‑Company Allowed URLs Memory

When a company URL is fetched and the `auto_research` setting permits it, the skill records the base domain in a memory file located inside that company's folder: `{JOB_SEARCH_WORKSPACE}/companies/<snake_case>/memory/allowed_urls.md`. This avoids future confirmation prompts for the same domain within that company.

**Procedure**

1. Extract the domain (e.g., `geon.catsone.com`) from the fetched URL.
2. Determine the company's snake_case folder name from the current context.
3. Load (or create) the file `{JOB_SEARCH_WORKSPACE}/companies/<snake_case>/memory/allowed_urls.md`.
4. If the domain is not already listed, append a line `- https://<domain>`; otherwise leave unchanged.
5. Commit the change silently; no user prompt is needed because the URL has already been approved.

## Config Discovery

On the first invocation of any command in a session, run config discovery. **Priority: Always check `AGENTS.md` in the customization folder (if available) before asking the user for a workspace preference.**

### Step 1: Verify Workspace Root

> **User‑choice guideline:** Whenever the skill asks the user to pick among multiple options, present the options as a **numbered list** (e.g., 1️⃣ Option A, 2️⃣ Option B) and request the user to respond with the **number** of their choice. This ensures clear, unambiguous input.

1. **Check local `./memory` folder** for `job_search_workspace` (fallback to session memory if not found).
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

_If the company page does not exist, it will be created automatically before adding the role._

Add or update a company in the job matrix. Load `{references_folder}/matrix-management.md`.

- Create or update `comparison-matrix.md`
- Create company folder and main file if they don't exist (use `{templates_folder}/company-page.template.md` to generate `<snake_case>/<snake_case>.md`). After creation, ensure the company markdown includes an **Open Engineering Roles** section (optional) with a **Job Board URL** field and a table of current openings, following this format:
- The company page should use a standard markdown link for the Comparison Matrix, e.g., `[comparison-matrix](../../comparison-matrix.md#Company)` (no angled brackets).

```markdown
## Open Engineering Roles (Optional)

**Job Board URL:** [Greenhouse](https://job-boards.greenhouse.io/company)

| Role                     | Level  | Job ID | Status | Notes |
| ------------------------ | ------ | ------ | ------ | ----- |
| Senior Software Engineer | Senior | 12345  | Open   | ...   |
```

- **When creating a role file** (`companies/<snake_case>/roles/…`):
  - Use `{templates_folder}/opportunity-input.template.md`. The generated role file will include a **Company** link that points back to the company page using the snake_case path (`companies/<snake_case>/<snake_case>.md`).
  - Prompt for the job posting URL and insert it into the **“Application URL”** field of the role markdown.
    - After inserting, **scan the URL for a numeric job‑req ID** (e.g., `.../jobs/16799744-...`).
    - Name the role file using the snake_case role name (excluding any parenthetical qualifiers) followed by a hyphen and the extracted Job Req ID (e.g., `software_engineer_system_integration-16799744.md`).
    - If the role file does **not** already contain a line like `- **Job Req ID:** \{id\}`, add `- **Job Req ID:** \{extracted-id\}` near the top of the file.
    - If the URL lacks an obvious ID, optionally fetch the page (respecting the `auto_research` setting) and search its content for a job‑req identifier before prompting.
  - When **updating a company page**, automatically verify that **every markdown file** within the company’s folder tree (including `people/`, `roles/`, and any other subfolders) follows the snake_case naming convention (lowercase, underscores, no parentheses). For role files, also ensure the filename ends with a hyphen and the Job Req ID. If any file does not match, rename it accordingly and update all internal links in the company page and other files to point to the new filename.
  - _“A role with this name already exists. Choose an action:"_\n 1️⃣ Update the existing file (overwrite with new info).\n 2️⃣ Rename the existing file and create a new one.\n 3️⃣ Create a new distinct role file (keep both).\n _After updating, a visual diff of the changes will be shown._
    _Please respond with the number of your choice._
- Ensure any internal links in the matrix use the relative path `companies/<snake_case>/<snake_case>.md`
- Never update the matrix without confirming status first — default is Exploring

### `copy resume to [Company]`

Alias for `copy-reference-resume-to-role`. Works the same way as `tailor resume for [Company]` but copies an existing reference resume instead of creating a new one from scratch.

- The skill will prompt for any missing context (company, job ID, which reference resume to copy).
- After copying, the role file is updated with a **Resume** link as described in the primary command.

### `prep for [Company] [stage]`

Create an interview prep document. Load `{references_folder}/interview-prep.md`.

- Output: dated file at `companies/[Company]/interviews/[Stage]-[Date].md`
- Cover: what the stage is testing, 3–5 strong stories, questions to ask, risks to probe

### `take notes` / `live notes`

Start a structured live note-taking session. Load `{references_folder}/discussion-note-taker.md`.

- Use the note-taking markers from that reference
- Output to `companies/[Company]/discussions/live-notes-[Date].md`

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

Read and display the current `comparison-matrix.md` in a clean summary format.

### `archive [Company]`

Move a company to archive status in the matrix. Set final status (Rejected, Withdrawn). Do **not** delete company files — move them to `archive/[Company]/`. Additionally, **update the company markdown file**: remove the role entry from the **Active Positions** table, add it to the **Closed / Archived Positions** table with the final status and a link to the archived role file.

If any role still shows a status of "Applied", the skill should prompt you to choose a final archived status (e.g., Rejected, Withdrawn, Offer Received) before completing the archiving process.

**Implementation note:** When updating the tables, scan both the `roles/` and `archive/` subfolders of the company directory, collect all role markdown files, and rebuild the **Active Positions** and **Closed / Archived Positions** tables from scratch, ensuring no duplicate entries appear.

### Naming Convention for Companies

All company folder names and main markdown filenames follow a **snake_case identifier**. This identifier is derived from the company name by: This identifier is derived from the company name by:

- Convert the name to lowercase.
- Replace spaces and periods with underscores.
- Remove any characters that are not letters, numbers, or underscores.

**Examples:**

- `Acme Corp.` → `AcmeCorp`
- `T. Rowe Price` → `TRowePrice`
- `XYZ, Inc.` → `XYZInc`

The folder is created as `companies/<snake_case>/` and the main page is `companies/<snake_case>/<snake_case>.md`.
All internal links (e.g., from the matrix) must use this relative path format.

Create a company page (the main markdown file) if it does not exist.

- Prompt for the company name (default: current context company). The name will be **snake_case** by converting to lowercase, replacing spaces and periods with underscores, and removing non‑alphanumeric characters.
- Ensure the folder `companies/<snake_case>/` exists.
- Generate `<snake_case>/<snake_case>.md` using `{templates_folder}/company-page.template.md`.
- If the page already exists, skip creation and optionally offer to open it.
- After creation, the file is ready for adding notes, contacts, positions, etc.
- **When the company page is updated**, ensure the **People** section exists; if missing, insert it. Then scan the `people/` folder and generate table rows linking each contact file (e.g., `people/First-Last.md`).

---

### Anonymized Display Names

When showing company or contact names inside markdown files, replace identifying parts with generic placeholders while preserving structure such as initials and punctuation. The anonymized display name is used for human‑readable content, whereas the snake_case identifier is used for folder and file paths.

**Guidelines:**

- Keep any leading initials or abbreviations (e.g., `A. A. A.`).
- Replace the core name with a generic term like `My` for companies or a generic first/last name for contacts.
- Preserve punctuation and spacing.
- For compact identifiers you may concatenate the words without spaces.

**Examples:**

- `Acme Corp.` → displayed as `Acme Corp` (no change needed).
- `A. A. A. Jim's Pest Control` → displayed as `A. A. A. My Pest Control` → compact form `AAAMyPestControl`.
- `John Doe` → displayed as `John Smith` (or another generic name).

When creating or updating markdown content, use the anonymized display name in headings, tables, and descriptive text, and use the snake_case identifier for folder and file paths.

---

Add a contact person to a company.

- Prompt for the company (default: current context company).
- Prompt for contact name, role/title, phone, email, LinkedIn profile (each can be skipped).
- If the company folder does not exist, create it automatically.
- Ensure a `people` folder exists inside the company folder.
- Create a markdown file for the person inside `people/` using Capitalized‑Kebab‑Case for the filename (e.g., `Meghan-Domeck.md`).
- Use the `contact-entry.template.md` template for formatting the file content.
- Append a row to the **People** table in the company page (`<Company>.md`) linking to the new contact file.
- After adding, offer to open the company page for review.

### `update contact`

Update an existing contact for a company.

- Prompt for the company (default: current context company).
- List the markdown files in `<company>/people/` and let the user pick one (displaying names derived from filenames).
- When updating an existing contact row in the People table, ensure the link points to the corresponding markdown file in the `people/` folder (e.g., `[Contact Name](people/Contact-Name.md)`). If the link is missing or outdated, automatically update it to match the current file name.
- For each field, prompt the user with the current value in brackets (e.g., `Title [Current Title]:`). Hitting **Enter** keeps the existing value.
- After gathering updates, rewrite the contact file preserving Capitalized‑Kebab‑Case filename.
- Offer to open the updated contact file for review.

### `log-live-notes`

Capture live notes during a call.

- When starting, ask whether to log the contact info now or at the end (default: now).
- Prompt for contact name (with autocomplete from existing contacts listed on the company page) or allow skipping.
- If postponed, after the notes are finished, prompt for the same contact details.
- Store the notes in `companies/[Company]/interviews/` as a markdown file named with the current date and "live-notes" suffix.
- If the company folder does not exist, create it automatically.
- The notes file uses the `live-notes.template.md` template.

- When starting, ask whether to log the contact info now or at the end (default: now).
- Prompt for contact name (with autocomplete from existing contacts listed on the company page) or allow skipping.
- If postponed, after the notes are finished, prompt for the same contact details.
- Store the notes in `companies/[Company]/interviews/` as a markdown file named with the current date and "live-notes" suffix.
- If the company folder does not exist, create it automatically.
- The notes file uses the `live-notes.template.md` template.

- When starting, ask whether to log the contact info now or at the end (default: now).
- Prompt for contact name (with autocomplete from existing contacts listed on the company page) or allow skipping.
- If postponed, after the notes are finished, prompt for the same contact details.
- Store the notes in `companies/[Company]/interviews/` as a markdown file named with the current date and "live-notes" suffix.
- If the company folder does not exist, create it automatically.
- The notes file uses the `live-notes.template.md` template.

Collect details from a phone call and store them in the company folder.

- Prompt for contact name (default: ask later).
- Prompt for company (default: current context company).
- Prompt for phone number, LinkedIn profile, email (each can be skipped).
- After gathering info, ask for a free‑form call summary to be saved.
- Store the data in `companies/[Company]/call-notes/` as a markdown file named with the current date.
- If the company folder does not exist, create it automatically.

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
| `{references_folder}/discussion-note-taker.md`  | Live note-taking during a discussion                         |
| `{references_folder}/resume-build-defaults.md`  | Tailoring a resume                                           |
| `{references_folder}/interview-prep.md`         | Preparing for an interview stage                             |
| `{references_folder}/interview-debrief.md`      | Post-interview debrief                                       |
| `{references_folder}/scoring-defaults.md`       | Default scoring categories (overridable via custom profile)  |
| `{references_folder}/scoring-framework.md`      | How to resolve config and apply decision bands               |
| `{references_folder}/rescore-and-update.md`     | Rescoring a position or updating status/score after new info |
| `{references_folder}/negotiation-rules.md`      | Any comp or offer negotiation                                |
| `{references_folder}/gap-answers.md`            | Scripted answers for tech stack gaps                         |
| `{references_folder}/ai-tooling-framing.md`     | Framing AI tooling experience                                |
| `{references_folder}/coaching-guardrails.md`    | Coaching style and behavior constraints                      |
| `{references_folder}/tech-stack.md`             | Full tech stack reference                                    |
