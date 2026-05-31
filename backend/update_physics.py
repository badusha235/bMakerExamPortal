import os

file_path = r"c:\Users\Beinex Consulting\Documents\bMakerExamPortal\frontend\src\app\school\[class_level]\[slug]\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Add Import
    if 'import MathOverview from "@/components/subjects/MathOverview";' in line:
        new_lines.append(line)
        new_lines.append('import PhysicsOverview from "@/components/subjects/PhysicsOverview";\n')
        continue

    # Update Render Logic
    if "slug.toLowerCase() === 'biology' ? (" in line:
        indent = line[:line.find("{")]
        new_lines.append(f"{indent}{{slug.toLowerCase() === 'physics' ? (\n")
        new_lines.append(f"{indent}  <PhysicsOverview />\n")
        new_lines.append(f"{indent}) : slug.toLowerCase() === 'biology' ? (\n")
        continue

    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File updated successfully")
