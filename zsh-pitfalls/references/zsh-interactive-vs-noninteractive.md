# Zsh: Interactive vs Non-Interactive Behavior

## Brace Expansion

```zsh
# Interactive: works
echo {a,b,c}  # a b c

# Non-interactive: literal
echo {a,b,c}  # {a,b,c}

# Fix:
shopt -s braceexpand
```

## History Expansion

```zsh
# Interactive: expands
echo !foo  # expands to last command starting with "foo"

# Non-interactive: literal
echo !foo  # !foo
```

## Aliases

Aliases are expanded by default in interactive mode only.

## Case-insensitive matching

`setopt case_glob` makes `*` match case-insensitively (interactive only).

## Completion

Zsh's powerful completion system is only active in interactive mode. Non-interactive scripts never see it.

## Implications for helpers.sh

The settings repo's `helpers.sh` uses `declare -A` (associative arrays) and `local -a` — these are zsh-specific and won't work in bash. When sourcing into a bash shell (e.g., from a `.bashrc` or a cron job), you need the guard:

```zsh
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    set -euo pipefail
fi
```

And the shebang should be `#!/opt/homebrew/bin/bash` (not `/bin/bash`) to avoid system bash.
