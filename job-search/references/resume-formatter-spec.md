---
name: resume-formatter specification
description: Documentation for the resume-formatter script - converts markdown resumes to styled DOCX
type: reference
---

# resume-formatter specification

## Location

`/Users/isaac/.local/bin/resume-formatter`

## Usage

```bash
resume-formatter <input.md> <output.docx>
```

## Markdown Format Expected

```markdown
# ISAAC KEHLE

**Principal Software Engineer | Title Subtitle**

Owings Mills, MD | 919.455.8891 | <ikehle@pm.me> | linkedin.com/in/isaackehle

---

## SECTION HEADER

Content paragraph.

### Company Name — Location | Date Range

**Role Title**

- **Bold prefix** rest of bullet text
- Regular bullet text

---
```

## Formatting Applied

|| Element            | Font   | Size   | Color           | Style                    |
| ------------------ | ------ | ------ | --------------- | ------------------------ |
| Name               | Calibri| 17pt   | #000000 (black) | Bold, Centered           |
| Role line          | Calibri| 10pt   | #1F3864         | Bold, Centered           |
| Contact            | Calibri| 9pt    | #444444 (gray)  | Regular, Centered        |
| Section Headers    | Calibri| 10.5pt | #1F3864         | Bold, with bottom border |
| Job lines          | Calibri| 10.5pt | #000000 (black) | Bold (company), Italic (location) |
| Dates              | Calibri| 9.5pt  | #444444 (gray)  | Regular                  |
| Role titles        | Calibri| 10pt   | #1F3864         | Bold Italic              |
| Bullets            | Calibri| 10pt   | #000000 (black) | Regular, `List Bullet`   |
| Embedded entries   | Calibri| 9.5pt  | #000000 (black) | Plain paragraphs         |
| Body text          | Calibri| 10pt   | #000000 (black) | Regular                  |

## Spacing

- Margins: 0.75" top/bottom, 1" left/right, US Letter (8.5" x 11")
- Bullet spacing after: 4pt
- Bullet indent: 0.25"

## Parsing Rules

1. `# ` at start → Name (collected as NAME section)
2. `## ` → Section header (PROFESSIONAL SUMMARY, CORE COMPETENCIES, etc.)
3. `### ` → Job header (Company — Location | Date)
4. `**text**` → Bold (stripped markers, applied as bold run)
5. `- ` → Bullet point (adds • symbol, 0.25" indent)
6. `- **bold** rest` → Bullet with bold prefix
7. `*italic*` → Italic (stripped markers)
8. `---` → Section divider (skipped)

## Key Implementation Details

- Bullet symbol: `• ` (Unicode bullet + space)
- Bold prefix in bullets: markers stripped, text rendered bold
- Section headers: bottom border via XML (`w:pBdr` → `w:bottom`)
- No extra blank paragraphs between sections (markdown flow preserved)
- Contact line: preserves `<email>` angle brackets

## Common Issues

| Issue                  | Cause                            | Fix                                                     |
| ---------------------- | -------------------------------- | ------------------------------------------------------- |
| Name/contact missing   | `# ` header not parsed           | Ensure NAME section handler exists                      |
| `**` visible in output | Markers not stripped             | Use `add_run()` with styled text, don't include markers |
| No bullets showing     | `- ` not detected or • not added | Add bullet symbol as first run                          |
| Extra spacing          | Blank paragraphs added           | Don't add `doc.add_paragraph()` after sections          |
| Wrong colors           | Color constants wrong            | BLUE=#2E5FA3, GRAY=#444444, BLACK=#000000               |
