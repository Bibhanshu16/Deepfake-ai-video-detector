import { NextResponse } from "next/server";

export const runtime = "nodejs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req) {
  try {
    const form = await req.formData();
    const videoFile = form.get("video");

    if (!videoFile) {
      return NextResponse.json(
        { message: "No video uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await videoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const seForm = new FormData();
    seForm.append(
      "media",
      new Blob([buffer]),
      videoFile.name || "video.mp4"
    );
    seForm.append("models", "genai");
    seForm.append("api_user", process.env.SIGHTENGINE_API_USER);
    seForm.append("api_secret", process.env.SIGHTENGINE_API_SECRET);

    // 1) Start async check (for long videos)
    const startRes = await fetch(
      "https://api.sightengine.com/1.0/video/check.json",
      {
        method: "POST",
        body: seForm,
      }
    );

    const startText = await startRes.text();
    let startData;
    try {
      startData = JSON.parse(startText);
    } catch {
      startData = null;
    }

    console.log("Video check start response (long):", startData || startText);

    // If HTTP is not OK OR status is failure, handle early
    if (!startRes.ok || (startData && startData.status === "failure")) {
      const apiMessage =
        startData?.error?.message ||
        "AI service HTTP error (start)";

      // Special handling for daily usage limit
      if (startData?.error?.type === "usage_limit") {
        return NextResponse.json(
          {
            message:
              "Daily usage limit reached on Sightengine Free plan. Please wait for reset or upgrade your plan.",
            raw: startData,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { message: apiMessage, raw: startData || startText },
        { status: 500 }
      );
    }

    if (!startData || startData.status !== "success" || !startData.media?.id) {
      return NextResponse.json(
        {
          message: "Failed to start video analysis",
          raw: startData || startText,
        },
        { status: 500 }
      );
    }

    const mediaId = startData.media.id;

    // 2) Poll for result (unchanged)
    let resultData = null;
    const maxAttempts = 10; // e.g. 10 * 5s = 50s max
    const delayMs = 5000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Polling result attempt ${attempt} for media ${mediaId}`);

      const url = new URL(
        "https://api.sightengine.com/1.0/video/result.json"
      );
      url.searchParams.set("media", mediaId);
      url.searchParams.set("api_user", process.env.SIGHTENGINE_API_USER);
      url.searchParams.set("api_secret", process.env.SIGHTENGINE_API_SECRET);

      const resultRes = await fetch(url.toString());

      if (!resultRes.ok) {
        const txt = await resultRes.text();
        console.error("Sightengine result HTTP error (long):", txt);
        if (attempt === maxAttempts) {
          return NextResponse.json(
            { message: "AI service HTTP error (result)", details: txt },
            { status: 500 }
          );
        }
      } else {
        const data = await resultRes.json();
        console.log("Video result response (long):", data);

        if (data.status === "success" && data.data?.frames) {
          resultData = data;
          break;
        }
      }

      await sleep(delayMs);
    }

    if (!resultData) {
      return NextResponse.json(
        {
          message:
            "Timed out waiting for video analysis. Try a shorter video or again later.",
        },
        { status: 500 }
      );
    }

    const frames = resultData.data.frames;
    const scores = frames
      .map((f) => f?.type?.ai_generated)
      .filter((v) => typeof v === "number");

    if (!scores.length) {
      return NextResponse.json(
        {
          message: "Could not read AI scores from result",
          raw: resultData,
        },
        { status: 500 }
      );
    }

    const sum = scores.reduce((acc, v) => acc + v, 0);
    const avgAi = sum / scores.length;
    const aiPercentage = avgAi * 100;
    const realPercentage = 100 - aiPercentage;

    let verdict;
    if (aiPercentage >= 70) {
      verdict = "Likely AI-generated";
    } else if (aiPercentage <= 30) {
      verdict = "Likely real (non-AI)";
    } else {
      verdict = "Uncertain / Mixed";
    }

    return NextResponse.json({
      aiPercentage,
      realPercentage,
      verdict,
      // raw: resultData, // uncomment for debugging
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
