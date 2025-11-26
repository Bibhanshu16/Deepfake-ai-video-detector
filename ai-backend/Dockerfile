FROM python:3.11-slim

# 1. System deps for OpenCV, etc.
RUN apt-get update && apt-get install -y \
    ffmpeg libsm6 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# 2. Workdir
WORKDIR /app

# 3. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy your app code
COPY . .

# 5. Expose port
EXPOSE 8000

# 6. Run the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
