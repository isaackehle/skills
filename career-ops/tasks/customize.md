# Task: customize

## Purpose

Create or update the private inputs every other task depends on. Each template has a filled-in sample for an invented
candidate. Each sample line is paired with the question that produces it. This task walks the user through those
questions and writes the answers to the private workspace.

Invoke as `career-ops:customize`, optionally naming one input: `career-ops:customize resume-rules`.

## Inputs

The private files, if they exist:

| Input                | Private path                         | Template                                             |
| -------------------- | ------------------------------------ | ---------------------------------------------------- |
| workspace config     | `{custom}/AGENTS.md`                 | [workspace-config](../templates/workspace-config.template.md)         |
| candidate-profile    | `{custom}/candidate-profile.md`      | [candidate-profile](../templates/candidate-profile.template.md)       |
| experience-inventory | `{resumes}/experience-inventory.md`  | [experience-inventory](../templates/experience-inventory.template.md) |
| resume-rules         | `{custom}/resume-rules.md`           | [resume-rules](../templates/resume-rules.template.md)                 |
| private-terms        | `{custom}/private-terms.txt`         | [private-terms](../templates/private-terms.template.txt)              |

## Steps

1. **Workspace first.** If `{custom}/AGENTS.md` doesn't exist, ask for the workspace path and create it from the
   workspace-config template.
2. **Pick the input.** Use the one named, otherwise the first missing one in table order. Say which inputs exist and
   which are missing.
3. **Walk the template.** For each section, show the sample (marked as an example for an invented person), then ask
   the section's question. Ask one section at a time. Accept "skip" and leave the section marked `TODO`, not filled
   with a guess.
4. **Existing file:** show the current value next to the question. Enter keeps it. Never overwrite a section the user
   didn't touch.
5. **Inventory entries** get a stable ID (`[employer-n]`, lowercase, never reused). Numbers go in exactly as the user
   states them, with the user's own qualifier ("about," "roughly"). Ask "how do you know this number?" once per
   number and record the answer in the entry's `basis` line.
6. **Resume rules:** after a correction in any other task ("never say X," "that's wrong"), offer to add it here. That's
   how the never-list grows.
7. **Private terms:** seed from the profile and inventory (name, emails, phone, employers, clearance details, comp
   figures, home paths), show the list, and let the user trim it.
8. **Install the hook** if the skills repo is a local clone: point `core.hooksPath` at `career-ops/scripts/hooks` (or
   add the line to an existing pre-commit) and tell the user which.
9. Write each file and show a short summary of what changed. Don't read back the whole file.

## Output

The private files in the workspace. Nothing is written into the skill folder.

## Never

- Write any answer into the skill repo, its templates, or its examples.
- Fill a section with a plausible guess when the user skips it.
- Copy sample values from a template into a real file.
