---
name: auto-rename-screenshots
version: 1.1.0
description: Automatically converts HEIC screenshots to PNG, OCRs them to extract headline text, and renames files based on the content. Use when user wants to batch rename image files based on their visible text content.
---

# Auto-Rename Screenshots

Batch rename image files based on visual content: HEIC→PNG conversion, OCR headline extraction, and renaming.

## Workflow

1. **Convert** HEIC→PNG: `sips -s format png input.heic --out output.png`
2. **OCR** each PNG: `tesseract image.png stdout --psm 6 | head -10`
3. **Identify headline** — largest/most prominent text (usually at top)
4. **Sanitize filename**: spaces→underscores, strip `/ : ' ? , .`, max ~50 chars
5. **Rename** via python script using old→new mapping
6. **Ask** user before deleting original HEIC files — never auto-delete

## Hard Rules

- Always convert HEIC first (tesseract can't read HEIC directly)
- Always use tesseract (not guess) for text extraction
- Preserve originals until rename confirmed
- Never overwrite existing files
- Never delete originals without explicit user confirmation

## Verification

- All HEICs converted to PNG?
- Each file OCR'd individually?
- Headline extracted from actual OCR output (not guessed)?
- Filenames sanitized (no spaces/special chars)?
- User explicitly chose keep/delete for originals?
