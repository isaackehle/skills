# Tailoring Guardrails

Generic do and don't for any task that writes claims about the candidate: resumes, letters, application answers, and
interview stories. The candidate's own never-list lives in the private `resume-rules.md` and takes precedence over this.

These rules come from real failure modes. A tailoring run that optimizes for keyword match or level fit will invent
facts to close the gap unless something stops it.

## The rule

Tailoring may **select, order, compress, and reword**. It may not **add**. Every claim traces to an inventory entry or
to the user's own words in this session.

## Allowed

- Choosing which entries to show and which to drop for this JD.
- Putting JD-matching bullets first, and JD-matching tools first in the skills list.
- Using the JD's word for the same thing ("event-driven" for "pub/sub over SNS/SQS" when that's what it was).
- Shortening a bullet, merging two bullets from the same entry, or compressing an old role to one line.
- Leaving a requirement unaddressed. A visible gap beats an invented match.

## Not allowed, with the form it usually takes

| Failure                | What it looks like                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------- |
| Invented number        | "reduced X by 40%" with no number in the source; summary tables of "key metrics"       |
| Estimated number       | "about 20 engineers" when the source gives no count                                    |
| Scope inflation        | "led" for "contributed," "org" for "team," "architected" for "implemented"             |
| Status inflation       | "migrated" or "delivered" for a proof of concept that never cut over                   |
| Misattribution         | Work from one employer or year shown under another                                     |
| Title drift            | A title upgraded to match the target level, or an internal level code used as a title |
| Tool drift             | A JD tool added to a role that didn't use it                                           |
| Product drift          | "AI-assisted development" restated as "built AI features"                             |
| Count drift            | "mentored engineers" turned into "mentored 15+ engineers"                              |
| Tenure math            | Years of experience or years with a credential computed wrong or rounded up            |
| Wrong document type    | Comp targets, availability, target level, interview prep, or a version footer on a resume |
| Fan-out                | Four variants plus "optimized" extras when one resume was asked for                    |

## Where the facts come from

1. The inventory entries cited in `src`.
2. The user's words in this session, quoted into the output's notes.
3. Nothing else. Not memory of earlier conversations, not other tailored resumes, not what is typical for the role.

If a fact seems likely but isn't in either source, ask. Then add the answer to the inventory through
[customize](../tasks/customize.md) so it has an ID next time.

## When rule files disagree

`resume-rules.md` wins. Older rule files in the workspace may list as confirmed a number that has since been retired.
Point the conflict out to the user; don't settle it quietly in either direction.
