import os

file_path = r"c:\Users\Beinex Consulting\Documents\bMakerExamPortal\frontend\src\app\school\[class_level]\[slug]\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Add Import after PhysicsOverview import
    if 'import PhysicsOverview from "@/components/subjects/PhysicsOverview";' in line:
        new_lines.append(line)
        new_lines.append('import SocialScienceOverview from "@/components/subjects/SocialScienceOverview";\n')
        continue

    # Add Social Science slug check before Biology
    if "slug.toLowerCase() === 'biology' ? (" in line:
        indent = line[:line.find("{") if "{" in line else line.find(")")]
        new_lines.append(f"                       ) : (slug.toLowerCase() === 'social-science' || slug.toLowerCase().includes('social')) ? (\n")
        new_lines.append(f"                         <SocialScienceOverview />\n")
        new_lines.append(line)
        continue

    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File updated successfully")
