# python bump_version.py

import re
import sys


def read_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return {"content": f.read()}


def edit_existing_file(filepath, changes):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(changes)
    return {"message": "File updated"}

def ask_question(question):
    return input(f"{question}\n").strip()

def bump_version(file_path, new_version):
    content = read_file(filepath=file_path)["content"]
    version_pattern = r"version:\s*'\d+\.\d+(?:\.\d+)?'"
    new_content = re.sub(version_pattern, f"version: '{new_version}'", content)
    edit_existing_file(
        filepath=file_path,
        changes=new_content
    )["message"]

def main():
    file_path = ask_question("Enter the path of the SKILL.md file:")
    content = read_file(filepath=file_path)["content"]
    version_match = re.search(r"version:\s*'(\d+\.\d+(?:\.\d+)?)'", content)
    if not version_match:
        print("Could not find a version like 'x.y' or 'x.y.z' in the target file. Exiting.")
        sys.exit(1)

    parsed_version = version_match.group(1)
    parts = parsed_version.split('.')
    if len(parts) == 2:
        parts.append('0')
    current_version = '.'.join(parts)
    print(f"Current version: {current_version}")

    version_type = ask_question(
        "What type of version change is this commit?\n"
        "1) Major (breaking changes)\n"
        "2) Minor (new features, backward compatible)\n"
        "3) Patch (bug fixes, documentation)\n"
        "Enter choice (1-3): "
    )

    if version_type == "1":
        new_version = f"{int(current_version.split('.')[0]) + 1}.0.0"
    elif version_type == "2":
        new_version = f"{current_version.split('.')[0]}.{int(current_version.split('.')[1]) + 1}.0"
    elif version_type == "3":
        new_version = f"{current_version.split('.')[0]}.{current_version.split('.')[1]}.{int(current_version.split('.')[2]) + 1}"
    else:
        print("Invalid choice. Exiting.")
        sys.exit(1)

    print(f"Proposed new version: {new_version}")
    confirmation = ask_question(f"Do you want to update the version in {file_path}? (y/n): ")
    if confirmation.lower() == "y":
        bump_version(file_path, new_version)
        print("Version successfully updated.")
    else:
        print("Version not updated.")

if __name__ == "__main__":
    main()