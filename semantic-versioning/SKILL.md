---
name: semantic-versioning
description: "Semantic versioning skill that follows semver.org specifications. Provides tools and guidance for maintaining semantic versioning in software projects, repositories, and skill libraries."
license: MIT
metadata:
  author: ikehle
  version: '1.0'
---

# Semantic Versioning

This skill provides comprehensive semantic versioning capabilities following the [semver.org](https://semver.org/) specification.

## Overview

Semantic versioning (SemVer) is a set of rules and requirements for version numbers that are designed to express the compatibility between software releases. This skill helps maintain proper semantic versioning in repositories and skill libraries.

## SemVer Specification

According to [semver.org](https://semver.org/), version numbers must follow this format:

```
<major>.<minor>.<patch>
```

### Version Components

- **Major**: Breaking changes (incompatible API changes)
- **Minor**: Backward-compatible new features  
- **Patch**: Backward-compatible bug fixes

### When to Increment Version Numbers

1. **Major (X.0.0)**: 
   - Breaking changes that would break existing workflows or require significant updates to user configurations
   - Changes that make the system incompatible with previous versions

2. **Minor (0.X.0)**:
   - New features or enhancements that are backward-compatible
   - Non-breaking additions to the API

3. **Patch (0.0.X)**:
   - Bug fixes or documentation updates
   - Minor improvements that don't affect API compatibility

## Implementation Examples

### Example Version Update Process

```bash
$ cd skills/semantic-versioning/scripts
$ ./version-updater.sh
What type of version change is this commit?
1) Major (breaking changes)
2) Minor (new features, backward compatible)
3) Patch (bug fixes, documentation)
Enter choice (1-3): 2
Current version: 1.0.0
Proposed new version: 1.1.0
Do you want to update the version in SKILL.md? (y/n): y
Version successfully updated from 1.0.0 to 1.1.0
```

### Version Update Script

The skill includes a version-updater.sh script that:
- Prompts users to select the appropriate version type
- Automatically updates SKILL.md according to SemVer principles
- Provides clear feedback and error handling

## Integration with Skills Repository

This skill is designed to be installed alongside other skills in a skills repository like the one you're working with.

When committing changes to a skill repository:
1. Run the semantic version updater script
2. Select the appropriate version type based on your changes
3. The script will automatically update the SKILL.md version field

## Usage in Skill Repositories

### For Individual Skills
Each skill should maintain its own semantic version in its SKILL.md file:
```yaml
metadata:
  author: ikehle
  version: '1.0'
```

### For Repository-Level Versioning
This skill can be used to maintain consistent versioning across multiple skills in a repository.

## Reference Resources

- [Semantic Versioning 2.0.0](https://semver.org/)
- [GitHub Release Notes](https://github.com/isaackehle/skills)

## Related Skills

This skill works alongside other skills in your repository, particularly:
- `job-search/` - End-to-end job search skill
- Any other skills that follow semantic versioning practices

## Hard Rules

- Never skip versioning in skill repositories
- Always follow the semver.org specification
- Increment major version for breaking changes
- Increment minor version for new features (backward compatible)
- Increment patch version for bug fixes or documentation
