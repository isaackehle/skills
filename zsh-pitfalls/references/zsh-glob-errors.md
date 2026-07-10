# Zsh Glob Expansion Errors

## The Problem

When you write:

```zsh
ls -d "$PROFILES_DIR"/*/ 2>/dev/null
```

zsh expands the glob `*` before `ls` runs. If no matches exist, zsh prints an error to stderr — but this is **zsh's error**, not `ls`'s error. The `2>/dev/null` on `ls` only captures what `ls` writes, not what zsh writes.

## Symptoms

```
_get_profile_numbers:2: no matches found: /Users/isaac/code/isaackehle/settings/ai/profiles/*/
```

The error references the line number in the calling file because the glob expansion happens during source execution, not at runtime.

## Reproduction

```zsh
mkdir -p /tmp/test_empty
ls -d /tmp/test_empty/*/ 2>/dev/null
# Output: ls: no matches found: /tmp/test_empty/*/

ls -d /tmp/test_empty/*/ >/dev/null 2>&1
# Output: same error — the shell error comes from zsh itself
```

## Fix Patterns

### Pattern 1: Directory guard (preferred)

```zsh
_get_profile_numbers() {
    [[ -d "$PROFILES_DIR" ]] || return
    local -a dirs
    dirs=( "$PROFILES_DIR"/*/ ) 2>/dev/null
    for d in "${dirs[@]}"; do
        [[ -f "$d/PROFILE" ]] && basename "$d"
    done | sort
}
```

### Pattern 2: Find instead of glob

```zsh
find "$PROFILES_DIR" -mindepth 1 -maxdepth 1 -type d -name 'PROFILE' -exec basename '{}' \; 2>/dev/null
```

### Pattern 3: Nullglob option

```zsh
setopt nullglob 2>/dev/null || true
for d in "$PROFILES_DIR"/*/; do
    [[ -d "$d" && -f "$d/PROFILE" ]] && basename "$d"
done
unsetopt nullglob 2>/dev/null || true
```

## Context

This came up in Isaac's settings repo (`~/.profile.d/_obsidian` sourcing `helpers.sh`), where `_get_profile_numbers()` iterates over profile directories. When `ai/profiles/` doesn't exist (e.g., on a fresh clone or before initial setup), every shell startup would emit the error.
