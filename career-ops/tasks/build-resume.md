# Task: build-resume

## Purpose

Render an approved, verified resume JSON to docx and pdf, then check the pages visually.

## Inputs

- Resume JSON with a PASS `.verify.md` next to it. Required. If there is no PASS, stop and run verify-resume.
- The user's approval of the review markdown in this session. Required.
- Style choice: `standard` (default) or `ats`. See [references/resume-format.md](../references/resume-format.md).

## Load

- [references/resume-format.md](../references/resume-format.md)

## Steps

1. Build:

   ```shell
   node scripts/build-resume.js <resume.json> [--style ats]
   ```

   This writes `<name>.docx` and `<name>.md` next to the JSON. The script needs the `docx` npm package; install it if
   missing.
2. Convert to PDF with LibreOffice (`soffice --headless --convert-to pdf`) and render the pages to images
   (`pdftoppm -jpeg -r 110`).
3. Look at every page. Check for: a role split across pages, a heading orphaned at the bottom of a page, a single word
   on its own line in a skills row, and a page count over the limit in `resume-rules.md`.
4. If layout fixes require content cuts, cut. Don't add anything. A content change after verification means
   verify-resume runs again.

## Output

The `.docx` and `.pdf` next to the JSON, and a link to the role file. Report the page count. Don't recap the content.

## Never

- Build from markdown edited by hand after verification without re-running verify-resume.
- Overwrite an earlier version's docx.
