# Task: tailor-resume

## Purpose

Produce one resume for one JD by selecting, ordering, compressing, and rewording inventory evidence. The output is
structured data with a source on every claim, so the verifier can check it mechanically.

## Inputs

- The JD analysis from [analyze-jd](analyze-jd.md). Required. If it doesn't exist, run analyze-jd first.
- `{resumes}/experience-inventory.md`. Required.
- `{custom}/resume-rules.md`. Required.
- The base resume named in the analysis (`.json`, if one exists).
- Any instruction the user gave in this session about this resume (quote it into the output's `notes`).

Nothing else. Specifically not: earlier conversations, memory, other companies' tailored resumes, or the user's general
background as remembered.

## Load

- [references/tailoring-guardrails.md](../references/tailoring-guardrails.md)
- [references/resume-format.md](../references/resume-format.md)

## Steps

1. Read `resume-rules.md` completely before anything else. Its never-list and format rules bind every later step.
2. Start from the base resume JSON if there is one, otherwise from the inventory.
3. **Select.** Keep the lead entries from the analysis. Drop or compress entries that don't serve this JD. Older roles
   compress before they disappear.
4. **Order.** Within each role, put the bullets that match required JD items first. In the skills section, put the
   JD's tools first, but only tools the inventory supports.
5. **Reword.** Use the JD's vocabulary where the inventory evidence is the same thing under another name. Each
   reworded bullet keeps the meaning of its source: same scope, same numbers, same ownership level. If the JD's word
   would overstate the evidence ("led" for "contributed to," "architected" for "implemented"), keep the inventory's
   word.
6. **Summary and headline.** Build these only from the bullets you kept. A summary claim needs the same `src` as the
   bullets it summarizes.
7. **Attach sources.** Every summary sentence, bullet, and highlight carries `src`: the inventory IDs it comes from.
   Skills and education carry `src` when they assert something beyond the inventory's skills list.
8. **Mark open questions.** If a JD requirement could be met by something the user might have done but the inventory
   doesn't show, don't write it. Add it to `questions` for the user.
9. Report coverage against the ceiling from the analysis. Being under target is a fine result; inventing to close the
   gap is not.

## Output

Write `{companies}/<company>/resumes/<CandidateName>-<role-id>-v<n>.json` in the schema in
[references/resume-format.md](../references/resume-format.md). Increment `v<n>` and never overwrite. Then render the
review markdown with `scripts/build-resume.js <file>.json --md-only`.

Return to the main conversation: the file paths, coverage (before / after / ceiling), the questions list, and nothing
else. The main conversation then runs [verify-resume](verify-resume.md).

## Never

- Add a number, title, date, team size, scope, tool, or outcome that isn't in the inventory or the user's words this
  session.
- Estimate or round a number into existence.
- Put compensation, target level, internal level codes, availability, or interview prep content in the resume.
- Produce more than the one resume asked for.
- Copy bullets from another company's tailored resume without re-checking their `src`.
