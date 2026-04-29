# Personalization Guide

This skill is public. Personal values and working artifacts stay outside the repository in your private local directory.

## What Lives Where

| Content                                              | Location                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Skill instructions (SKILL.md, references, templates) | Public repo — committed                                                        |
| Candidate profile (comp floor, constraints, context) | `JOB_SEARCH_WORKSPACE/custom/candidate-profile.md` — never committed    |
| Experience inventory and reference resumes           | `JOB_SEARCH_WORKSPACE/resume/` — never committed                               |
| Company files, tailored resumes, job matrix          | `JOB_SEARCH_WORKSPACE/` — never committed                                      |

## Using the Custom Profile

The agent reads `candidate-profile.md` automatically if it exists. It applies your:

- Comp floor and negotiation constraints
- Schedule constraints and protected time blocks
- Location and remote requirements
- Burnout / energy context
- Security clearance status
- Mission preferences

The agent will never expose custom profile values unless you explicitly ask.

If the custom profile is missing, the agent continues using public templates and calls out what context is unavailable.

## Template → Custom Profile

Copy `{templates_folder}/candidate-profile.template.md` to:

```shell
{customization_folder}/candidate-profile.md
```

Fill it in fully. The more complete it is, the less you need to re-explain your constraints in every session.
