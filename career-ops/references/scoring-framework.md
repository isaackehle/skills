# Scoring Framework

## How Scoring Works

Scoring categories are **configurable**. The agent reads them at scoring time from one of two sources:

1. **Private override** — the candidate profile discovered during config discovery (default path:
   `{custom}/candidate-profile.md`), under `## Scoring Config`
2. **Defaults** — the defaults below

If the custom profile defines a `## Scoring Config` block, it fully replaces the defaults. Otherwise, defaults apply.

**Comp floor** is always read from the `## Compensation` block in the candidate profile — specifically the `Base floor`
and `TTC floor` fields. Never hardcode comp floor values in skill files.

## Resolving the Config

1. Load the candidate profile from the path stored in memory (from config discovery)
2. Read comp floor from ## Compensation block
3. Load the defaults below
4. Check custom profile for ## Scoring Config
5. If override exists → parse its scoring: yaml → use it
6. If no override → use the defaults
7. Sum all category max values → that's the total scale
8. Apply decision bands (below) using the computed total

## Generating the Scorecard

Build the scorecard dynamically from whichever config is active:

```markdown
## Scoring: [Company] — [Role]

| Category        | Score           | Evidence |
| --------------- | --------------- | -------- |
| {category.name} | /{category.max} |          |
...
| **TOTAL** | **/{total}** | |
```

For each category, in priority order:

- Score using the defined bands (strong / adequate / weak)
- Answer the `key_questions` if defined
- Flag any `red_flag` conditions
- Provide specific evidence — never leave the Evidence column blank

## Default Categories

Used when the candidate profile has no `## Scoring Config` block. An override replaces these entirely.

```yaml
scoring:
  categories:
    - name: Financial Fit
      max: 10
      priority: 1
      description: >
        Base vs the profile's base floor, TTC vs the profile's TTC floor, equity value, company stability.
      bands:
        - range: 8-10
          label: Strong
          meaning: Base ≥ base floor AND TTC ≥ TTC floor, meaningful equity, stable company.
        - range: 5-7
          label: Adequate
          meaning: Meets one floor (base or TTC), questions about the other.
        - range: 1-4
          label: Weak
          meaning: Below both floors, or major concerns about company ability to pay.
      key_questions:
        - Is the base at or above the base floor?
        - Is the realistic TTC at or above the TTC floor?
        - Is the company stable enough to pay it?
        - Is equity actually worth something, or speculative?
      red_flag: Flag any role where TTC cannot reasonably reach the comp floor, or where base is below the base floor.

    - name: Technical Fit
      max: 10
      priority: 2
      description: >
        Stack alignment, seniority match, architectural scope, learning curve.
      bands:
        - range: 8-10
          label: Strong
          meaning: Strong stack match, appropriate scope for target level, real learning opportunity.
        - range: 5-7
          label: Adequate
          meaning: Adequate match, some gaps or scope questions.
        - range: 1-4
          label: Weak
          meaning: Significant misalignment, wrong level, or heavy ramp with no payoff.
      key_questions:
        - Does the actual tech stack match (not just buzzwords)?
        - Is the architectural scope appropriate for the target level?
        - What is the real technical debt situation?

    - name: Nervous System Fit
      max: 10
      priority: 3
      description: >
        Management quality, toxicity risk, pace sustainability, remote flexibility,
        accommodation signals. If the candidate profile describes energy or
        recovery constraints, weight this category heavily.
      bands:
        - range: 8-10
          label: Strong
          meaning: Evidence of good management, async-friendly, sustainable pace, accommodation-aware.
        - range: 5-7
          label: Adequate
          meaning: Unclear signals, some concerns worth probing in interviews.
        - range: 1-4
          label: Weak
          meaning: Toxic signals in Glassdoor or JD, poor WLB, pace language without support signals.
      key_questions:
        - What does management quality look like — tenure, background?
        - Is the pace sustainable?
        - Is there async culture and schedule flexibility?
      red_flag: Nervous system signals are data, not noise.

    - name: Strategic Fit
      max: 10
      priority: 4
      description: >
        Career trajectory, resume brand value, path to next level, network access.
      bands:
        - range: 8-10
          label: Strong
          meaning: Clear path to next level, strong resume brand value, network worth building.
        - range: 5-7
          label: Adequate
          meaning: Moderate trajectory value, some career benefit.
        - range: 1-4
          label: Weak
          meaning: Dead end, off-brand for the target career path, or no upward path.
      key_questions:
        - Is there a real path to the next level?
        - Does this company name add resume value?
        - Is the network worth building?

    - name: Mission Fit
      max: 10
      priority: 5
      description: >
        Values alignment, who the company serves, leadership authenticity,
        business model (generative vs extractive).
      bands:
        - range: 8-10
          label: Strong
          meaning: Direct alignment with values — serving people who need it, technical leadership with impact.
        - range: 5-7
          label: Adequate
          meaning: Neutral or somewhat aligned — acceptable.
        - range: 1-4
          label: Weak
          meaning: Misaligned, extractive business model, or leadership not credible on the stated mission.
      key_questions:
        - Who do they actually serve?
        - Is the business model generative or extractive?
        - Is leadership authentic about the mission, or is it marketing?
```

### Bonus rules

The profile may define bonus rules (for example, a strong score in one category relaxing another). Apply them after
scoring and show the adjustment in the Evidence column.

## Decision Bands

Decision bands scale with the total. Calculate thresholds as percentages of the total:

| Tier               | Range              | Action                                      |
| ------------------ | ------------------ | ------------------------------------------- |
| Strong Pursue      | 80–100% of total   | Prioritize — prepare materials and apply    |
| Conditional Pursue | 70–79% of total    | Validate blockers before committing time    |
| Hold               | 60–69% of total    | Only proceed if unique strategic value      |
| Decline            | Below 60% of total | Not worth the energy — document and move on |

For the default 5-category config (total = 50):

- Strong Pursue: 40–50
- Conditional Pursue: 35–39
- Hold: 30–34
- Decline: < 30

## Statuses

See [matrix.md](matrix.md). A newly scored role is Exploring.
