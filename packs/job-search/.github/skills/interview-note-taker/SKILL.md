---
name: interview-note-taker
description: Capture live interview notes in a structured format optimized for fast note-taking, factual observations, and later debriefing.
user_invocable: true
---

# Interview Note Taker

Use this skill during a live interview or immediately after while memory is fresh.

## Purpose
Capture factual, structured notes without over-processing them in real time.

## Inputs
Use any that are available:
- Company
- Role
- Stage
- Interviewer names
- Start time
- Prep brief

## Rules
- Prefer short phrases over polished sentences.
- Capture facts, quotes, and commitments.
- Mark uncertainty clearly.
- Do not summarize too early.
- Separate observed facts from your interpretation.
- Record follow-ups and unanswered questions as they arise.
- If a statement feels important, capture the exact wording or a near-verbatim quote.

## Note-taking conventions
Use these markers:
- `Q:` question asked to me
- `A:` my answer summary
- `IQ:` question I asked interviewer
- `IR:` interviewer response
- `RF:` red flag
- `GF:` green flag
- `FU:` follow-up needed
- `?` unclear / verify later
- `!` important moment

## Workflow
1. Start with interview metadata.
2. Capture notes chronologically.
3. Mark strong signals, weak signals, and follow-ups inline.
4. End with a fast post-call memory dump before doing a formal debrief.

## Output
Use `live-notes-template.md`.
