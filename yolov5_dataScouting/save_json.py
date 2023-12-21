import json
from pathlib import Path
import yaml
import argparse

# Load class names from the coco.yaml file
coco_yaml_path = './data/coco.yaml'
with open(coco_yaml_path, 'r') as yaml_file:
    coco_data = yaml.safe_load(yaml_file)
    class_names = coco_data['names']

def convert_to_json(result_txt_path, json_output_filename):
    # Load the YOLOv5 detection results from the TXT file
    results = Path(result_txt_path).read_text().strip().split('\n')

    # Convert the results to a list of dictionaries
    detections = []
    for result in results:
        info = result.split()
        label = info[0]
        confidence = float(info[1])
        bbox = list(map(float, info[2:]))
        class_name = class_names[int(label)] if label.isdigit() and 0 <= int(label) < len(class_names) else f"Unknown-{label}"
        detection = {"label": class_name, "confidence": confidence, "bbox": bbox}
        detections.append(detection)

    # Save the results to a JSON file in the current folder
    json_output_path = Path(json_output_filename)
    with open(json_output_path, 'w') as json_file:
        json.dump(detections, json_file, indent=4)

    print(f"Results saved to {json_output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert YOLOv5 results to JSON")
    parser.add_argument("result_txt_path", type=str, help="Path to YOLOv5 result TXT file")
    parser.add_argument("json_output_filename", type=str, help="Output JSON filename")

    args = parser.parse_args()

    convert_to_json(args.result_txt_path, args.json_output_filename)
