---
name: resume-formatter specification
description: Documentation for the resume-formatter script - converts markdown resumes to styled DOCX
type: reference
---

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

| Element | Font | Size | Color | Style |
|---------|------|------|-------|-------|
| Name | Arial | 18pt | #2E5FA3 (blue) | Bold, Centered |
| Subtitle | Arial | 11pt | #2E5FA3 (blue) | Bold, Centered |
| Contact | Arial | 9pt | #444444 (gray) | Regular, Centered |
| Section Headers | Arial | 10.5pt | #2E5FA3 (blue) | Bold, with bottom border |
| Job Headers (###) | Arial | 10pt | #000000 (black) | Bold |
| Company/Date lines | Arial | 9pt | #444444 (gray) | Italic |
| Bullets | Arial | 9.5pt | #000000 (black) | Regular, with • prefix |
| Bold bullet prefix | Arial | 9.5pt | #000000 (black) | Bold |
| Body text | Arial | 9.5pt | #000000 (black) | Regular |

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

| Issue | Cause | Fix |
|-------|-------|-----|
| Name/contact missing | `# ` header not parsed | Ensure NAME section handler exists |
| `**` visible in output | Markers not stripped | Use `add_run()` with styled text, don't include markers |
| No bullets showing | `- ` not detected or • not added | Add bullet symbol as first run |
| Extra spacing | Blank paragraphs added | Don't add `doc.add_paragraph()` after sections |
| Wrong colors | Color constants wrong | BLUE=#2E5FA3, GRAY=#444444, BLACK=#000000 |
