# Resume Build Defaults

Apply every time a resume is produced. Do not deviate without explicit user instruction.

## Source Hierarchy

1. `resume/experience-inventory.md` — master source of truth, all roles and accomplishments
2. Select the most relevant reference resume for the target role:
   - `resume/reference-resume-ai-workflows.md` — AI/platform/full-stack roles
   - `resume/reference-resume-embedded.md` — embedded systems/firmware roles
3. Tailor against the specific job description

## Output

Always produce both formats:
- `Isaac_Kehle-[identifier].md` — reviewed in Obsidian first
- `Isaac_Kehle-[identifier]-v1.docx` — generated after user approves the markdown

Both saved to `companies/[Company]/resumes/`.

Do not create a global `resume/tailored/` folder. All tailored versions live under their company.

## File Identifier (Priority Order)

1. Job req number — strip `JR` prefix: `JR1978573` → `1978573` → `Isaac_Kehle-1978573`
2. URL UUID — last 8 characters of the job posting URL
3. Role title — compressed: `Isaac_Kehle-Principal-Firmware-Engineer`

Increment version suffix on substantive changes: `Isaac_Kehle-1978573-v2.md`

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
- No footers, job URLs, Obsidian links, or framing notes in the file body
- Format for clean Obsidian review
- User reviews and approves before DOCX is generated

**Step 4: Generate DOCX**
Convert from markdown. Verify the output does not contain:
- Footer notes like `*Tailored for: [Company]*`
- Any markdown-only metadata or framing text
- Obsidian wiki-links

## Formatting Rules

- No hyphens except in date ranges or compound technical terms
- No em dashes — use commas, colons, or rewrite the sentence
- No single word trailing alone onto its own line in a competency row
- No single job role spanning two pages
- En dashes in patent numbers are acceptable

## ATS Rules

- Standard section headers: Experience, Education, Skills
- No graphics, icons, columns, or text boxes
- Mirror JD keywords where truthful
- Inline text only — no floating elements

## AI Tooling on Resume

See `references/ai-tooling-framing.md` for exact bullet language and hard guardrails on what to claim vs. what to list as evaluating-only.
