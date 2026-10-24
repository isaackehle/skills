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
