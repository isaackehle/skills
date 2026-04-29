# Workspace Setup

## Two Roots

| Variable                 | Purpose                                       | Recommended Path           |
| ------------------------ | --------------------------------------------- | -------------------------- |
| `{JOB_SEARCH_WORKSPACE}` | Working documents and generated artifacts     | `<your-vault>/job_search/` |
| `{customization_folder}` | Custom configuration and personal constraints | `<your-vault>/custom/`     |

Replace `<your-vault>` with the path to your notes vault (e.g. a job search workspace). If your vault syncs via cloud sync, both roots travel automatically.

## What Never Goes in the Public Repo

- `candidate-profile.md`
- `experience-inventory.md`
- `comparison-matrix.md`
- Reference resumes
- Tailored resumes
- Company files
- Any file with real comp, location, clearance, or personal constraints

## Syncing Across Machines

If your vault syncs, skills travel automatically. To symlink skills for Claude Code or OpenCode:

```shell
ln -sfn <your-vault>/skills ~/.claude/skills
ln -sfn <your-vault>/skills ~/.config/opencode/skills
```

## First-Time Setup

1. Create `job_search/comparison-matrix.md` — copy from `examples/comparison-matrix.example.md`
2. Copy `candidate-profile.template.md` to `{customization_folder}/candidate-profile.md` and fill it in
3. Add your `experience-inventory.md` to `{resume_folder}/`
4. Start adding companies with `add to matrix`
