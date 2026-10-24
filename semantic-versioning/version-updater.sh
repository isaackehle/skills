#!/bin/bash
# Semantic version updater for skill repositories

# Function to display version options and get user input
get_version_type() {
    echo "What type of version change is this commit?"
    echo "1) Major (breaking changes)"
    echo "2) Minor (new features, backward compatible)"
    echo "3) Patch (bug fixes, documentation)"
    
    read -p "Enter choice (1-3): " choice
    
    case $choice in
        1) echo "major" ;;
        2) echo "minor" ;;
        3) echo "patch" ;;
        *) echo "patch" ;; # Default to patch if invalid input
    esac
}

# Function to update version in SKILL.md file
update_version_in_skill() {
    local skill_file="$1"
    local new_version="$2"
    
    # Use sed to update the version line in SKILL.md
    if [[ -f "$skill_file" ]]; then
        # Backup the original file
        cp "$skill_file" "${skill_file}.backup"
        
        # Update version line (assuming it's in the format: version: 'X.X.X')
        sed -i.bak "s/version: '.*'/version: '$new_version'/" "$skill_file"
        
        # Clean up backup files if sed worked properly
        rm -f "${skill_file}.bak"
        
        echo "Version updated to $new_version in $skill_file"
    else
        echo "SKILL.md file not found at $skill_file"
        return 1
    fi
}

# Function to calculate new version based on semantic versioning
calculate_new_version() {
    local current_version="$1"
    local version_type="$2"
    
    # Parse current version into major.minor.patch
    IFS='.' read -r MAJOR MINOR PATCH <<< "$current_version"
    
    # Update version based on type
    case $version_type in
        "major")
            MAJOR=$((MAJOR + 1))
            MINOR=0
            PATCH=0
            ;;
        "minor")
            MINOR=$((MINOR + 1))
            PATCH=0
            ;;
        "patch")
            PATCH=$((PATCH + 1))
            ;;
    esac
    
    echo "$MAJOR.$MINOR.$PATCH"
}

# Main script logic
echo "Semantic Version Updater for Skill Repositories"
echo "=============================================="

# Check if SKILL.md exists in the current directory
SKILL_FILE="SKILL.md"
if [[ ! -f "$SKILL_FILE" ]]; then
    echo "SKILL.md file not found in current directory"
    exit 1
fi

# Extract current version from SKILL.md file
CURRENT_VERSION=$(grep -E "version:" "$SKILL_FILE" | sed 's/.*version:[[:space:]]*'\''\([^'\'']*\)'\''/\1/')
if [[ -z "$CURRENT_VERSION" ]]; then
    echo "Could not extract current version from SKILL.md"
    exit 1
fi

echo "Current version: $CURRENT_VERSION"

# Get the version type from user
VERSION_TYPE=$(get_version_type)

# Calculate new version
NEW_VERSION=$(calculate_new_version "$CURRENT_VERSION" "$VERSION_TYPE")

echo "Proposed new version: $NEW_VERSION"

# Confirm update
read -p "Do you want to update the version in SKILL.md? (y/n): " confirm
if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
    update_version_in_skill "$SKILL_FILE" "$NEW_VERSION"
    echo "Version successfully updated from $CURRENT_VERSION to $NEW_VERSION"
else
    echo "Version update cancelled"
fi
