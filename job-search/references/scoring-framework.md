# Scoring Framework

## 5-Category Model

Each category scored 1-10. Maximum: 50.

| Category | Priority | What It Measures |
|---|---|---|
| Financial Fit | 1st | Base + TTC vs comp floor, equity, stability |
| Technical Fit | 2nd | Stack alignment, seniority match, learning curve, architectural scope |
| Nervous System Fit | 3rd | Management quality, toxicity risk, pace, remote flexibility, accommodation |
| Strategic Fit | 4th | Career trajectory, resume brand, path to Staff/Principal, network access |
| Mission Fit | 5th | Values alignment -- serving vulnerable populations, technical leadership |

## Thresholds

| Score | Tier | Action |
|---|---|---|
| 40-50 | Strong Pursue | Prioritize -- prepare materials and apply |
| 35-39 | Conditional Pursue | Validate blockers before committing |
| <35 | Decline or Monitor | Discuss with candidate before proceeding |

Flag any role where TTC cannot reasonably reach the candidate's comp floor.

## Valid statuses

| Status | Meaning | Action |
|---|---|---|
| Exploring | Initial research | Gather data, no commitment |
| Pursuing | Active target | Prepare materials, apply |
| Applied | Application submitted | Track response |
| Hold | Blocked, monitoring | Wait for condition to change |
| Future | No active opening | Monitor for openings |
| Rejected | Application declined | Archive |
| Offer | Offer received | Evaluate and negotiate |
| Withdrawn | Self-withdrawn | Document reasoning |

Default: Exploring -- never assume Pursuing until candidate explicitly confirms.

## Update protocol

1. Update `_system/job-matrix.json` first -- source of truth.
2. Regenerate `_system/company-comparison-matrix.md`.
3. Sync individual company files.
4. Status changes and score notes go on the company page, not in the matrix.

## Company file structure

- Quick Stats
- 5-Category Scores
- Mission and Product
- Role Details
- Compensation
- Culture Assessment
- Technical Assessment
- Open Items
- Interview Log
- Debriefs
- Final Decision
