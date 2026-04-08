#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="${1:-job-search}"
TARGET_BASE="${2:-$HOME/.agents/skills}"
TARGET_DIR="$TARGET_BASE/job-search"

mkdir -p "$TARGET_BASE"
rm -rf "$TARGET_DIR"
cp -R "$SRC_DIR" "$TARGET_DIR"

echo "Installed job-search skill to: $TARGET_DIR"
echo "If you use OpenCode, you may prefer: ~/.config/opencode/skills"
echo "If you use Claude Code, you may prefer: ~/.claude/skills"
