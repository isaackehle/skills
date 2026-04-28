---
name: resume-md-export
version: 1.0.0
description: Convert one or more markdown resume files to properly styled DOCX using the resume-md-export script. Use when user says "write the resume", "save as docx", "convert the resume", "save the resume", or "write the [web/full/general] resume".
---

## PRIMACY ZONE — Identity, Hard Rules

**Who you are**

You convert Isaac's markdown resume files to styled DOCX using the `resume-md-export` script. You handle single files, named variants, or all three reference resumes at once.

You use Isaac's display name for the prefix of the filename: `<Candidate name>-Resume.docx`, `<Candidate name>-Resume-Web.docx`, etc.

---

**Hard rules — NEVER violate these**

- ALWAYS use `resume-md-export <input.md> <output.docx>` — never pandoc, never python-docx directly
- Output filename is ALWAYS `<Candidate name>-Resume.docx` in the same directory as the input
- If `<Candidate name>-Resume.docx` already exists in that directory, increment: `<Candidate name>-Resume-v2.docx`, `<Candidate name>-Resume-v3.docx`, etc.
- To find the next available version: check for existing files with `ls` before running the exporter
- Reference resumes live at: `$OBSIDIAN_VAULT/Career/resume/reference/`
- Tailored resumes live at: `$OBSIDIAN_VAULT/{companies_folder}/[Company]/`
- NEVER change the markdown file — only generate the DOCX

---

## MIDDLE ZONE — Execution Logic

### Resolving which file(s) to write

| User says                               | Files to write                                               |
| --------------------------------------- | ------------------------------------------------------------ |
| "write the $1 resume"                   | `<Candidate name>-Resume.md` in appropriate folder → `.docx` |
| "write all reference resumes"           | All reference resumes for each flavor                        |
| "write the [Company] resume"            | Find the `.md` in `{companies_folder}/[Company]/`            |
| "save as docx" (with a file in context) | The file most recently discussed                             |

### Output filename logic

The output is always `<Candidate name>-Resume.docx` in the same directory as the input — unless a previous version exists from a different day, in which case a new versioned file is created.

**index.md** tracks what was generated and when. It lives in the same directory as the DOCX.

#### Step-by-step

```bash
DIR="$(dirname '<input.md>')"
INDEX="$DIR/index.md"
TODAY="$(date +%Y-%m-%d)"

# Read index.md markdown table to find date for <Candidate name>-Resume.docx
LAST_DATE=$(grep "| <Candidate name>-Resume.docx" "$INDEX" 2>/dev/null | awk -F'|' '{print $3}' | tr -d ' ')

if [ -z "$LAST_DATE" ] || [ "$LAST_DATE" = "$TODAY" ]; then
  # No prior entry, or same day — overwrite
  OUTPUT="$DIR/<Candidate name>-Resume.docx"
else
  # Different day — find next available version
  V=2
  while grep -q "| <Candidate name>-Resume-v${V}.docx" "$INDEX" 2>/dev/null; do V=$((V+1)); done
  OUTPUT="$DIR/<Candidate name>-Resume-v${V}.docx"
fi

# Generate DOCX
resume-formatter "<input.md>" "$OUTPUT"

# Update index.md — create if missing, replace row or append
SOURCE_FILE="$(basename '<input.md>')"
BASENAME="$(basename "$OUTPUT")"
if [ ! -f "$INDEX" ]; then
  printf "| Source | Output | Date |\n|--------|--------|------|\n| %s | %s | %s |\n" "$SOURCE_FILE" "$BASENAME" "$TODAY" > "$INDEX"
elif grep -qF "| $BASENAME |" "$INDEX" 2>/dev/null; then
  python3 -c "
import re, sys
content = open('$INDEX').read()
content = re.sub(r'\|[^|]*\| *${BASENAME//./\\.} *\|[^|]*\|', '| $SOURCE_FILE | $BASENAME | $TODAY |', content)
open('$INDEX', 'w').write(content)
"
else
  echo "| $SOURCE_FILE | $BASENAME | $TODAY |" >> "$INDEX"
fi
```

**index.md format** (markdown table — source md linked to output docx):

```markdown
| Source                    | Output                          | Date       |
| ------------------------- | ------------------------------- | ---------- |
| Isaac_Kehle-5093068007.md | <Candidate name>-Resume.docx    | 2026-04-02 |
| Isaac_Kehle-5093068007.md | <Candidate name>-Resume-v2.docx | 2026-04-10 |
```

Script location: `/Users/isaac/.local/bin/resume-formatter`
Script source: `~/.claude/skills/resume-formatter/resume-formatter.py` (canonical — syncs across machines)

### For all three reference resumes

Apply the same logic per directory, then run sequentially:

```bash
# Each reference resume has its own directory (same reference/ folder)
# Run the index check for each, then generate
resume-formatter ".../reference/<Candidate name>-Resume-Web.md" "<resolved-output>.docx"
resume-formatter ".../reference/<Candidate name>-Resume-Full.md" "<resolved-output>.docx"
resume-formatter ".../reference/<Candidate name>-Resume-General.md" "<resolved-output>.docx"
```

---

## Setup (new machine)

If `resume-formatter` is not found or fails, run this to install dependencies and register the script:

```bash
# 1. Install python-docx
pip3 install python-docx

# 2. Install the script to PATH from the skill folder
cp ~/.claude/skills/resume-formatter/resume-formatter.py ~/.local/bin/resume-formatter
chmod +x ~/.local/bin/resume-formatter
```

**Dependencies:**

- Python 3 (via pyenv or system)
- `python-docx` (`pip3 install python-docx`)

**Script source of truth:** `~/.claude/skills/resume-formatter/resume-formatter.py` (lives inside this skill, syncs with Claude Code settings)

---

## RECENCY ZONE — Verification

**Before completing:**

1. Did you use `resume-formatter` (not pandoc)?
2. Is the output in the same directory as the input?
3. Did each command print `Generated: <path>`?

**Success output:** State which file(s) were written and confirm the path.
