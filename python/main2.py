import torch
from pathlib import Path
from PIL import Image

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5s.pt')
model.eval()

# Load an image
img_path = '/home/celani/Desktop/DataScouting/celani.jpeg'
img = Image.open(img_path)

# Perform inference
results = model(img)

# Display results
results.show()

# Save results
results.save(Path('output'))

# If you want to get bounding box information, you can access results.xyxy
bounding_boxes = results.xyxy[0].cpu().numpy()

# Process bounding_boxes as needed
