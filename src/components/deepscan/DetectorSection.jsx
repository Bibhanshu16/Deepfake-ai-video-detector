"use client";

import { useState, useMemo } from "react";
import DetectorForm from "./DetectorForm";
import StatusMessage from "./StatusMessage";
import ResultPanel from "./ResultPanel";

export default function DetectorSection() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (f.size > maxSize) {
      setError("Please upload a video under 50MB.");
      setFile(null);
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setFile(f);
  };

  const handleAnalyzeShort = async () => {
    if (!file) {
      setError("Please select a video first.");
      return;
    }

    setStatus("Analyzing short video...");
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const res = await fetch("/api/analyze-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to analyze video");
      }

      setResult(data);
      setStatus("Analysis complete");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setStatus("");
    }
  };

  const isAnalyzing = useMemo(() => {
    return (
      typeof status === "string" &&
      status.toLowerCase().includes("analyzing")
    );
  }, [status]);

  return (
    <div id="detector" className="w-full flex justify-center">
      <div
        className="
          w-full max-w-2xl
          border border-slate-700/80
          rounded-2xl
          p-6 md:p-8
        "
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
          <span>Run a detection</span>
          <span className="text-[11px] font-normal text-slate-400">
            Beta • experimental
          </span>
        </h2>

        <p className="text-xs text-slate-300 mb-5">
          Your video is processed locally on your machine. Files are{" "}
          <span className="font-semibold text-slate-100">never uploaded</span>.
        </p>

        <DetectorForm
          file={file}
          isAnalyzing={isAnalyzing}
          onFileChange={handleFileChange}
          onAnalyzeShort={handleAnalyzeShort}
        />

        <StatusMessage status={status} error={error} />

        <ResultPanel result={result} />
      </div>
    </div>
  );
}
