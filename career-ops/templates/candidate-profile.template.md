# Candidate Profile — SAMPLE

> Sample for an invented person, Jordan Rivera. The real file lives at `{custom}/candidate-profile.md` and is never
> committed. Scoring, negotiation, and replies read it. Resumes don't; they use the inventory and resume rules.

## Target

> Q: What level and role shapes are you targeting? Which titles are acceptable if the scope is right?

- Target level: Staff, Principal if the scope supports it
- Role shapes: platform, backend, forward-deployed
- Title vs. scope: a Senior title is acceptable only with Staff scope

## Compensation

> Q: Base floor, TTC floor, and the range you're actually aiming for? (Used for scoring only. Never shared.)

- Base floor: $165K
- TTC floor: $185K
- Working range: base $165K–$180K, TTC $185K–$199K
- Equity: discount pre-IPO equity 50% when computing TTC

## Location

> Q: Where are you based, what commute is acceptable, and what on-site arrangement would you accept?

- Home base: Springfield, ST
- Remote preference: fully remote
- On-site: within 45 minutes; hybrid up to 2 days/week for the right role
- Relocation: no

## Hard constraints

> Q: What rules a role out regardless of score?

- No roles below the base floor
- No sectors: gambling

## Preferences

> Q: What do you lean toward and away from: industry, company size, culture, pace?

- Industry: health tech > climate > fintech
- Size: under 500 people
- Pace: sustainable; "fast-paced" without support signals is a flag

## Energy and constraints

> Q: Anything about energy, health, or life constraints the agent should weigh when scoring culture and pace? (Optional.
> It stays private and is only used for scoring and coaching.)

- Protected time: Tuesday and Thursday mornings

## Communication

> Q: How do you want replies and letters to sound? Sign-off? A standing first reply for recruiters?

- Voice: direct, plain, no hype
- Sign-off: "Thanks," / "— Jordan"
- Standing recruiter reply: ask for JD, level, comp range, location before a call

## Already screened

> Q: Companies you've already looked at, with the outcome, so they aren't pitched again cold?

- Contoso: past employer
- Fabrikam: passed, 2026-03, on-site only

## Scoring Config

> Q: Do the default scoring categories work for you, or do you want different categories, weights, or bonus rules?
> (Optional. If defined, it fully replaces the defaults in references/scoring-framework.md.)

```yaml
# scoring:
#   categories:
#     - name: Financial Fit
#       max: 10
#       priority: 1
#       description: Base vs floor, TTC vs floor, equity, stability.
#       bands:
#         - { range: 8-10, label: Strong, meaning: Clears both floors with room }
#         - { range: 5-7, label: Adequate, meaning: Clears one floor }
#         - { range: 1-4, label: Weak, meaning: Below both floors }
#   bonus_rules:
#     - Financial Fit >= 9 adds 2 to Mission Fit (capped at max)
```
