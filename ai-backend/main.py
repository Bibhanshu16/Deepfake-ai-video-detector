from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from transformers import AutoImageProcessor, SiglipForImageClassification
from PIL import Image
import torch
import io
import cv2
import numpy as np
import tempfile
import os

app = FastAPI()

# 1) Load model once at startup (image deepfake detector)
MODEL_NAME = "prithivMLmods/Deepfake-Detect-Siglip2"  # fake / real 
processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
model = SiglipForImageClassification.from_pretrained(MODEL_NAME)
model.eval()

# In this model, class 0 = fake, class 1 = real (as per model card)
FAKE_INDEX = 0
REAL_INDEX = 1


def predict_fake_prob(pil_image: Image.Image) -> float:
  """Return probability (0..1) that the image is fake."""
  inputs = processor(images=pil_image, return_tensors="pt")
  with torch.no_grad():
    outputs = model(**inputs)
    probs = outputs.logits.softmax(dim=-1)[0].tolist()
  fake_prob = float(probs[FAKE_INDEX])
  return fake_prob


@app.post("/analyze-frame")
async def analyze_frame(file: UploadFile = File(...)):
  """Analyze a single image (for testing/debug)."""
  content = await file.read()
  image = Image.open(io.BytesIO(content)).convert("RGB")
  fake_prob = predict_fake_prob(image)
  real_prob = 1.0 - fake_prob
  return {
    "fake_probability": fake_prob,
    "real_probability": real_prob,
    "fake_percentage": fake_prob * 100,
    "real_percentage": real_prob * 100,
  }


@app.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):
  """
  Analyze a video:
  - Save temp file
  - Sample N frames
  - Run model on each
  - Average fake probabilities
  """
  try:
    content = await file.read()
    # Save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
      tmp.write(content)
      tmp_path = tmp.name

    cap = cv2.VideoCapture(tmp_path)
    if not cap.isOpened():
      os.remove(tmp_path)
      return JSONResponse(
        {"message": "Could not open video file"},
        status_code=400,
      )

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    duration = total_frames / fps if fps > 0 else 0.0

    if total_frames == 0:
      cap.release()
      os.remove(tmp_path)
      return JSONResponse(
        {"message": "Video has no frames"},
        status_code=400,
      )

    # Decide how many frames to sample
    num_samples = min(16, total_frames)  # up to 16 frames
    indices = np.linspace(0, total_frames - 1, num_samples, dtype=int)
    index_set = set(indices.tolist())

    frame_scores = []
    frame_idx = 0

    while cap.isOpened():
      ret, frame = cap.read()
      if not ret:
        break

      if frame_idx in index_set:
        # Convert BGR -> RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(frame_rgb)
        fake_prob = predict_fake_prob(image)
        frame_scores.append(fake_prob)

      frame_idx += 1

    cap.release()
    os.remove(tmp_path)

    if not frame_scores:
      return JSONResponse(
        {"message": "No frames were analyzed"},
        status_code=500,
      )

    avg_fake = float(np.mean(frame_scores))
    fake_percentage = avg_fake * 100.0
    real_percentage = 100.0 - fake_percentage

    if fake_percentage >= 60:
      verdict = "More likely AI-generated"
    elif fake_percentage <= 40:
      verdict = "More likely real (non-AI)"
    else:
      verdict = "Uncertain / Mixed"

    return {
      "fake_percentage": fake_percentage,
      "real_percentage": real_percentage,
      "verdict": verdict,
      "num_frames_used": len(frame_scores),
      "duration_seconds": duration,
    }

  except Exception as e:
    return JSONResponse(
      {"message": "Server error in video analysis", "error": str(e)},
      status_code=500,
    )
