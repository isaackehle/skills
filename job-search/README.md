# Job Search

Grouped job-search skill for structured opportunity evaluation, resume tailoring, interview preparation, live interview note-taking, and post-interview debrief.

## What this skill covers

- Opportunity evaluation
- Resume tailoring
- Recruiter and interview prep
- Live interview note-taking
- Post-interview debrief
- Private personalization via a local candidate profile

## Folder structure

- `SKILL.md` — main grouped skill definition
- `templates/` — blank templates to copy and fill in
- `examples/` — fake filled-in examples
- `docs/` — setup and personalization guidance
- `references/` — workflow-specific guidance
- `scripts/` — helper install scripts

## How to use it

Use this skill when you want one job-search workflow that can handle:
- first-pass opportunity evaluation
- deciding whether to pursue a role
- tailoring a base resume to a target role
- preparing for recruiter screens and interviews
- taking structured notes during an interview
- debriefing after the interview

## Personalization

Keep your real candidate profile outside the repo.

Suggested local private files:
- `~/job-search-private/candidate-profile.private.md`
- `~/.claude/skills/job-search-personal/SKILL.md`
- `~/.config/opencode/skills/job-search-personal/SKILL.md`

See `docs/personalization.md` for the recommended public/private split.

## Install concept

Copy this folder into your local skills directory so that `SKILL.md` is at the root of the installed skill folder.

Examples:

```text
~/.claude/skills/job-search/
~/.config/opencode/skills/job-search/
~/.agents/skills/job-search/
```

## Notes

This grouped skill is designed for tools such as Claude Code and OpenCode, where a skill is typically a folder containing `SKILL.md` plus supporting files.
