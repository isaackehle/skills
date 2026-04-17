---
name: resume-formatter
description: "Converts a markdown resume to a properly styled DOCX file using Isaac Kehle's standard resume format (blue headers, Arial fonts, specific font sizes and margins). Trigger when the user asks to format a resume, export a resume to Word/DOCX, or generate a styled resume file. Requires python-docx."
license: MIT
metadata:
  author: ikehle
  version: '1.0.0'
---

# Resume Formatter

Converts a markdown resume to a styled `.docx` using `resume-formatter.py`.

## Prerequisites

```shell
pip install python-docx
```

If not installed, tell the user to run the above before proceeding.

## Workspace

The canonical location for resume markdown files is:

```
$OBSIDIAN_VAULT/job_search/resume/
```

Where `$OBSIDIAN_VAULT` = `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/primary`.

### If no resume file is found

1. Tell the user: "No resume markdown found at `$OBSIDIAN_VAULT/job_search/resume/`. You can either:
   - Place your resume as a `.md` file there, or
   - Provide a path to an existing file."
2. Offer to generate a starter template:
   - Ask: "Would you like me to create a template at `$OBSIDIAN_VAULT/job_search/resume/resume-template.md`?"
   - If yes, create the template using the structure below.

### Starter template structure

```markdown
# FULL NAME
**Job Title**
email@example.com | LinkedIn: linkedin.com/in/handle | Location

## SUMMARY
One to two sentence summary.

## EXPERIENCE

### COMPANY NAME | City, State | Jan 2022 – Present
**Job Title**
- Accomplishment with measurable result
- Another accomplishment

### PREVIOUS COMPANY | City, State | Jan 2020 – Dec 2021
**Job Title**
- Accomplishment
- Accomplishment

## SKILLS
**Category:** skill, skill, skill

## EDUCATION
**Degree, Major** — University Name, Year
```

## Running the formatter

```shell
python3 ~/.claude/skills/resume-formatter/resume-formatter.py <input.md> <output.docx>
```

Output convention: place the `.docx` alongside the `.md` input, or in `$OBSIDIAN_VAULT/job_search/resume/` if the input is there.

## Workflow

1. Locate or confirm the input `.md` file path (check canonical location first)
2. Confirm `python-docx` is installed
3. Run the formatter
4. Report the output path
5. Offer to open the file: `open <output.docx>`
