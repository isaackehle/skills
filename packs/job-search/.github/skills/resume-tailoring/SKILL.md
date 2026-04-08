---
name: resume-tailoring
description: Tailor a base resume to a specific role without inventing experience.
user_invocable: true
---

# Resume Tailoring

Tailor a base resume for a target role. Prioritize relevance, clarity, and truthfulness.

## Inputs
- Base resume
- Job description
- Candidate profile (optional)
- Output identifier (optional)

## Rules
- Do not invent metrics, technologies, titles, or projects.
- Preserve chronology and factual content.
- Reorder bullets and skills by relevance.
- Lead with the strongest matching evidence.
- Keep weak summary language to a minimum.
- Call out real gaps separately.

## Workflow
1. Extract required and preferred signals from the JD.
2. Match existing evidence from the resume.
3. Reorder bullets for relevance.
4. Emphasize scope, architecture, leadership, and business impact.
5. List gaps without fabricating coverage.

## Output
Use `tailoring-template.md`.
