📹 DeepScan — AI-Generated Video Detector

A 7th-Semester AI Project using Next.js + FastAPI + HuggingFace
Runs locally with no third-party API, detects whether a video is AI-generated or real.

✨ Features
✅ AI Deepfake Detection

Uses HuggingFace model prithivMLmods/Deepfake-Detect-Siglip2

Samples frames from uploaded video

Detects how likely the video is AI-generated vs real

✅ No External API

All processing is local:

Video is processed on your machine

Frames are analyzed using a local Python AI model

No data is uploaded to cloud services

✅ Modern UI with Next.js

Clean, dark, modern UI

Upload area + results card

Explains how the system works

Works well for demos, viva, and research presentations

⚙️ Tech Stack
Component	Technology
Frontend	Next.js 16, Tailwind CSS
Backend	FastAPI
AI Model	HuggingFace Transformers
Video Processing	OpenCV
Inference	PyTorch
Communication	REST (Next.js → FastAPI)
🖼️ Demo (Local Only)

Because of model size + RAM requirements, the backend runs locally:

FastAPI (Python)

HuggingFace deepfake model (~300–400MB)

Torch + OpenCV

🚫 Cannot be deployed on free servers like Render (only 512MB RAM)
✔ Works perfectly on any laptop with ≥8GB RAM

🚀 Getting Started (Local Development)
1️⃣ Clone project
git clone https://github.com/yourusername/deep-scan
cd deep-scan

2️⃣ Start the AI Backend (Python + FastAPI)
Install dependencies

Inside /ai-backend folder:

cd ai-backend
pip install -r requirements.txt

Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000


Backend runs at:

http://localhost:8000
http://localhost:8000/docs

3️⃣ Start the Frontend (Next.js)

Inside the main project folder:

npm install
npm run dev


Frontend runs at:

http://localhost:3000

🔌 How It Works (Pipeline)

User uploads a video in the frontend.

Next.js sends the video to FastAPI backend.

FastAPI:

Saves video temporarily

Extracts sample frames

Runs each frame through the deepfake model

Calculates fake vs real probability

The averaged result is returned to the UI.

🌍 Deployment
✔️ Frontend (Next.js)

Can be deployed easily to Vercel.

❌ Backend (FastAPI + AI model)

Cannot run on free services like Render due to:

512MB RAM limit

Model + PyTorch + OpenCV require 1–2GB RAM

Recommended deployment approach:
Layer	Recommended
Frontend	Deploy to Vercel (public website)
Backend	Run locally on your laptop (for demo/viva)

📝 The live website can include a note:

“AI inference backend runs locally due to heavy model requirements.
For full demo, run the backend using the instructions in the README.”

📊 Model Info

Model used:
prithivMLmods/Deepfake-Detect-Siglip2

Output:

Fake likelihood (%)

Real likelihood (%)

Frame count analyzed

Video duration

Verdict (Fake / Real / Uncertain)

🤔 Limitations

Performance depends on your system’s CPU/GPU

Works best on real human faces

Fully animated / stylized videos may confuse the model

Not a replacement for forensic-level verification

Long videos should be trimmed for faster analysis

🧪 Future Improvements

Improve accuracy with larger or custom-trained models

Use face-detection before classification

Support long video chunking

Add GPU acceleration

Add timeline heatmap showing fake probability per frame

🧑‍💻 Author

Bibhanshu
7th Semester — AI Deep Learning Project
Next.js + FastAPI + HuggingFace Implementation

🛡️ Disclaimer

This project is for educational and research purposes only.
Predictions may be inaccurate — do not use this tool as sole evidence for serious decisions.
