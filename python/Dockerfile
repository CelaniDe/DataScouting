FROM python:3.8
WORKDIR /app

# Install the libgl1-mesa-glx package
RUN apt-get update && apt-get install -y libgl1-mesa-glx

COPY requirements.txt requirements.txt
RUN curl -o yolov5_requirements.txt https://raw.githubusercontent.com/ultralytics/yolov5/master/requirements.txt

# Append YOLOv5 requirements to existing requirements.txt
RUN cat yolov5_requirements.txt >> requirements.txt

# Install Python dependencies
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]