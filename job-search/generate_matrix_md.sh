#!/bin/bash
# generate_matrix_md.sh
# Generates comparison-matrix.md from comparison-matrix.sqlite
# Usage: bash generate_matrix_md.sh [path/to/comparison-matrix.sqlite] [path/to/output/comparison-matrix.md]

set -euo pipefail

DB="${1:-comparison-matrix.sqlite}"
OUT="${2:-comparison-matrix.md}"
TODAY=$(date +%Y-%m-%d)

# Read config values
FLOOR_BASE=$(sqlite3 "$DB" "SELECT value FROM config WHERE key='comp_floor_base';")
FLOOR_TTC=$(sqlite3 "$DB" "SELECT value FROM config WHERE key='comp_floor_ttc';")
FLOOR_BASE_K=$((FLOOR_BASE / 1000))
FLOOR_TTC_K=$((FLOOR_TTC / 1000))

{
  echo "# Comparison Matrix"
  echo ""
  echo "Last updated: $TODAY"
  echo ""
  echo "> **Comp floors (updated):** Base minimum \$${FLOOR_BASE_K}K | TTC minimum \$${FLOOR_TTC_K}K"
  echo "> Roles where base < \$${FLOOR_BASE_K}K are flagged with ⚠️ in Notes. Scores adjusted: Financial Fit penalized when base starts below floor."
  echo ""
  echo '> **Section groupings:** Active = Applied, Screening, Interviewing, Offer | Potential = Exploring, Pursuing, Hold, Future | Archived = Rejected, Withdrawn, Lapsed'
  echo ""

  for section in Active Potential Archived; do
    echo "## $section"
    echo ""
    echo "| Company | Role | Level | Priority | Status | Score | Max | Comp Range | Location | Source | Added | Notes |"
    echo "|-----|------|-----|-------|----|---------|-----|--------|-----------|---|---|----------|-------|--|----|"

    sqlite3 -separator '|' "$DB" "
      SELECT
        company_link,
        role_link,
        level,
        priority,
        status_icon || ' ' || status,
        CASE WHEN score = -1 THEN 'N/A' WHEN score IS NULL THEN 'TBD' ELSE CAST(score AS TEXT) END,
        CAST(max_score AS TEXT),
        COALESCE(comp_range, 'TBD'),
        COALESCE(location, 'TBD'),
        COALESCE(source, 'TBD'),
        COALESCE(source_url, 'TBD'),
        added_date,
        age_prefix || COALESCE(notes, '')
      FROM v_matrix_sorted
      WHERE section = '$section';
    " | while IFS='|' read -r company role level priority status score max_score comp_range location source source_url added notes; do
      # Render source as a markdown link: [source](<source_url>) when URL is available
      if [ "$source_url" != "TBD" ] && [ -n "$source_url" ]; then
        source_link="[$source](<$source_url>)"
      else
        source_link="$source"
      fi
      echo "| $company | $role | $level | $priority | $status | $score | $max_score | $comp_range | $location | $source_link | $added | $notes |"
    done

    echo ""
  done
} > "$OUT"

echo "Generated $OUT ($(wc -l < "$OUT") lines)"