# python bump_version.py

import re
import sys

def ask_question(question):
    return input(f"{question}\n")

def bump_version(file_path, new_version):
    content = read_file(filepath=file_path)["content"]
    version_pattern = r"version: '\d+\.\d+\.\d+'"
    new_content = re.sub(version_pattern, f"version: '{new_version}'", content)
    edit_existing_file(
        filepath=file_path,
        changes=new_content
    )["message"]

def main():
    file_path = ask_question("Enter the path of the SKILL.md file:")
    current_version = read_file(filepath=file_path)["content"].split("version: '")[-1].split("'")[0]
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
        new_version = current_version
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