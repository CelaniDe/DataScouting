from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse, FileResponse, StreamingResponse
from fastapi import HTTPException
import torch
from PIL import Image
from io import BytesIO
from pathlib import Path
import tempfile

app = FastAPI()

# Replace this path with the path to your YOLOv5 model file
# MODEL_PATH = "/home/celani/Desktop/DataScouting/yolov5s.pt"
# if not Path(MODEL_PATH).exists():
#     raise HTTPException(status_code=500, detail="YOLOv5 model not found")

# Load the YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
model.eval()


def detect_objects(image: Image.Image):
    # Convert PIL Image to RGB format
    image = image.convert("RGB")

    # Perform object detection
    results = model([image])

    # Extract relevant information from the results
    detected_objects = []
    for det in results.xyxy[0]:
        label = model.names[int(det[-1])]
        confidence = float(det[-2])
        bbox = [float(coord) for coord in det[:-2]]
        detected_objects.append({"label": label, "confidence": confidence, "bbox": bbox})

    return detected_objects


@app.post("/detect_objects/")
async def detect_objects_endpoint(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        contents = await file.read()
        image = Image.open(BytesIO(contents))

        # Perform object detection
        detected_objects = detect_objects(image)

        return JSONResponse(content={"detected_objects": detected_objects}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/detect_objects_image/")
async def detect_objects_endpoint_image(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        contents = await file.read()
        image = Image.open(BytesIO(contents))

        image = image.convert("RGB")

        # Perform object detection
        result = model([image])

        annotated_img = result.render()[0]

        img = Image.fromarray(annotated_img)

        # Save the annotated image to a temporary file
        temp_file_path = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
        img.save(temp_file_path)

        # Return the temporary file as a FileResponse
        return FileResponse(temp_file_path, media_type="image/png")

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)