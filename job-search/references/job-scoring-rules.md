# Job Scoring Rules

Research a company thoroughly, then score it using the configured scoring categories. One workflow, one decision.

## Data Fetch Permission

When scoring a job, assume permission to fetch public data (job boards, company websites, Glassdoor, levels.fyi, LinkedIn public pages, Crunchbase, news articles). However, **flag before fetching** if the source is:
- A paywalled or authenticated site (e.g., LinkedIn premium content, Glassdoor detailed reviews requiring login)
- A site that might expose personal data or require credentials
- Anything the user might consider unusual or sensitive

For routine public sources (job posting pages, company about pages, levels.fyi, Crunchbase), proceed without asking.

## Phase 1: Quick Screen (Go / No-Go)

Run these before investing in deep research. Any instant disqualifier → stop and document why.

**Instant disqualifiers:**
- Base salary below $200K (hard floor from private profile)
- TTC ceiling clearly below $225K comp floor (from private profile)
- Role requires relocation beyond the candidate's commute radius (check private profile for location constraints)
- In-office schedule conflicts with protected time blocks (check private profile for schedule constraints)
- Obvious toxic signals in the JD itself

**Quick checks:**
1. **levels.fyi** — comp range for this role and level at this company
2. **Glassdoor** — overall rating and recent engineering-specific reviews
3. **Crunchbase** — funding stage and any recent acquisition/layoff risk

If the role passes the quick screen, proceed to Phase 2.

---

## Phase 2: Deep Research

Use parallel agents when available — one per category is efficient. Otherwise research sequentially.

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

Load `references/scoring-framework.md` to resolve the active scoring config.

1. Resolve categories from the private profile override or defaults (see `references/scoring-defaults.md`)
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

## Scoring Structure and Output Format

### Company Job Description Files

Each company's job description markdown file should include a breakdown of each scoring category with specific evidence from the job description. This is one example, however, depending on the set of scoring framework categories, the format may vary.

```markdown
## Scoring: [Company] — [Role]

| Category      | Score   | Evidence                                                                                                                          |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Financial Fit | /10     | The job description mentions "competitive compensation package with equity" which aligns with the "Strong" band for Financial Fit |
| Technical Fit | /10     | The job description lists experience with "Go, Python, and Rust" which matches the desired stack for Technical Fit                |
| Strategic Fit | /10     | The job description mentions "opportunity to grow into senior roles" which supports the "Strong" band for Strategic Fit           |
| Mission Fit   | /10     | The job description emphasizes "building tools that help developers" which aligns with the mission alignment                      |
| **TOTAL**     | **/40** |                                                                                                                                   |

**Recommendation:** Strong Pursue / Conditional Pursue / Hold / Decline

**Key Risks:**
- The job description doesn't mention any clear risks regarding the role

**Key Opportunities:**
- The position offers strong growth potential in a mission-aligned company

**Blockers (if any):**
- None identified
```

### Comparison Matrix Format

Each job description in the matrix should have a row in the company's main file that shows the scoring breakdown. The comparison matrix itself should include three separate tables organized by status:

#### Active Positions Table
This table includes all positions where you are in the active hiring process:

| Company                     | Role                    | Level | Status     | Score | Comp Range  | Location | Source   | Added      | Notes                               |
| --------------------------- | ----------------------- | ----- | ---------- | ----- | ----------- | -------- | -------- | ---------- | ----------------------------------- |
| [Acme](<companies/Acme/Acme.md>) | Staff SWE — AI Platform | Staff | 📨 Applied | 41/50 | $240k–$280k | Remote   | LinkedIn | 2026-03-15 | Strong technical fit, async culture |

#### Potential Positions Table
This table includes all positions under evaluation or pending action:

| Company                                  | Role                      | Level     | Status      | Score | Comp Range  | Location | Source     | Added      | Notes                                     |
| ---------------------------------------- | ------------------------- | --------- | ----------- | ----- | ----------- | -------- | ---------- | ---------- | ----------------------------------------- |
| [Beta Corp](companies/BetaCorp/BetaCorp) | Principal Eng — Workflows | Principal | 🔍 Exploring | 37/50 | $220k–$250k | Remote   | Greenhouse | 2026-03-20 | Below floor on base, equity may close gap |

#### Archived Positions Table
This table includes all positions that are no longer being considered:

| Company                               | Role                  | Level  | Status     | Score | Comp Range  | Location | Source    | Added      | Notes                     |
| ------------------------------------- | --------------------- | ------ | ---------- | ----- | ----------- | -------- | --------- | ---------- | ------------------------- |
| [Gamma AI](companies/GammaAI/GammaAI) | Senior SWE — Embedded | Senior | ❌ Rejected | 33/50 | $180k–$210k | Remote   | Recruiter | 2026-03-01 | Comp miss, level mismatch |

The company files should contain all the detailed breakdowns of each job posting with their respective scoring tables, and the matrix will show a summary view for each position.

**Status Definitions:**
- **Active Positions:** `📨 Applied`, `📞 Screening`, `🎯 Interviewing`, `🎁 Offer`
- **Potential Positions:** `🔍 Exploring`, `🚀 Pursuing`, `⏸️ Hold`, `📅 Future`
- **Archived Positions:** `❌ Rejected`, `➡️ Withdrawn`, `⏱️ Lapsed`

Do not hardcode category names in the output — always read them from the resolved config.


## Deprecations

- This skill was previously named `opportunity-evaluation`.