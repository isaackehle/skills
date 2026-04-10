# Opportunity Evaluation

Research a company thoroughly, then score it using the 5-category framework. One workflow, one decision.

## Phase 1: Quick Screen (Go / No-Go)

Run these before investing in deep research. Any instant disqualifier → stop and document why.

**Instant disqualifiers:**
- TTC ceiling clearly below comp floor (from private profile)
- Role requires relocation (remote-only or commutable from Owings Mills, MD — ~1hr radius: Baltimore, Columbia, Frederick)
- In-office schedule conflicts with Shabbat (Fri sundown–Sat sundown)
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

| Metric | Red Flag | Yellow | Green |
|--------|----------|--------|-------|
| Overall | < 3.0 | 3.0–3.5 | > 3.5 |
| Work/Life Balance | < 3.0 🚨 | 3.0–3.5 | > 3.5 |
| Senior Management | < 3.0 🚨 | 3.0–3.5 | > 3.5 |
| CEO Approval | < 50% ⚠️ | 50–70% | > 70% |
| Recommend to Friend | < 50% ⚠️ | 50–70% | > 70% |

- Filter reviews by "Engineering" or "Software" when possible
- Weight the last 6 months heavily — culture changes fast
- Read 5–10 most recent (not "featured") reviews
- Engineering-specific reviews outweigh company-wide averages

**Red flag phrases:** toxic culture, high turnover, revolving door, burnout, "fast-paced" (often = unsustainable), hired then laid off, post-merger chaos, leadership changes frequently

**Green flag phrases:** flexible, supportive management, async-friendly, sustainable pace, transparent leadership, room to grow

### Crunchbase Analysis

| Stage | Risk | Notes |
|-------|------|-------|
| Pre-Series A | High | May not meet comp floor; equity is speculative |
| Series A/B | Medium-High | Growth mode — often chaotic, high expectation |
| Series C+ | Medium | More stable; watch burn rate and last round date |
| Public | Lower | Most stable; check recent earnings and layoff history |

**Major red flags:** recent large acquisition (integration risk), down rounds, no funding in 2+ years with no revenue signals, layoffs despite recent funding.

---

## Phase 3: Score and Decide

Load `references/scoring-framework.md` for full scoring criteria and thresholds.

Score each category 1–10 with evidence. Sum to /50.

**Key questions per category:**

**Financial Fit:** Is the realistic TTC above the comp floor? Is the company stable enough to pay it? Is equity actually worth something, or speculative?

**Technical Fit:** Does the actual tech stack match (not just buzzwords)? Is the architectural scope appropriate for Staff/Principal level? What's the real technical debt situation?

**Nervous System Fit:** What does management quality look like on LinkedIn — tenure, background? Is the pace sustainable? Is there async culture and schedule flexibility? Any accommodation signals?

**Strategic Fit:** Is there a real path to Principal or above? Does this company name add resume value? Is the network worth building?

**Mission Fit:** Who do they actually serve? Is the business model generative or extractive? Is leadership authentic about the mission, or is it marketing?

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

Paste into the position file at `companies/[Company]/job-descriptions/[Position]-[ID].md`:

```markdown
## Scoring: [Company] — [Role]

| Category | Score | Evidence |
|----------|-------|----------|
| Financial Fit | /10 | |
| Technical Fit | /10 | |
| Nervous System Fit | /10 | |
| Strategic Fit | /10 | |
| Mission Fit | /10 | |
| **TOTAL** | **/50** | |

**Recommendation:** Strong Pursue / Conditional Pursue / Hold / Decline

**Key Risks:**
-

**Key Opportunities:**
-

**Blockers (if any):**
-
```
