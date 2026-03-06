import json
import os
from pathlib import Path

# File paths
json_path = "assets/descriptions/projects.json"
base_images_dir = "assets/images/projects"

# Read the JSON file
with open(json_path, 'r') as file:
    projects = json.load(file)

# Process each project
for project in projects:
    # Get the images folder path for this project
    images_folder = project.get('images_folder', '')
    
    if images_folder:
        # Construct full path to images directory
        full_images_path = Path(images_folder)
        
        # Check if directory exists
        if full_images_path.exists() and full_images_path.is_dir():
            # Get all image files (common image extensions)
            image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
            images = []
            
            for file in full_images_path.iterdir():
                if file.is_file() and file.suffix.lower() in image_extensions:
                    images.append(file.name)
            
            # Sort images for consistency
            images.sort()
            
            # Add the images list to the project
            project['images'] = images
            
            print(f"Added {len(images)} images for project: {project.get('title', 'Unknown')}")
        else:
            print(f"Warning: Directory not found: {images_folder}")
            project['images'] = []
    else:
        print(f"Warning: No images_folder specified for project: {project.get('title', 'Unknown')}")
        project['images'] = []

# Write the updated JSON back to file
with open(json_path, 'w') as file:
    json.dump(projects, file, indent=4)

print(f"\nDone! Updated {json_path}")