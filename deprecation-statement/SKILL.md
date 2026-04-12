---
name: deprecation-statement
description: "Add a deprecation statement to a given file."
license: MIT
metadata:
  author: your-username
  version: '1.0'
---

# Deprecation Statement Skill

A simple skill to add a deprecation statement to a specified file.

## Commands

### `deprecate <file_path>`
Add a deprecation statement to the specified file.
```

4. Add the following content to `deprecate.py`:

```python
from claude import say, ask, load_file, save_file

def deprecate(file_path):
    say(f"Adding deprecation statement to {file_path}...")
    content = load_file(file_path)
    deprecation_statement = "**Deprecation Notice:** This skill is deprecated and will be removed in future versions. Please update your references accordingly.\n\n"
    save_file(file_path, deprecation_statement + content)
    say(f"Deprecation statement added successfully to {file_path}.")

def main():
    file_path = ask("Enter the path of the file you want to deprecate:")
    deprecate(file_path)

if __name__ == "__main__":
    main()
```

5. Reload your Claude Code or OpenCode workspace, and you should now have a `deprecation-statement` skill available.

6. To use the skill, run:

```
deprecate <path_to_your_file>