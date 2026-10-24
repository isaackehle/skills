# Task: negotiate

## Purpose

Handle comp conversations: what to say when asked for a number, how to evaluate an offer, how to compare offers, and how
to counter.

## Inputs

- `{custom}/candidate-profile.md`: compensation, negotiation notes, non-negotiables. Required.
- The offer or the comp question, with whatever numbers were stated and who stated them.
- The role's scoring file, for leveling and path-to-next-level notes.

## Load

- [references/negotiation-rules.md](../references/negotiation-rules.md)

## Steps

1. **Asked for a number:** draft a deflection to their range, in the profile's voice.
2. **Offer in hand:** compute TTC (base + target bonus + annualized equity with a stated discount for illiquid equity;
   sign-on shown separately). Compare it to the profile's floors and working range. Flag "close to the floor" as not
   at the floor.
3. **Several offers:** put them side by side (base, bonus, equity with discount, TTC, level, path to next level,
   location, the scorecard total) and name the trade-offs. Don't pick for the user.
4. **Path to next level:** say whether the offer documents one. If it doesn't, list it as a negotiation item.
5. **Counter:** one priority item first (usually base), the ask, the reason, and the fallback dimensions (equity,
   sign-on, title, start date, PTO). Draft the message.

## Output

The analysis and draft messages in the conversation. Save the offer details to the role file under Compensation.

## Never

- Disclose the floor or current pay to the employer.
- Treat a verbal offer as final.
- Round up speculative equity to make TTC clear the floor.
