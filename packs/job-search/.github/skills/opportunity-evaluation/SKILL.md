---
name: opportunity-evaluation
description: Evaluate a job opportunity with a 5-category scorecard and produce a recommendation with evidence.
user_invocable: true
---

# Opportunity Evaluation

Evaluate one role at a time. Use evidence-first scoring. Surface blockers early.

## Inputs
Use any that are available:
- Candidate profile
- Opportunity input
- Job description
- Company research
- Interview notes

If key data is missing, say what is missing and continue with a provisional evaluation.

## Core scorecard (/50)

| Category | What It Measures |
|---|---|
| Financial Fit | Compensation, equity, stability |
| Technical Fit | Stack match, scope, seniority, growth |
| Nervous System Fit | Management quality, pace, flexibility, burnout risk |
| Strategic Fit | Career trajectory, title path, résumé value, network |
| Mission Fit | Values alignment, customer impact, domain interest |

## Score bands
- 40–50: Strong Pursue
- 35–39: Conditional Pursue
- 30–34: Hold
- <30: Decline

## Rules
- Do not invent facts.
- Separate evidence from inference.
- Flag blockers early.
- Treat compensation, location, role level, and toxicity risk as first-order filters.
- Prefer recent and engineering-specific evidence over old or generic reputation.
- Do not mark a role as Pursuing unless the user explicitly says so.

## Workflow

### 1) Quick screen
Check:
1. Compensation viability
2. Location / remote viability
3. Role-level fit
4. Clear culture or management red flags
5. Stability concerns

If a hard blocker exists, say so before deep analysis.

### 2) Deep evaluation
Score each category 1–10 using available evidence.

### 3) Recommendation
Map the total score to the score bands. Include open questions and next-step research.

## Output
Use `scorecard-template.md`.
