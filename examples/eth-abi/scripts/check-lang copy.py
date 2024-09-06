import os
import re

def contains_chinese(text):
    """Check if the text contains Chinese characters"""
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]')
    return chinese_pattern.search(text) is not None

def check_files_for_chinese(directory):
    """Check files in the specified directory and its subdirectories for Chinese characters"""
    files_with_chinese = []
    for root, dirs, files in os.walk(directory):
        # Exclude any level of node_modules and .git directories
        dirs[:] = [d for d in dirs if d not in {'node_modules', '.git'}]

        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    for line_number, line in enumerate(f, start=1):
                        if contains_chinese(line):
                            files_with_chinese.append((file_path, line_number, line.strip()))
            except (UnicodeDecodeError, FileNotFoundError):
                # Skip files that cannot be read
                continue
    return files_with_chinese

if __name__ == "__main__":
    # Directory to check
    directory_to_check = '.'

    files_with_chinese = check_files_for_chinese(directory_to_check)
    if files_with_chinese:
        print("Files containing Chinese characters:")
        for file_path, line_number, line in files_with_chinese:
            print(f"{file_path} (Line {line_number}): {line}")
        exit(1)  # Exit with error code if Chinese characters are found
    else:
        print("🦋 No Chinese characters found in files.")
