# Resume Build Defaults

Apply every time a resume is produced. Do not deviate without explicit user instruction.

## Source Hierarchy

1. `resume/experience-inventory.md` — master source of truth, all roles and accomplishments
2. Select the most relevant reference resume for the target role:
   - `resume/reference/fullstack/<Candidate name>-Resume.md` — AI/platform/full-stack roles
   - `resume/reference/general/<Candidate name>-Resume.md` — general roles (full-stack + embedded breadth)
   - `resume/reference/embedded/<Candidate name>-Resume.md` — embedded systems/edge AI roles
3. Tailor against the specific job description

## Output

Always produce both formats:

- `[CandidateName]-[identifier].md` — reviewed in your vault first
- `[CandidateName]-[identifier]-v1.docx` — generated after user approves the markdown

`[CandidateName]` = your name in `First_Last` format (e.g. `Jane_Doe`). Set this once and reuse.

Both saved to `companies/[Company]/resumes/`.

Do not create a global `resume/tailored/` folder. All tailored versions live under their company.

## File Identifier (Priority Order)

1. Job req number — strip `JR` prefix: `JR1978573` → `1978573` → `[CandidateName]-1978573`
2. URL UUID — last 8 characters of the job posting URL
3. Role title — compressed: `[CandidateName]-Principal-Firmware-Engineer`

Increment version suffix on substantive changes: `[CandidateName]-1978573-v2.md`

## DOCX Styling

- Font: Arial 11pt or 12pt
- Section header color: blue `#2E5FA3` with bottom border
- Margins: 1 inch all sides
- Page size: US Letter
- ATS-friendly: no tables for layout, no text boxes, no graphics, no icons, no columns

## Tailoring Workflow

**Step 1: Start from master**
Use `experience-inventory.md` as source. Keep structure: Career Highlights → Professional Experience → Education → Technical Expertise → Patent.

**Step 2: Customize for the JD**

- Lead each role description with the specific stack/languages from the JD
- Highlight accomplishments and technical decisions most relevant to the posting
- Reorder Technical Expertise section — put JD-matching tech first
- Mirror keywords from the JD where truthful and natural

**Step 3: Build the markdown version**

- No footers, job URLs, wiki-links, or framing notes in the file body
- Format for clean review in your vault
- User reviews and approves before DOCX is generated

**Step 4: Generate DOCX**
Convert from markdown. Verify the output does not contain:

- Footer notes like `*Tailored for: [Company]*`
- Any markdown-only metadata or framing text
- Wiki-links or vault-specific syntax

## Formatting Rules

- No hyphens except in date ranges or compound technical terms
- No em dashes — use commas, colons, or rewrite the sentence
- No single word trailing alone onto its own line in a competency row
- No single job role spanning two pages
- En dashes in patent numbers are acceptable
- **Security clearance goes at the end of the Professional Summary, never as a separate section.** Format: append "TS/SCI Active, March 2026." to the summary paragraph.
- **Patent entries: title and number only.** No inventor line, no URL, no "formerly known as" — just `U.S. Patent No. 7,768,548 — Mobile Digital Video Recording System`

## ATS Rules

- Standard section headers: Experience, Education, Skills
- No graphics, icons, columns, or text boxes
- Mirror JD keywords where truthful
- Inline text only — no floating elements

## AI Tooling on Resume

See `{references_folder}/ai-tooling-framing.md` for exact bullet language and hard guardrails on what to claim vs. what to list as evaluating-only.
