# Installation

## Step 1: Install Homebrew (if not already installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Step 2: Install OCRmyPDF and Tesseract Hebrew language pack

```bash
brew install ocrmypdf tesseract-lang
```

This installs:
- **ocrmypdf** — the PDF OCR pipeline
- **tesseract-lang** — Tesseract OCR engine with language packs (including Hebrew)

Without `tesseract-lang`, only English is available.

## Step 3: Verify Hebrew support

```bash
tesseract --list-langs
```

Look for `heb` in the output. This is the language identifier used by OCRmyPDF.

## Step 4: Verify OCRmyPDF works

```bash
ocrmypdf --version
```

## Quick test

```bash
echo "test" > /tmp/test.pdf
ocrmypdf -l heb+eng /tmp/test.pdf /tmp/test-out.pdf
```

If this runs without error, the installation is good.
