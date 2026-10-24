# Research Sources

Where scoring evidence comes from, and how to read it.

## Fetching postings

| Board                          | Fetch                                                                 |
| ------------------------------ | --------------------------------------------------------------------- |
| Greenhouse                     | `job-boards.greenhouse.io/<company>/jobs/<id>` fetches; careers pages often don't |
| Lever                          | Direct fetch works                                                    |
| Ashby, Workday, iCIMS          | JS-rendered. Use a mirror (LinkedIn, aggregator) or ask for a paste   |

## By category

| Category                | Sources                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| Financial (role)        | Posted range, levels.fyi for the company and level, recruiter-stated range |
| Financial (company)     | Crunchbase or press for funding stage and last round, layoff news, WARN filings |
| Technical               | The JD, engineering blog, tech talks, open-source repos, the team on LinkedIn |
| Culture / sustainability | Glassdoor (engineering reviews, last 6 months), Blind, the JD's own wording |
| Strategic               | Leveling, scope vs. title, path to next level, company trajectory       |
| Mission                 | Who the product serves, business model, leadership's own statements     |

Search Glassdoor through web search; direct scraping is usually blocked.

## Glassdoor

| Metric              | Red      | Yellow  | Green |
| ------------------- | -------- | ------- | ----- |
| Overall             | < 3.0    | 3.0–3.5 | > 3.5 |
| Work/life balance   | < 3.0    | 3.0–3.5 | > 3.5 |
| Senior management   | < 3.0    | 3.0–3.5 | > 3.5 |
| CEO approval        | < 50%    | 50–70%  | > 70% |
| Recommend to friend | < 50%    | 50–70%  | > 70% |

Weight the last 6 months. Read the 5–10 most recent reviews, not the featured ones. Engineering reviews outweigh
company-wide averages.

Red-flag phrases: high turnover, revolving door, burnout, "fast-paced" with no support signals, hired then laid off,
post-merger chaos, frequent leadership changes.

## Company stage

| Stage        | Risk        | Watch for                                         |
| ------------ | ----------- | ------------------------------------------------- |
| Pre-Series A | High        | Can it pay the floor? Equity is speculative       |
| Series A/B   | Medium-high | Growth chaos, expectations                        |
| Series C+    | Medium      | Burn rate, date of last round                     |
| Public       | Lower       | Recent earnings, layoff history                   |

Major flags: down rounds, no funding in 2+ years with no revenue signal, layoffs right after a raise, a recent large
acquisition.

## Evidence standard

Every score cites something specific: a number, a date, a short quote, or a link. "Seems good" is not evidence. If a
source couldn't be checked, say so in the Evidence cell and score conservatively.
