# Task: cover-letter

## Purpose

Write a cover letter or a written application answer for one role. It uses the same provenance rule as the resume.

## Inputs

- JD analysis for the role. Required.
- The verified resume JSON for the role. Required. The letter may only use claims that passed verification.
- `{custom}/resume-rules.md` and `{custom}/candidate-profile.md` (for voice and sign-off). Required.
- The specific question, if this is an application answer.

## Load

- [references/tailoring-guardrails.md](../references/tailoring-guardrails.md)

## Steps

1. Pick the two or three verified claims that answer the JD's top requirements.
2. Write 250–350 words: a specific opening tied to this company's product or mission, one or two evidence paragraphs
   built from those claims, and a short close. Match the voice described in the profile.
3. Attach `src` IDs to each factual sentence in a sidecar list. Check it against the resume's sources: no new facts.
4. Read it once against the rules file's never-list.

## Output

`{companies}/<company>/letters/<role-id>-cover-letter-v<n>.md` plus the sidecar source list.

## Never

- Introduce a claim the resume doesn't already carry.
- Mention compensation, the comp floor, or level codes.
- Use a generic opening that would fit any company.
