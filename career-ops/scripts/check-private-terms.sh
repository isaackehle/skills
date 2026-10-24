#!/usr/bin/env bash
# Block commits that contain private terms. The term list lives outside the repo.
#
#   check-private-terms.sh            check staged changes (used by the pre-commit hook)
#   check-private-terms.sh --all      check every tracked file
#   check-private-terms.sh --message F check a commit message file (used by the commit-msg hook)
#
# Term list location, first match wins:
#   $CAREER_OPS_PRIVATE_TERMS
#   git config career-ops.privateTerms
#
# File format: one term per line, case-insensitive plain text; "re:<regex>" for an extended regex; "#" comments.

set -euo pipefail

terms_file="${CAREER_OPS_PRIVATE_TERMS:-$(git config --get career-ops.privateTerms || true)}"
terms_file="${terms_file/#\~/$HOME}"

if [[ -z "$terms_file" ]]; then
  echo "check-private-terms: no term list configured; skipping." >&2
  echo "  set one with: git config career-ops.privateTerms /path/to/custom/private-terms.txt" >&2
  exit 0
fi
if [[ ! -r "$terms_file" ]]; then
  echo "check-private-terms: term list not readable: $terms_file" >&2
  exit 1
fi

fixed=$(mktemp)
regex=$(mktemp)
trap 'rm -f "$fixed" "$regex"' EXIT
while IFS= read -r line || [[ -n "$line" ]]; do
  line="${line%$'\r'}"
  [[ -z "${line// /}" || "$line" == \#* ]] && continue
  if [[ "$line" == re:* ]]; then printf '%s\n' "${line#re:}" >>"$regex"; else printf '%s\n' "$line" >>"$fixed"; fi
done <"$terms_file"

scan() { # reads text on stdin, prints matching lines
  local input
  input=$(cat)
  { [[ -s "$fixed" ]] && grep -inF -f "$fixed" <<<"$input"; [[ -s "$regex" ]] && grep -inE -f "$regex" <<<"$input"; } || true
}

hits=""
if [[ "${1:-}" == "--message" ]]; then
  out=$( (grep -v '^#' "$2" || true) | scan)
  [[ -n "$out" ]] && hits+="commit message:"$'\n'"$out"$'\n'
elif [[ "${1:-}" == "--all" ]]; then
  while IFS= read -r -d '' f; do
    [[ -f "$f" ]] || continue
    grep -Iq . "$f" 2>/dev/null || continue
    out=$(scan <"$f")
    [[ -n "$out" ]] && hits+="$f:"$'\n'"$out"$'\n'
    out=$(printf '%s\n' "$f" | scan)
    [[ -n "$out" ]] && hits+="(file name) $f"$'\n'
  done < <(git ls-files -z)
else
  out=$( (git diff --cached --no-color -U0 | grep '^+' | grep -v '^+++' || true) | scan)
  [[ -n "$out" ]] && hits+="staged additions:"$'\n'"$out"$'\n'
  out=$(git diff --cached --name-only | scan)
  [[ -n "$out" ]] && hits+="staged file names:"$'\n'"$out"$'\n'
fi

if [[ -n "$hits" ]]; then
  echo "check-private-terms: private terms found. Nothing personal goes in this repo." >&2
  echo "$hits" | sed 's/^/  /' >&2
  exit 1
fi
exit 0
