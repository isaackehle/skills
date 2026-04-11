# Scoring Defaults

These are the default scoring categories. Users can override any or all of them in their private profile under `## Scoring Config`.

If no override is present, use these exactly as defined.

If the private profile defines a `## Scoring Config` block, it **fully replaces** this file — partial overrides are not supported. Define all categories in the override if you define any.

---

## Default Categories

```yaml
scoring:
  categories:
    - name: Financial Fit
      max: 10
      priority: 1
      description: >
        Base + TTC vs comp floor, equity value, company stability.
      bands:
        - range: 8-10
          label: Strong
          meaning: Clearly exceeds comp floor, meaningful equity, stable company.
        - range: 5-7
          label: Adequate
          meaning: Meets floor, questions about equity or long-term stability.
        - range: 1-4
          label: Weak
          meaning: Below floor, or major concerns about company ability to pay.
      key_questions:
        - Is the realistic TTC above the comp floor?
        - Is the company stable enough to pay it?
        - Is equity actually worth something, or speculative?
      red_flag: Flag any role where TTC cannot reasonably reach the comp floor.

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
        accommodation signals. If candidate profile indicates burnout recovery,
        weight this category heavily.
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

## How the Agent Uses This

1. At scoring time, load this file first.
2. Check if the private profile has a `## Scoring Config` block with its own `scoring:` yaml.
3. If yes, use the private override. If no, use the defaults above.
4. Sum each category's `max` to get the total (default: 50).
5. Generate the scorecard table dynamically from the categories.
6. Apply the decision bands from `references/scoring-framework.md` using the computed total.

## Schema Reference

Each category must define:

| Field           | Required | Description                                                       |
| --------------- | -------- | ----------------------------------------------------------------- |
| `name`          | Yes      | Display name for the category                                     |
| `max`           | Yes      | Maximum score for this category (integer)                         |
| `priority`      | Yes      | Sort order (1 = highest priority)                                 |
| `description`   | Yes      | What this category measures                                       |
| `bands`         | Yes      | Array of scoring bands, each with `range`, `label`, and `meaning` |
| `key_questions` | No       | Questions to answer when scoring this category                    |
| `red_flag`      | No       | A condition that must be flagged regardless of score              |
