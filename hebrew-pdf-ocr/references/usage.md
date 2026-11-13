# Usage

## Basic usage — single file

```bash
ocrmypdf -l heb+eng "input.pdf" "output-searchable.pdf"
```

## Basic usage — multiple files (batch)

```bash
for f in *.pdf; do
  base="${f%.pdf}"
  ocrmypdf -l heb+eng "$f" "${base}-searchable.pdf"
done
```

## Redo-OCR (existing OCR layer)

If a PDF already has an invisible OCR layer (e.g., from a previous Nitro export) that is wrong:

```bash
ocrmypdf --redo-ocr -l heb+eng "input.pdf" "output-searchable.pdf"
```

`--redo-ocr` removes the existing invisible text and re-runs recognition while preserving visible digital text.

## What NOT to do

**Avoid `--force-ocr`** unless you have no choice. It rasterizes all page content, including vector graphics and form fields, producing larger files with degraded quality.

## Language identifiers

| Language | Identifier |
|----------|-----------|
| Hebrew   | `heb`     |
| English  | `eng`     |
| Hebrew + English | `heb+eng` |

## Output

The output is a searchable PDF where text can be selected and copied. Test by opening in Nitro or any PDF reader and searching for a known Hebrew word.
