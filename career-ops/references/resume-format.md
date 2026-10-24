# Resume Format

A resume is one JSON file. The JSON is the source of truth: tailor-resume writes it, verify-resume checks it, and
build-resume renders it. The review markdown and the docx are generated from it and are never edited by hand.

## Schema

```json
{
  "name": "Jordan Rivera",
  "headline": "Principal Software Engineer | Platform | Distributed Systems",
  "contact": ["Springfield, ST", "555-0100", "jordan@example.com", "linkedin.com/in/example"],
  "summary": { "text": "Platform engineer who ...", "src": ["northwind-1", "contoso-2"] },
  "highlights": {
    "heading": "Technical Direction and Staff Development",
    "items": [
      { "label": "Technical direction", "text": "Set the roadmap for ...", "src": ["northwind-1"] }
    ]
  },
  "skills": [
    { "label": "Languages", "items": ["TypeScript", "Python", "Go"] }
  ],
  "experience": [
    {
      "company": "Northwind Traders",
      "agency": "Staffing Co",
      "location": "Remote",
      "dates": "Jan 2024 – Present",
      "title": "Staff Software Engineer",
      "bullets": [
        { "text": "Cut p95 latency on the order API from 1.2s to 300ms by ...", "src": ["northwind-2"] }
      ]
    }
  ],
  "compact": {
    "heading": "Earlier Experience (2001 – 2010)",
    "entries": [
      {
        "company": "Fabrikam",
        "location": "Springfield, ST",
        "dates": "2005 – 2010",
        "title": "Firmware Engineer",
        "text": "Bootloader and drivers for ...",
        "src": ["fabrikam-1"]
      }
    ]
  },
  "education": ["BS, Computer Engineering | State University"],
  "extras": [{ "label": "Patent", "text": "U.S. Patent No. 0,000,000 | Example Title" }],
  "notes": ["User asked to lead with platform work (this session)."],
  "questions": ["The JD asks for Kafka. Did the Contoso event bus use Kafka or something else?"]
}
```

Rules:

- `src` is required on `summary`, every `highlights.items[]`, every `experience[].bullets[]`, and every
  `compact.entries[]`. Values are inventory entry IDs.
- `agency` is optional. When present, the header reads `Company (Agency)`.
- `**bold**` is allowed inside text fields.
- `notes` and `questions` are for the user and the verifier. They are never rendered.
- No other top-level keys. Compensation, target level, availability, and similar fields have no place in the schema,
  so they can't reach the document.

## Styles

`node scripts/build-resume.js resume.json [--style standard|ats] [--md-only]`

| Element         | standard                              | ats                                   |
| --------------- | ------------------------------------- | ------------------------------------- |
| Font            | Calibri                               | Calibri                               |
| Headings        | Bold, accent color, bottom border     | Bold, black, no border                |
| Separators      | ` \| `                                | ` \| `                                |
| Bullets         | List bullets                          | List bullets                          |
| Dashes in dates | En dash                               | Hyphen                                |
| Non-ASCII       | Allowed                               | Replaced (en/em dash → hyphen, ≥ → ">=") |
| Page            | US Letter, 0.5" margins               | Same                                  |

Use **ats** for applicant tracking systems (Workday, Greenhouse, Lever, iCIMS, Taleo, LinkedIn Easy Apply). Use
**standard** for recruiter and direct email submissions.

The accent color, font, and margins are constants at the top of `scripts/build-resume.js`. Change them there. Personal
style choices belong in the private rules file, which the script doesn't read.

## Layout rules

- Section order: Summary, Highlights, Skills, Experience, Compact (earlier roles), Education, Extras.
- Company and title lines keep with the next paragraph, so a role never starts at the bottom of a page.
- No tables, text boxes, columns, icons, or images. ATS parsers drop or scramble them.
- Earlier roles stay as full Company / Dates / Title entries in compact form, so parsers still extract titles.

## File naming

`<CandidateName>-<role-id>-v<n>.json`, with `.md`, `.docx`, `.pdf`, and `.verify.md` beside it. `<role-id>` is the
posting's job ID, or a short role slug if there isn't one. Versions only go up.
