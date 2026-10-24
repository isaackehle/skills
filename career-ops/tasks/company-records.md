# Task: company-records

## Purpose

Create and maintain company folders: the company page, contacts, call transcripts, and folder cleanup.

## Inputs

- Company name. Required.
- What's being recorded (a new company, a contact, a call transcript or summary, or a cleanup request).

## Load

- [references/company-folder-structure.md](../references/company-folder-structure.md)

## Operations

- **company:** create `{companies}/<slug>/<slug>.md` from `templates/company-page.template.md` if it's missing. Slug:
  lowercase, spaces and periods become underscores, other punctuation is dropped.
- **contact:** create `people/<first_last>.md` from `templates/people-entry.template.md` and add a row to the company
  page's People table. To update a contact, show each current value; Enter keeps it.
- **call:** save the transcript or summary to `discussions/call-YYYY-MM-DD.md` with participants at the top. Link it
  from each participant's contact file and add a dated entry under Interactions.
- **recruiter screen:** use `templates/recruiter-screen.template.md` and file it under `interviews/`.
- **normalize:** scan the folder, propose renames to match the structure reference, rename on approval, and fix every
  internal link the renames break. Report what changed.

## Output

The created or updated files, and one line per change.

## Never

- Delete files. Moves and renames only, with approval.
- Leave a link pointing at an old filename after a rename.
