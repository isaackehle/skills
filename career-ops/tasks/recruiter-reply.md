# Task: recruiter-reply

## Purpose

Reply to recruiter outreach. Get the facts needed to judge fit before spending a call on it.

## Inputs

- The recruiter's message. Required.
- `{custom}/candidate-profile.md`: target level, location model, sign-off, and any standing reply template. Required.
- Prior contact with this recruiter or company in `{companies}/`, if any.

## Steps

1. If the profile has a standing first-reply template, use it and fill in the role. Otherwise ask, in this order and
   numbered:
   1. **Job description:** the full JD.
   2. **Level:** what level the title maps to, and whether the scope matches the profile's target level.
   3. **Compensation:** their target base range and total package. Ask for their number; give none.
   4. **Location:** remote, hybrid, or on-site, and where.
   5. **Program or team:** what the team does and who it serves (add this when the posting is vague).
2. Skip any question the message already answers. Keep it short and in the profile's voice.
3. Record the contact with [company-records](company-records.md).

## Output

The reply text in the conversation, ready to paste, plus the contact record.

## Never

- State the candidate's comp floor, current pay, or a number of any kind.
- Agree to a call before the open questions are answered, unless the user says to.
