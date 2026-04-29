---
name: resume overview
description: Consolidated guide for resume handling within the job-search skill, including build defaults, formatter specifications, and role markdown resume section format.
type: reference
---

# Resume Overview

## Build Defaults (from `resume-build-defaults.md`)

- Apply every time a resume is produced. Do not deviate without explicit user instruction.
- **Source Hierarchy**:
  1. `resume/experience-inventory.md` – master source of truth.
  2. Select the most relevant reference resume for the target role:
     - `resume/reference/fullstack/<Candidate name>-Resume.md` – AI/platform/full‑stack roles.
     - `resume/reference/general/<Candidate name>-Resume.md` – general roles (full‑stack + embedded breadth).
     - `resume/reference/embedded/<Candidate name>-Resume.md` – embedded systems/edge AI roles.
  3. Tailor against the specific job description.
- **Output** – always produce both formats:
  - `[CandidateName]-[identifier].md` – reviewed in vault first.
  - `[CandidateName]-[identifier]-v1.docx` – generated after user approves markdown.
- `[CandidateName]` = First_Last format (e.g., `Isaac_Kehle`).
- Files saved under `companies/[Company]/resumes/`.
- No global `resume/tailored/` folder; all tailored versions live under their company.
- **File Identifier Priority**:
  1. Job req number (strip `JR` prefix).
  2. URL UUID (last 8 characters).
  3. Role title (compressed).
- Increment version suffix (`-v2`) on substantive changes.
- **DOCX Styling** – Arial 11pt/12pt, blue header color `#2E5FA3`, 1‑inch margins, US Letter, ATS‑friendly (no tables, graphics, columns).
- **Tailoring Workflow** – start from master, customize for JD, build markdown (no footers, wiki‑links), generate DOCX (no resume‑specific framing text).
- **Formatting Rules** – no hyphens except dates/compound terms, no em dashes, security clearance appended to summary, patent entries title \& number only, etc.

## Formatter Specification (from `resume-formatter-spec.md`)

- Location: `/Users/isaac/.local/bin/resume-formatter`
- Usage: `resume-formatter <input.md> <output.docx>`
- Expected Markdown structure includes name header, subtitle, contact line, sections, company/date/job headers, bold‑prefixed bullets.
- Formatting applied: fonts, sizes, colors, styles, margins, bullet spacing (see original spec).
- Parsing rules: `# ` → name, `## ` → section header, `### ` → job header, `**text**` → bold, `- ` → bullet, `- **bold** rest` → bold bullet, `*italic*` → italic, `---` → divider.
- Common issues and fixes listed in spec.

## Role Markdown Resume Section Format

When adding a resume to a role markdown file, use a single‑level relative path and indicate the copy status:

```markdown
## Resume
- **Copied Resume**
  - **Markdown File:** [Isaac_Kehle-Resume](../resumes/16799744/Isaac_Kehle-Resume.md)
  - **Word Document:** `../resumes/16799744/Isaac_Kehle-Resume.docx`
```

- The path is relative to the role file (`../resumes/<role‑id>/`).
- The indicator line (`Copied Resume` or `Tailored Resume`) reflects whether the resume was copied directly from a reference or customized for the role.

---

*All resume handling logic for the job‑search skill should reference this consolidated overview.*