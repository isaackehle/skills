# Resume Build Defaults

Apply every time a resume is produced.

## Output formats

Always produce both:
- .md version
- .docx version

## DOCX styling

- Font: Arial 11pt or 12pt
- Section header color: blue #2E5FA3 with bottom border
- Margins: 1 inch all sides
- Page size: US Letter
- ATS-friendly: no tables for layout, no text boxes

## Source documents

- Primary source: `JOB_SEARCH_WORKSPACE/resume/experience-inventory.md`
- Select the reference resume most relevant to the target role before tailoring:
  - `resume/reference-resume-ai-workflows.md`
  - `resume/reference-resume-embedded.md`

## Versioning

- Filename: `resume-[company]-v1.md` / `resume-[company]-v1.docx`
- Increment version on substantive changes
- Save to `JOB_SEARCH_WORKSPACE/companies/[Company]/resumes/`

## Formatting rules

- No hyphens except in date ranges or compound technical terms
- No em dashes -- use commas, colons, or rewrite
- Never let a single word trail alone onto the next line in competency rows
- Never let a single job role span across two pages
- En dashes in patent numbers are acceptable

## ATS notes

- Standard section headers: Experience, Education, Skills
- No graphics, icons, or columns
- Mirror keywords from job description where truthful
