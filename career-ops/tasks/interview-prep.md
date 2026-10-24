# Task: interview-prep

## Purpose

Prepare for one interview stage at one company.

## Inputs

- Company, role, stage, date, and interviewer names if known. Required.
- The role file (with its scoring and screen questions) and any earlier debriefs for this company.
- The verified resume sent for this role. Stories come from what the company has already seen.
- `{resumes}/stories/` and private gap-answer notes in `{custom}/`, if they exist.

## Load

- [references/interview-prep.md](../references/interview-prep.md)
- [references/coaching-guardrails.md](../references/coaching-guardrails.md)

## Steps

1. Say what this stage tests, using the stage table and anything the recruiter said.
2. Pick 3–5 stories. Each one cites the inventory IDs it's built from. Tailor the "why it's relevant here" line to
   this JD. Don't add outcomes the inventory doesn't have.
3. List the gaps the JD analysis found and the gap answer for each. A gap answer states what the candidate has and how
   they'd close the gap. It doesn't apologize, and it doesn't claim the gap away.
4. Questions to ask: must-ask (including at least two on pace, management, or autonomy), should-ask, and nice-to-ask.
   Each must-ask has a green answer and a red-flag answer.
5. Risks to probe, pulled from the scoring's key risks.
6. Scripted openings: tell me about yourself, why you're looking, why this company. The comp question deflects to
   their range.

## Output

`{companies}/<company>/interviews/<stage>-<YYYY-MM-DD>.md` in the reference's structure.

## Never

- Invent an outcome or metric for a story.
- Script a number for the comp question.
