// components/deepscan/HeroSection.jsx

export default function HeroSection() {
  return (
    <div className="w-full text-center flex flex-col items-center space-y-6">
      
      <p
        className="inline-flex items-center gap-2 text-[11px] font-medium 
          text-sky-200 bg-sky-500/15 border border-sky-500/30 
          rounded-full px-4 py-1.5 
          shadow-[0_0_20px_rgba(56,189,248,0.25)]
          backdrop-blur-sm"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Detect AI content. Stay protected.
      </p>

      
      <h2
        className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight 
          text-slate-50 max-w-3xl"
      >
        Check if a video{" "}
        <span className="text-sky-300">looks AI-generated</span>
      </h2>

      
      <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
        This tool analyzes multiple sampled frames from your video using a
        powerful open-source deepfake detection model. It evaluates patterns,
        facial inconsistencies, and visual anomalies to estimate how likely the
        video is AI-generated or real—helping you stay safe, informed, and
        confident in what you watch.
      </p>
    </div>
  );
}
