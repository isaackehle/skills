# Opportunity Evaluation

Research a company thoroughly, then score it using the configured scoring categories. One workflow, one decision.

## Phase 1: Quick Screen (Go / No-Go)

Run these before investing in deep research. Any instant disqualifier → stop and document why.

**Instant disqualifiers:**

- TTC ceiling clearly below comp floor (from custom profile)
- Role requires relocation beyond the candidate's commute radius (check custom profile for location constraints)
- In-office schedule conflicts with protected time blocks (check custom profile for schedule constraints)
- Obvious toxic signals in the JD itself

**Quick checks:**

1. **levels.fyi** — comp range for this role and level at this company
2. **Glassdoor** — overall rating and recent engineering-specific reviews
3. **Crunchbase** — funding stage and any recent acquisition/layoff risk

If the role passes the quick screen, proceed to Phase 2.

---

## Phase 2: Deep Research

Dispatch **5 parallel subagents** — one per scoring category. Each agent focuses only on its category's sources and returns a scored finding with evidence. Do not run Phase 2 sequentially unless the platform does not support parallel subagents.

### Parallel Dispatch Pattern

Spawn these five subagents simultaneously, each with access to the company name, role title, JD text, and the comp floor from the candidate profile:

| Agent         | Focus                                                                      | Primary Sources                         |
| ------------- | -------------------------------------------------------------------------- | --------------------------------------- |
| **comp**      | Financial Fit — comp range, equity, levels.fyi                             | levels.fyi, job posting, offers data    |
| **culture**   | Nervous System Fit — management quality, pace, WLB                         | Glassdoor (last 6 months), Blind        |
| **stability** | Financial Fit (company) — funding stage, layoff risk                       | Crunchbase, recent news, WARN filings   |
| **technical** | Technical Fit — stack match, eng blog, real tech culture                   | Eng blog, tech talks, LinkedIn eng team |
| **jd**        | JD Analysis — red/green flags in the posting itself, role scope, level fit | JD text, careers page, LinkedIn         |

Each agent returns:

1. Category name and max score
2. Proposed score with band justification (strong / adequate / weak)
3. Specific evidence (quotes, numbers, dates)
4. Any red flags triggered

Wait for all 5 agents to return, then proceed to Phase 3 to aggregate and score.

### Research Sources (Priority Order)

**Must-check every company:**

1. Company website — product, mission, careers page culture signals
2. Glassdoor — overall rating, engineering-specific reviews, recent trends
3. levels.fyi — compensation ranges for role and level
4. LinkedIn — employee count, engineering leadership tenure
5. Crunchbase — funding stage, investors, recent rounds, acquisitions

**Should-check most companies:**
6. Recent news — funding, layoffs, pivots, leadership changes
7. Engineering blog or tech talks — real technical culture vs. marketing
8. Blind — unfiltered employee sentiment

**Nice-to-check when time allows:**
9. 10-K or investor materials (public companies)
10. Podcasts or leadership interviews

### Glassdoor Analysis

| Metric              | Red Flag | Yellow  | Green |
| ------------------- | -------- | ------- | ----- |
| Overall             | < 3.0    | 3.0–3.5 | > 3.5 |
| Work/Life Balance   | < 3.0 🚨  | 3.0–3.5 | > 3.5 |
| Senior Management   | < 3.0 🚨  | 3.0–3.5 | > 3.5 |
| CEO Approval        | < 50% ⚠️  | 50–70%  | > 70% |
| Recommend to Friend | < 50% ⚠️  | 50–70%  | > 70% |

- Filter reviews by "Engineering" or "Software" when possible
- Weight the last 6 months heavily — culture changes fast
- Read 5–10 most recent (not "featured") reviews
- Engineering-specific reviews outweigh company-wide averages

**Red flag phrases:** toxic culture, high turnover, revolving door, burnout, "fast-paced" (often = unsustainable), hired then laid off, post-merger chaos, leadership changes frequently

**Green flag phrases:** flexible, supportive management, async-friendly, sustainable pace, transparent leadership, room to grow

### Crunchbase Analysis

| Stage        | Risk        | Notes                                                 |
| ------------ | ----------- | ----------------------------------------------------- |
| Pre-Series A | High        | May not meet comp floor; equity is speculative        |
| Series A/B   | Medium-High | Growth mode — often chaotic, high expectation         |
| Series C+    | Medium      | More stable; watch burn rate and last round date      |
| Public       | Lower       | Most stable; check recent earnings and layoff history |

**Major red flags:** recent large acquisition (integration risk), down rounds, no funding in 2+ years with no revenue signals, layoffs despite recent funding.

---

## Phase 3: Score and Decide

Load `{references_folder}/scoring-framework.md` to resolve the active scoring config.

1. Resolve categories from the custom profile override or defaults (see `{references_folder}/scoring-defaults.md`)
2. For each category, in priority order:
   - Score within 1 to `max` using the defined bands
   - Answer the `key_questions` if defined
   - Flag any `red_flag` conditions
   - Provide specific evidence
3. Sum to the computed total
4. Apply decision bands from `scoring-framework.md` (percentage-based thresholds)

---

## Phase 4: Interview Updates

After each interview stage, return to the company file and:

- Add date and outcome to the interview timeline
- Update culture assessment with live observations
- Adjust scores based on new evidence
- Document red and green flags surfaced by interviewers
- Note whether Glassdoor concerns were validated or contradicted

---

## Output Format

Generate dynamically from the active scoring config. Paste into the position file at `companies/[Company]/roles/[Position]-[ID].md`:

```markdown
## Scoring: [Company] — [Role]

| Category        | Score           | Evidence |
| --------------- | --------------- | -------- |
| {category.name} | /{category.max} |          |
| ...             |                 |          |
| **TOTAL**       | **/{total}**    |          |

**Recommendation:** Strong Pursue / Conditional Pursue / Hold / Decline

**Key Risks:**
-

**Key Opportunities:**
-

**Blockers (if any):**
-
```

Do not hardcode category names in the output — always read them from the resolved config.
