---
name: career-ops
description: "Job search and resume operations: score a posting, analyze a job description, tailor and verify a resume against a JD, build the docx, draft cover letters and recruiter replies, prep and debrief interviews, negotiate offers, and maintain the pipeline matrix. Load when the user shares a job posting or JD, asks to tailor a resume, preps for or debriefs an interview, handles a recruiter or offer, or updates their job search pipeline."
license: MIT
metadata:
  version: 1.0.0
---

# Career Ops

A router. This file decides which task to run and what context it gets. The work itself lives in `tasks/`, one file per
purpose. Load a task file only when running it, and load only the references that task lists.

This skill is public. Nothing about the candidate lives here. Everything personal is read at runtime from the private
workspace (see [Config](#config)).

## Tasks

| Task                                                | Run when                                           | Runs as                 |
| --------------------------------------------------- | -------------------------------------------------- | ----------------------- |
| [customize](tasks/customize.md)                     | First run, a private input is missing, or after a correction | Main          |
| [score-posting](tasks/score-posting.md)             | A posting needs a pursue / hold / pass decision    | Main, research fan-out  |
| [analyze-jd](tasks/analyze-jd.md)                   | Before tailoring, or when asked what a JD wants    | Isolated task           |
| [tailor-resume](tasks/tailor-resume.md)             | A resume is needed for a specific JD               | Isolated task           |
| [verify-resume](tasks/verify-resume.md)             | Always, after tailor-resume, before anything ships | Isolated task, fresh    |
| [build-resume](tasks/build-resume.md)               | A verified, approved resume needs docx/pdf         | Main                    |
| [cover-letter](tasks/cover-letter.md)               | A cover letter or application answer is needed     | Isolated task, verified |
| [recruiter-reply](tasks/recruiter-reply.md)         | Replying to recruiter outreach                     | Main                    |
| [interview-prep](tasks/interview-prep.md)           | Preparing for an interview stage                   | Main                    |
| [live-notes](tasks/live-notes.md)                   | Taking notes during a call                         | Main                    |
| [debrief](tasks/debrief.md)                         | After an interview or call                         | Main                    |
| [negotiate](tasks/negotiate.md)                     | Comp discussion, offer, or comparing offers        | Main                    |
| [pipeline](tasks/pipeline.md)                       | Add, rescore, update status, archive, show matrix  | Main                    |
| [company-records](tasks/company-records.md)         | Company pages, contacts, calls, folder cleanup     | Main                    |

### Chains

- **Resume for a JD:** analyze-jd → tailor-resume → verify-resume → (user approves) → build-resume. Never skip verify.
  Never build before the user approves the verified markdown.
- **New posting:** score-posting → pipeline (add) → and, if pursuing, the resume chain.
- **Interview loop:** interview-prep → live-notes → debrief → pipeline (rescore/status).

### What "Runs as" means

- **Isolated task:** run in a subagent (or a fresh context if the platform has no subagents) that receives only the
  inputs the task file lists. It does not see this conversation. This keeps each task narrow and stops it from pulling
  in facts it wasn't given.
- **Fresh:** the task must not see the reasoning or drafts that produced its input, only the artifact itself. A verifier
  that watched the draft being written grades its own work.
- **Main:** runs in the current conversation.
- If subagents are unavailable, say so once and run the task inline, still passing only the listed inputs.

Every task file has the same header: **Purpose, Inputs, Load, Steps, Output, Never.** If a required input is missing,
the task stops and asks; it does not fill the gap.

## Config

On the first task in a session, resolve these. Read before asking; ask only for what's missing; write answers back to
`{custom}/AGENTS.md`.

| Alias         | Default                         | Holds                                                     |
| ------------- | ------------------------------- | --------------------------------------------------------- |
| `workspace`   | ask                             | Root of the private job search workspace                  |
| `custom`      | `{workspace}/custom`            | Private profile, rules, denylist                          |
| `resumes`     | `{workspace}/resumes`           | Inventory, base resumes, stories                          |
| `companies`   | `{workspace}/companies`         | One folder per company                                    |
| `auto_research` | `ask`                         | `ask` = confirm before web research; `auto` = proceed     |

Private files the tasks read (templates in [templates/](templates/)):

| File                                  | Required for               | Template                                  |
| ------------------------------------- | -------------------------- | ----------------------------------------- |
| `{custom}/candidate-profile.md`       | scoring, negotiation       | `candidate-profile.template.md`           |
| `{custom}/resume-rules.md`            | every resume/letter task   | `resume-rules.template.md`                |
| `{resumes}/experience-inventory.md`   | every resume/letter task   | `experience-inventory.template.md`        |
| `{custom}/private-terms.txt`          | the pre-commit hook        | `private-terms.template.txt`              |

If a required private file is missing, say which one and offer to run [customize](tasks/customize.md) for it. Do not
substitute guesses, and do not fall back to facts remembered from earlier conversations.

## Hard rules

1. **Provenance.** Every fact in a resume, letter, or reply traces to the experience inventory, the resume rules, or
   something the user said in this session. Tailoring selects, orders, and rewords. It never adds facts, numbers,
   titles, dates, or scope. Keyword match is never a reason to add a claim.
2. **The private rules file wins.** `{custom}/resume-rules.md` overrides anything in this skill and any older rule file.
   If two private files disagree, follow `resume-rules.md` and point out the conflict.
3. **Nothing personal in this repo.** Never write the candidate's name, contact details, employers, clearance, comp,
   level codes, or metrics into skill files, scripts, examples, or commit messages. Examples use invented people and
   companies. The pre-commit hook enforces this; don't work around it.
4. **No comp on documents.** Compensation targets, floors, current pay, and internal level codes never appear on a
   resume or cover letter.
5. **No estimated numbers.** If a bullet has no number in the inventory, it ships without one, or the task asks the
   user for one.
6. **Status defaults to Exploring.** Never set Pursuing or later without explicit confirmation.
7. **Confirm before irreversible actions** (status changes, moves, archive, sending anything).
8. **Never state the comp floor to anyone external.**
9. **One deliverable at a time.** Produce the variant asked for. Don't fan out into extra variants or "optimized"
   copies nobody requested.
10. **No self-reports in the repo.** Don't write implementation summaries, completion banners, or status files into
    the skill.

## Layout

```text
career-ops/
├── SKILL.md            # this router
├── tasks/              # one file per task
├── references/         # generic method, loaded per task
├── templates/          # placeholders for private files and records
├── scripts/            # build-resume.js, check-private-terms.sh
└── examples/           # invented data only
```
