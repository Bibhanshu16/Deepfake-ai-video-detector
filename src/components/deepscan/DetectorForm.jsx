"use client";

export default function DetectorForm({
  file,
  isAnalyzing,
  onFileChange,
  onAnalyzeShort
}) {
  return (
    <div className="space-y-4">

      <input
        type="file"
        accept="video/mp4"
        onChange={onFileChange}
        className="block w-full text-sm text-slate-300
                   file:text-slate-200 file:bg-slate-800
                   file:border file:border-slate-600
                   file:px-3 file:py-1.5 file:rounded-md file:mr-4"
      />

      <button
        onClick={onAnalyzeShort}
        disabled={isAnalyzing}
        className="w-full py-2 px-4 rounded-lg text-sm font-medium
                   bg-sky-600 hover:bg-sky-700
                   disabled:bg-slate-600 disabled:cursor-not-allowed
                   transition-colors"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Video"}
      </button>
    </div>
  );
}
