# Task: live-notes

## Purpose

Capture a call as it happens: fast, factual, marked up, with no interpretation.

## Inputs

- Company, and contact if known. Contact details can wait until after the call.

## Load

- [references/note-taking.md](../references/note-taking.md)

## Steps

1. Create `{companies}/<company>/discussions/live-notes-YYYY-MM-DD.md` from `templates/live-notes.template.md`. Create
   the company folder if it's missing.
2. During the call, append what the user sends using the markers (`Q:`, `A:`, `IQ:`, `IR:`, `RF:`, `GF:`, `FU:`,
   `?`, `!`). Keep their words. Don't summarize or tidy.
3. After the call, prompt for the post-call dump and energy reading. Then offer [debrief](debrief.md).

## Output

The live-notes file.

## Never

- Interpret during the call. Interpretation happens in the debrief.
