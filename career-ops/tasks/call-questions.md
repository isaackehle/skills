# Task: call-questions

## Purpose

Turn a list of questions to ask into a one-page sheet the user keeps open during the call, so nothing is forgotten and
every answer lands next to its question.

## Inputs

- Company and the questions to ask. Required. The questions come from the role file's screen questions, from
  [interview-prep](interview-prep.md), or from the user.
- Contact, role, and call date and time, if known.
- `{custom}/candidate-profile.md` for the "Never say" lines (comp floor handling, constraints).
- `call_questions` in `{custom}/AGENTS.md` (see Config below).

## Load

- [templates/call-questions.template.md](../templates/call-questions.template.md)

## Config: `call_questions`

| Value  | Behavior                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------ |
| `ask`  | Default when the key is missing. Ask once, when questions are first produced: "Want these on a one-page in-call question sheet, made automatically from now on?" Yes sets `auto`. No sets `off`. |
| `auto` | Create the sheet whenever a questions-to-ask list is produced. Say where it went in one line.    |
| `off`  | Never create it unprompted. Create one only when the user asks.                                  |

Write the answer back to `{custom}/AGENTS.md` as `- call_questions: auto|off`. If the user asks for a sheet for this
call only, make it and leave the setting alone.

## Steps

1. **Trigger.** Run this after any task that produces questions to ask: [score-posting](score-posting.md) (screen
   questions), [interview-prep](interview-prep.md) (questions to ask), [recruiter-reply](recruiter-reply.md) (questions
   held for the call), or a user-provided list. Resolve `call_questions` first.
2. **Sort.** Put questions in call order: scope and level, pay structure, constraints (clearance, on-site, poly),
   process and team, close. Mark each must-ask, should-ask, or if-time-allows. At least two must-asks cover pace,
   management, or autonomy when the questions come from interview-prep.
3. **Green and red-flag answers** for each must-ask, short. Leave the user's own wording for questions they supplied.
4. **Never-say block.** Pull from the candidate profile: never state the comp floor or target; ask for their range.
   Add profile-specific items (for example, hard constraints not to concede on the call).
5. **Get-in-writing list.** Anything to confirm by email afterward: pay range, title, level, clearance terms.
6. **Save** to `{companies}/<company>/discussions/call-questions-YYYY-MM-DD.md` from the template, using the call date
   (today's date if unknown). Create the folder if it's missing. If the call date later changes, rename the file.
7. **Link it** from the role file's Notes and from the live-notes file when [live-notes](live-notes.md) starts.

## Output

`{companies}/<company>/discussions/call-questions-YYYY-MM-DD.md`, and one line telling the user where it is.

## Never

- Invent a green or red-flag answer the research doesn't support; leave it blank instead.
- Put the comp floor or target on the sheet as a number.
- Overwrite a sheet that has answers filled in; add a dated section or save a new file.
