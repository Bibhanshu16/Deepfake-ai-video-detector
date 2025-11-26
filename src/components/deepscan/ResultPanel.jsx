// components/deepscan/ResultPanel.jsx

export default function ResultPanel({ result }) {
  if (!result) return null;

  const fake =
    typeof result.fake_percentage === "number" ? result.fake_percentage : null;
  const real =
    typeof result.real_percentage === "number" ? result.real_percentage : null;

  let verdictTone = "bg-slate-800/80 border-slate-600 text-slate-100";
  let verdictLabelTone =
    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]";

  if (fake != null && real != null) {
    if (fake > real) {
      verdictTone =
        "bg-rose-500/10 border-rose-500/60 text-rose-100 ";
    } else if (real > fake) {
      verdictTone =
        "bg-emerald-500/10 border-emerald-500/60 text-emerald-100 ";
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4 md:px-5 md:py-5 space-y-3 text-xs md:text-[13px] text-slate-200">
      
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-50 text-sm md:text-base">
            Detection result
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Model output based on sampled frames from your video.
          </p>
        </div>

        {result.verdict && (
          <span
            className={`${verdictTone} ${verdictLabelTone}`}
            title="High-level interpretation of the model scores"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {result.verdict}
          </span>
        )}
      </div>

      
      {(fake != null || real != null) && (
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          {fake != null && (
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-medium text-slate-200">
                  AI-generated (fake)
                </span>
                <span className="text-slate-300">
                  {fake.toFixed(2)}
                  %
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500/80"
                  style={{ width: `${Math.min(Math.max(fake, 0), 100)}%` }}
                />
              </div>
            </div>
          )}

          {real != null && (
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-medium text-slate-200">Real</span>
                <span className="text-slate-300">
                  {real.toFixed(2)}
                  %
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500/80"
                  style={{ width: `${Math.min(Math.max(real, 0), 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      
      <div className="grid gap-2 md:grid-cols-2 mt-3">
        {typeof result.num_frames_used === "number" && (
          <p className="text-slate-300">
            <span className="font-semibold">Frames analyzed:</span>{" "}
            {result.num_frames_used}
          </p>
        )}

        {typeof result.duration_seconds === "number" && (
          <p className="text-slate-300">
            <span className="font-semibold">
              Video duration (approx):
            </span>{" "}
            {result.duration_seconds.toFixed(1)}s
          </p>
        )}
      </div>

      {result.message && (
        <p className="text-slate-300 text-[11px] md:text-xs mt-1">
          <span className="font-semibold">Note:</span> {result.message}
        </p>
      )}

      {result.raw && (
        <details className="mt-2">
          <summary className="cursor-pointer text-[11px] text-slate-400 hover:text-slate-200">
            Show raw response (debug)
          </summary>
          <pre className="mt-2 max-h-60 overflow-auto text-[10px] bg-slate-950/90 border border-slate-700 rounded-lg p-2">
            {JSON.stringify(result.raw, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
