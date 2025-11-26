"use client";

import { useState } from "react";

export default function HowToUseSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div id="how-it-works" className=" w-full flex justify-center px-4">
        <div
          className="
            w-full max-w-4xl
            bg-slate-900/80
            border border-slate-700/70
            rounded-3xl
            px-6 py-8 md:px-10 md:py-12
            shadow-[0_0_50px_rgba(15,23,42,0.9)]
            backdrop-blur-xl
            text-center
            space-y-8
            relative
            overflow-hidden
          "
        >
          
          <div className="pointer-events-none absolute -top-24 -right-10 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          
          <button
            onClick={() => setIsVideoOpen(true)}
            className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full
                       border border-sky-400/60 bg-slate-900/80
                       px-3 py-1.5 text-[11px] font-medium
                       text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.35)]
                       hover:bg-sky-500/15 hover:border-sky-300
                       transition-colors z-10"
          >
            <span
              className="flex h-4 w-4 items-center justify-center rounded-full 
                         bg-sky-400/80 text-slate-950 text-[10px] font-bold"
            >
              ▶
            </span>
            Watch demo
          </button>

          <h2 className="relative text-2xl md:text-3xl font-semibold tracking-tight text-sky-300">
            How to Use
          </h2>

          <p className="relative text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Follow these simple steps to analyze a video and check if it looks
            AI-generated. The detection runs locally on your machine — your
            files never leave your device.
          </p>

          
          <div className="relative grid gap-6 md:gap-8 md:grid-cols-3 text-left mt-4">
            
            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-slate-900/60 border border-slate-700/70 px-4 py-5 hover:border-sky-400/70 hover:bg-slate-900/90 transition-colors">
              <div className="h-10 w-10 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 font-semibold text-sm">
                1
              </div>
              <h3 className="text-slate-50 font-medium text-center text-sm md:text-base">
                Upload a Video
              </h3>
              <p className="text-slate-400 text-xs md:text-sm text-center leading-relaxed">
                Select any MP4. The tool extracts key frames from
                your clip for analysis.
              </p>
            </div>

            
            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-slate-900/60 border border-slate-700/70 px-4 py-5 hover:border-sky-400/70 hover:bg-slate-900/90 transition-colors">
              <div className="h-10 w-10 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 font-semibold text-sm">
                2
              </div>
              <h3 className="text-slate-50 font-medium text-center text-sm md:text-base">
                Run Detection
              </h3>
              <p className="text-slate-400 text-xs md:text-sm text-center leading-relaxed">
                Use the Analyze Video to run the deepfake model locally on
                the sampled frames.
              </p>
            </div>

            
            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-slate-900/60 border border-slate-700/70 px-4 py-5 hover:border-sky-400/70 hover:bg-slate-900/90 transition-colors">
              <div className="h-10 w-10 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 font-semibold text-sm">
                3
              </div>
              <h3 className="text-slate-50 font-medium text-center text-sm md:text-base">
                View the Result
              </h3>
              <p className="text-slate-400 text-xs md:text-sm text-center leading-relaxed">
                See an estimated likelihood of the video being AI-generated vs
                real, along with the model&apos;s confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl mx-4 bg-slate-950/90 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 rounded-full bg-slate-900/80 border border-slate-600 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-800 transition-colors z-10"
            >
              ✕
            </button>

            <div className="aspect-video w-full bg-black">
              <video
                src="/video/demo.mp4"
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
