import os

file_path = r"c:\Users\Beinex Consulting\Documents\bMakerExamPortal\frontend\src\app\school\[class_level]\[slug]\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_index = -1
end_index = -1

# Find the start and end of the corrupted logic
for i, line in enumerate(lines):
    if "{slug.toLowerCase() === 'mathematics' ? (" in line:
        start_index = i
    if ") : (slug.toLowerCase() === 'it' || slug.toLowerCase().includes('information')) ? (" in line:
        end_index = i
        break

if start_index != -1 and end_index != -1:
    new_logic = [
        "                       {slug.toLowerCase() === 'mathematics' ? (\n",
        "                         <MathOverview />\n",
        "                       ) : slug.toLowerCase() === 'physics' ? (\n",
        "                         <PhysicsOverview />\n",
        "                       ) : slug.toLowerCase() === 'biology' ? (\n",
        "                         <BiologyOverview />\n",
        "                       ) : slug.toLowerCase() === 'chemistry' ? (\n",
        "                         <ChemistryOverview />\n",
        "                       ) : slug.toLowerCase() === 'english' ? (\n",
        "                         <EnglishOverview />\n",
        "                       ) : slug.toLowerCase() === 'malayalam' ? (\n",
        "                         <MalayalamOverview />\n"
    ]
    
    # Keep the end part (IT) as is
    final_lines = lines[:start_index] + new_logic + lines[end_index:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    print("Successfully fixed the ternary logic.")
else:
    print(f"Could not find indices: start={start_index}, end={end_index}")
