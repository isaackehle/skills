# Task: verify-resume

## Purpose

Check a tailored resume against its sources before the user sees it as final. The verifier did not write the draft and
has no stake in its keyword score. Its job is to find claims that don't hold.

## Inputs

- The tailored resume JSON. Required.
- `{resumes}/experience-inventory.md`. Required.
- `{custom}/resume-rules.md`. Required.
- The role's keywords file from analyze-jd (`<role-id>-keywords.txt`), for the coverage check only.

Do not pass the tailoring conversation, the tailor's reasoning, or the JD analysis. The verifier judges the artifact,
not the intent.

## Load

- [references/tailoring-guardrails.md](../references/tailoring-guardrails.md)

## Steps

1. **Mechanical pass.** Run:

   ```shell
   node scripts/verify-resume.js <resume.json> \
     --inventory {resumes}/experience-inventory.md \
     --rules {custom}/resume-rules.md \
     --keywords <role-id>-keywords.txt
   ```

   It fails on: a claim with no `src`, a `src` ID that isn't in the inventory, a number in a claim that doesn't appear
   in any of its cited entries, a company, title, or date range that isn't in the inventory, and any pattern in the
   rules file's `banned` block. It also reports keyword coverage.
   Every failure goes in the report. None of them are waived.
2. **Meaning pass.** For each claim, read it next to its cited entries and check:
   - Scope: does the claim say more than the source (led vs. contributed, org vs. team, shipped vs. prototyped,
     production vs. proof of concept)?
   - Attribution: is the work in the source this person's, at this employer, in this period?
   - Tense and status: does "migrated" or "delivered" describe something the source says was finished?
   - Tools: is every named tool in the cited entry or in the inventory's skills for that role?
3. **Rules pass.** Read `resume-rules.md` line by line against the whole resume: the never-list, format rules, title
   rules, and the "never put on a resume" items (comp, level codes, availability).
4. **Consistency pass.** Titles, dates, and employer names match the inventory exactly. Summary claims are supported
   by bullets in the body.

## Output

Write `<resume>.verify.md` next to the JSON:

- **Verdict:** PASS or FAIL. Any failed claim means FAIL.
- **Failures:** each one with the claim, its `src`, what's wrong, and the fix (cut, revert to the source wording, or
  ask the user).
- **Warnings:** things that pass but read as a stretch.
- **Coverage:** keyword coverage after verification fixes.

On FAIL, the main conversation applies the fixes (cut or revert only, never a new claim) and runs this task again. Only
a PASS goes to the user for approval.

## Never

- Accept a claim because it is "probably true" or because the user "likely did this."
- Suggest new content to raise coverage.
- Grade leniently because the tailor flagged something as intentional.
