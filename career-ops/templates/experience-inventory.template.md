# Experience Inventory — SAMPLE

> This is a sample for an invented person, Jordan Rivera. `customize` uses it to ask questions; the real file lives in
> `{resumes}/experience-inventory.md`, never in this repo.
>
> Every resume and letter claim must cite an entry ID from this file. If it isn't here, it can't be on the resume.

## How entries work

- One `##` heading per role, in the exact form the resume will use: `## Company (Agency) | Title | Dates | Location`.
  The verifier matches company, title, and dates against these headings.
- One `###` entry per accomplishment, starting with a stable ID in brackets: `### [employer-n] Short title`. IDs are
  lowercase, never reused, and never renumbered.
- **What:** what happened, in plain words.
- **Role:** what this person did vs. the team. Choose one: led / owned / built / contributed / advised.
- **Status:** shipped, in production, proof of concept, cancelled, and so on. Be exact; this stops "migrated" claims.
- **Numbers:** each number with its **basis**, meaning how the user knows it.
- **Tools:** only tools actually used for this work.
- **Not:** things people tend to assume about this entry that are false. The verifier and tailor read this line.

---

## Northwind Traders (Staffing Co) | Staff Software Engineer | Jan 2024 – Present | Remote

> Q: For your current role: employer, agency if any, exact title as it appears on paperwork, start date, location?

### [northwind-1] Order API latency

- **What:** Order history API was timing out for large accounts. Traced it to the API pulling full history and filtering
  in application code; moved the filtering into Postgres window functions and added two indexes.
- **Role:** owned (diagnosis and fix); one reviewer.
- **Status:** in production.
- **Numbers:** p95 from 1.2s to 300ms. Basis: Grafana dashboard before/after, screenshot in the PR.
- **Tools:** PostgreSQL, TypeScript, Node.js, Grafana.
- **Not:** no caching layer was added; this was not a cost-reduction project.

> Q: What's one problem you solved here that you'd want an interviewer to ask about? What did you do personally, what
> was the result, and how do you know the number?

### [northwind-2] Event schema standard

- **What:** Wrote the event schema and versioning standard for three teams' SNS/SQS integrations, including
  dead-letter handling.
- **Role:** led (wrote the standard, ran the review).
- **Status:** adopted by all three teams.
- **Numbers:** three teams. Basis: direct knowledge.
- **Tools:** AWS SNS, SQS, JSON Schema.
- **Not:** not Kafka.

---

## Contoso | Senior Software Engineer | Mar 2019 – Dec 2023 | Springfield, ST

### [contoso-1] Warehouse scanner proof of concept

- **What:** Built a parallel proof of concept replacing a vendor platform's scanning flow with an in-house
  event-driven service, tested with real handheld scanners.
- **Role:** built (design and implementation); presented at architecture review.
- **Status:** proof of concept only. The project was cancelled before cutover.
- **Numbers:** none.
- **Tools:** Python, FastAPI, SQS.
- **Not:** never migrated; no production uptime or cost-savings figures exist.

---

## Skills evidence

> Q: List the tools you'd be comfortable being questioned on in an interview, and where you used each one.

| Tool       | Where (entry IDs)          | Level                 |
| ---------- | -------------------------- | --------------------- |
| PostgreSQL | northwind-1                | production            |
| TypeScript | northwind-1                | production            |
| Kafka      | —                          | evaluated only        |

## Education and credentials

> Q: Degrees (with completion month and year), certifications, patents, clearances (with the date granted)?

- BS, Computer Science | State University | completed May 2012
