#!/usr/bin/env bash
#
# hebrew-pdf-ocr — Batch OCR wrapper for PDFs with Hebrew + English.
#
# Usage:
#   ocr.sh [-r | --redo] -i <input.pdf | *.pdf> -o <output-directory>
#
# Options:
#   -i, --input       Input PDF file(s), glob, or "-" for stdin filenames
#   -o, --out         Output directory (created if missing)
#   -r, --redo        Use --redo-ocr (removes existing OCR layer)
#   -h, --help        Show this message

set -euo pipefail

REDO=0
INPUT_FILES=()
OUTPUT_DIR=""

usage() {
  cat <<'EOF'
Usage: ocr.sh [-r | --redo] -i <input> -o <output-dir>

Options:
  -i, --input   Input PDF file path, glob pattern, or "-" for stdin (one path per line)
  -o, --out     Output directory (created if missing)
  -r, --redo    Use --redo-ocr to replace an existing OCR layer
  -h, --help    Show this message
EOF
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -i|--input)
      [[ -z "${2:-}" ]] && { echo "Error: -i requires a value" >&2; exit 1; }
      INPUT_FILES+=("$2")
      shift 2
      ;;
    -o|--out)
      [[ -z "${2:-}" ]] && { echo "Error: -o requires a value" >&2; exit 1; }
      OUTPUT_DIR="$2"
      shift 2
      ;;
    -r|--redo)
      REDO=1
      shift
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Error: Unknown option '$1'" >&2
      usage
      ;;
  esac
done

if [[ ${#INPUT_FILES[@]} -eq 0 ]]; then
  echo "Error: No input files specified. Use -i <file(s)>." >&2
  usage
fi

if [[ -z "$OUTPUT_DIR" ]]; then
  echo "Error: No output directory specified. Use -o <dir>." >&2
  usage
fi

# ─── Prerequisite checks ───────────────────────────────────────────────

check_prereqs() {
  if ! command -v ocrmypdf &>/dev/null; then
    echo "ERROR: ocrmypdf is not installed." >&2
    echo "Install with: brew install ocrmypdf tesseract-lang" >&2
    exit 1
  fi

  if ! command -v tesseract &>/dev/null; then
    echo "ERROR: tesseract is not installed." >&2
    echo "Install with: brew install tesseract-lang" >&2
    exit 1
  fi

  if ! tesseract --list-langs 2>/dev/null | grep -q '^heb$'; then
    echo "ERROR: Hebrew language pack (heb) not found in Tesseract." >&2
    echo "Install with: brew install tesseract-lang" >&2
    echo "Then verify with: tesseract --list-langs" >&2
    exit 1
  fi
}

check_prereqs

# ─── Resolve input files ───────────────────────────────────────────────

resolve_inputs() {
  local files=()

  for spec in "${INPUT_FILES[@]}"; do
    if [[ "$spec" == "-" ]]; then
      # Read from stdin, one path per line
      while IFS= read -r line; do
        [[ -n "$line" ]] && files+=("$line")
      done
    elif [[ "$spec" == *"*"* ]]; then
      # Glob pattern — expand
      local expanded
      expanded=($(echo "$spec"))
      if [[ ${#expanded[@]} -eq 0 ]]; then
        echo "WARNING: No files match '$spec'. Skipping." >&2
        continue
      fi
      files+=("${expanded[@]}")
    else
      files+=("$spec")
    fi
  done

  # Filter to .pdf files only
  local pdfs=()
  for f in "${files[@]}"; do
    if [[ "${f##*.}" == "pdf" || "${f##*.}" == "PDF" ]]; then
      pdfs+=("$f")
    else
      echo "WARNING: '$f' does not appear to be a PDF. Skipping." >&2
    fi
  done

  if [[ ${#pdfs[@]} -eq 0 ]]; then
    echo "ERROR: No PDF files found." >&2
    exit 1
  fi

  echo "${pdfs[@]}"
}

# ─── Process each file ─────────────────────────────────────────────────

process_file() {
  local input="$1"
  local base
  base="$(basename "$input" .pdf)"
  local output="${OUTPUT_DIR}/${base}-searchable.pdf"

  echo "Processing: $input"

  if [[ "$REDO" -eq 1 ]]; then
    ocrmypdf --redo-ocr -l heb+eng "$input" "$output"
  else
    ocrmypdf -l heb+eng "$input" "$output"
  fi

  echo "  → $output"
}

# ─── Main ──────────────────────────────────────────────────────────────

main() {
  mkdir -p "$OUTPUT_DIR"

  local files_str
  files_str="$(resolve_inputs)"

  local count=0
  local errors=0

  for f in $files_str; do
    count=$((count + 1))
    if ! process_file "$f"; then
      errors=$((errors + 1))
      echo "  ERROR: Failed to process '$f'. See above for details." >&2
    fi
  done

  echo ""
  echo "Done: $count file(s) processed, $errors error(s)."

  if [[ $errors -gt 0 && $errors -eq $count ]]; then
    exit 1
  fi
}

main
