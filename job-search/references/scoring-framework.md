# Scoring Framework

## How Scoring Works

Scoring categories are **configurable**. The agent reads them at scoring time from one of two sources:

1. **Private override** — the candidate profile discovered during config discovery (default path: `private/candidate-profile.private.md`), under `## Scoring Config`
2. **Defaults** — `references/scoring-defaults.md`

If the private profile defines a `## Scoring Config` block, it fully replaces the defaults. Otherwise, defaults apply.

**Comp floor** is always read from the `## Compensation` block in the candidate profile — specifically the `Base floor` and `TTC floor` fields. Never hardcode comp floor values in skill files.

## Resolving the Config

```
1. Load the candidate profile from the path stored in memory (from config discovery)
2. Read comp floor from ## Compensation block
3. Load references/scoring-defaults.md
4. Check private profile for ## Scoring Config
5. If override exists → parse its scoring: yaml → use it
6. If no override → use the defaults
7. Sum all category max values → that's the total scale
8. Apply decision bands (below) using the computed total
```

## Generating the Scorecard

Build the scorecard dynamically from whichever config is active:

```markdown
## Scoring: [Company] — [Role]

| Category | Score | Evidence |
|----------|-------|----------|
| {category.name} | /{category.max} | |
...
| **TOTAL** | **/{total}** | |
```

For each category, in priority order:
- Score using the defined bands (strong / adequate / weak)
- Answer the `key_questions` if defined
- Flag any `red_flag` conditions
- Provide specific evidence — never leave the Evidence column blank

## Decision Bands

Decision bands scale with the total. Calculate thresholds as percentages of the total:

| Tier | Range | Action |
|------|-------|--------|
| Strong Pursue | 80–100% of total | Prioritize — prepare materials and apply |
| Conditional Pursue | 70–79% of total | Validate blockers before committing time |
| Hold | 60–69% of total | Only proceed if unique strategic value |
| Decline | Below 60% of total | Not worth the energy — document and move on |

For the default 5-category config (total = 50):
- Strong Pursue: 40–50
- Conditional Pursue: 35–39
- Hold: 30–34
- Decline: < 30

## Valid Statuses

| Status | Icon | Meaning | Default action |
|--------|------|---------|---------------|
| Exploring | 🔍 | Initial research | Gather data, no commitment |
| Pursuing | 🚀 | Active target | Prepare materials, apply |
| Applied | 📨 | Application submitted | Track response |
| Screening | 📞 | Recruiter/phone screen | Active communication |
| Interviewing | 🎯 | In interview loop | Prep and debrief each stage |
| Hold | ⏸️ | Blocked, monitoring | Wait for condition to change |
| Future | 📅 | No active opening | Monitor for openings |
| Offer | 🎁 | Offer received | Evaluate and negotiate |
| Rejected | ❌ | Application declined | Archive |
| Withdrawn | ➡️ | Self-withdrawn | Document reasoning |

**Default on add: Exploring.** Never write Pursuing without explicit user confirmation.
