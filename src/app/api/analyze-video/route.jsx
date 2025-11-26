import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const videoFile = formData.get("video");

    if (!videoFile) {
      return NextResponse.json(
        { message: "No video uploaded" },
        { status: 400 }
      );
    }

    // Convert Next.js File → Buffer
    const arrayBuffer = await videoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Prepare form-data for Python backend
    const backendForm = new FormData();
    backendForm.append(
      "file", // must be 'file' to match FastAPI: file: UploadFile = File(...)
      new Blob([buffer]),
      videoFile.name || "video.mp4"
    );

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/analyze-video", {
      method: "POST",
      body: backendForm,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Bubble up backend message so you see it in UI
      return NextResponse.json(
        {
          message:
            data.message ||
            "AI engine error while analyzing video",
          raw: data,
        },
        { status: res.status }
      );
    }

    // Success – just pass Python response straight through
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error proxying to AI backend:", err);
    return NextResponse.json(
      {
        message:
          "Could not reach AI engine. Make sure the Python server on port 8000 is running.",
        error: String(err),
      },
      { status: 500 }
    );
  }
}
