---
name: hebrew-pdf-ocr
description: "Batch OCR on scanned PDFs with Hebrew and English using OCRmyPDF + Tesseract. Load when the user shares scanned PDF files that need searchable text, especially documents mixing Hebrew and English. Requires ocrmypdf and tesseract-lang installed via Homebrew."
license: MIT
metadata:
  version: 1.0.0
---

# Hebrew PDF OCR

Takes one or more scanned PDF files, runs OCRmyPDF with Hebrew + English language packs, and outputs searchable PDFs to a specified folder.

## Prerequisites

The user must have Homebrew installed. On first use, instruct them to run:

```bash
brew install ocrmypdf tesseract-lang
```

Then verify Hebrew support:

```bash
tesseract --list-langs | grep heb
```

If `heb` does not appear, the install failed — instruct them to reinstall.

## Usage

### Single file

```bash
npx @isaackehle/hebrew-pdf-ocr input.pdf --out ./output/
```

### Batch (multiple files)

```bash
npx @isaackehle/hebrew-pdf-ocr *.pdf --out ./output/
```

### With redo-OCR (existing OCR layer)

```bash
npx @isaackehle/hebrew-pdf-ocr input.pdf --out ./output/ --redo
```

## Steps

1. **Check prerequisites.** Verify `ocrmypdf` and `tesseract` are installed. If not, instruct the user to run the Homebrew install. If `heb` is missing from `tesseract --list-langs`, tell them to reinstall `tesseract-lang`.
2. **Create the output directory** if it does not exist.
3. **Run OCRmyPDF** on each input file with `-l heb+eng` (or `--redo-ocr -l heb+eng` when `--redo` is specified).
4. **Report results.** List each file processed, any errors, and the output paths.

## Output

One searchable PDF per input file, written to the output directory. Filenames are preserved with `-searchable` appended (e.g. `scan.pdf` → `scan-searchable.pdf`).

## Hard rules

1. **Never skip the prerequisite check.** If ocrmypdf or Hebrew lang pack is missing, stop and tell the user how to install them. Do not attempt to run the tool.
2. **Never use `--force-ocr`.** It rasterizes all page content including vector graphics and form fields. Only use `--redo-ocr` when the user requests it or when a file already has an OCR layer.
3. **Never modify the input file.** Always write to the output directory.
4. **Never assume the language.** Always use `heb+eng` for mixed Hebrew/English documents. If the user specifies a different language, confirm before overriding.

## Layout

```text
hebrew-pdf-ocr/
├── SKILL.md              # this router
├── references/           # installation and usage docs
└── scripts/              # the OCR wrapper script
```
