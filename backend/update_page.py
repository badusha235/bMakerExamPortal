import os

file_path = r"c:\Users\Beinex Consulting\Documents\bMakerExamPortal\frontend\src\app\school\[class_level]\[slug]\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Update Biology
    if "{slug === 'biology' ? (" in line:
        line = line.replace("{slug === 'biology' ? (", "{slug.toLowerCase() === 'biology' ? (")
    # Update Chemistry
    if ") : slug === 'chemistry' ? (" in line:
        line = line.replace(") : slug === 'chemistry' ? (", ") : slug.toLowerCase() === 'chemistry' ? (")
    # Malayalam Insertion
    if "<EnglishOverview />" in line:
        new_lines.append(line)
        indent = line[:line.find("<")]
        new_lines.append(f"{indent}) : slug.toLowerCase() === 'malayalam' ? (\n")
        new_lines.append(f"{indent}  <MalayalamOverview />\n")
        continue

    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File updated successfully")
