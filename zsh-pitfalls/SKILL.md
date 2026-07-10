---
name: zsh-pitfalls
description: Common zsh behaviors that break scripts — glob expansion errors, interactive vs non-interactive mode differences, array scoping, and other gotchas.
---

# Zsh Pitfalls — Shell Behavior That Breaks Scripts

When writing or debugging shell scripts (especially zsh), these behaviors bite you silently.

## 1. Glob failures fire BEFORE the command runs

```zsh
ls -d /nonexistent/*/ 2>/dev/null
```

This still prints `ls: no matches found: /nonexistent/*/` — zsh's glob expansion throws the error **before** `ls` even executes. `2>/dev/null` only redirects the command's own stderr, not the shell's glob error.

**Fix:** check directory existence first, or use a glob array that captures errors:

```zsh
# Option A: guard the directory
[[ -d "$DIR" ]] || return
for f in "$DIR"/*/; do ... done

# Option B: capture glob into array
local -a files=("$DIR"/*) 2>/dev/null
[[ ${#files[@]} -gt 0 ]] || return
```

## 2. `local -a` inside a function leaks to callers

`local -a arr=(...)` in zsh creates a local array, but if you accidentally use `arr=(...)` without `local`, it pollutes the caller's scope. Always declare arrays local in functions.

## 3. `set -e` with pipelines

```zsh
set -e
command1 | command2  # if command1 fails, the pipeline returns command2's exit code
```

Use `set -o pipefail` to make pipelines fail if _any_ component fails.

## 4. `echo` vs `printf`

`echo` in zsh interprets escape sequences differently depending on `shopt` and `-e` flag. For predictable output, prefer `printf '%s\n' "$var"`.

## 5. Empty array expansion

```zsh
arr=()
echo "${arr[@]}"  # prints nothing in zsh, but can cause "unbound variable" in strict mode
```

## 6. Brace expansion in non-interactive scripts

Brace expansion (`{a,b}`) does not occur in non-interactive shells by default. Use `shopt -s braceexpand` if needed.

## 7. `read` and trailing newlines

`read` strips the trailing newline. For multi-line input, use `read -d ''` or `read -r line`.

## 8. `source` into interactive shell with `set -e`

Sourcing a script with `set -e` into an interactive shell will cause the parent shell to exit on the first error. Guard with:

```zsh
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    set -euo pipefail
fi
```

## 10. Sourcing `_*` files by glob — last one wins, commented-out lines reset bindings

Dotfiles often delegate to sub-files using a glob:

```zsh
for _f in "$HOME/.zshrc.d"/_*; do
  [ -s "$_f" ] && source "$_f"
done
```

`_*` expands **alphabetically**, so `_bindkey` loads **after** `_ghostty`. If `_ghostty` sets a `bindkey` and `_bindkey` has it commented out or missing any line that sets it, the final shell has **nothing** — no error, no warning. The binding is silently lost.

Symptom: Ghostty shows "# delete word back (requires bindkey '\ew' in zshrc)".

**Fix:** audit the final file alphabetically — every `_*` that touches a shared concept (bindkeys, aliases, environment vars) must agree, and commented-out lines in a later file can overwrite a valid line from an earlier file.

`op` triggers a macOS permission dialog whenever it runs during shell startup (e.g., sourcing `~/.profile.d/*`). This is separate from interactive `op` commands — it fires during any startup script execution.

**Fix:** Add `export OP_REQUIRE_UNRESTRICTED_ACCESS=0` early in the startup script, before any `op` calls.

**Trigger:** A 1Password permission dialog appears on every terminal window open, even when `op` is only used for config loading (not interactive commands).
