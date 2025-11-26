// components/deepscan/LimitationsSection.jsx

export default function LimitationsSection() {
  return (
    <section
      id="limitations"
      className="mt-8"
    >
      <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs md:text-sm space-y-2 backdrop-blur-sm shadow-inner shadow-amber-900/40">
        <h3 className="font-semibold text-amber-200">
          What this tool can and cannot do
        </h3>
        <ul className="list-disc list-inside space-y-1 text-amber-100/90">
          <li>
            <span className="font-semibold">Can:</span> give an{" "}
            <span className="font-semibold">approximate likelihood</span>{" "}
            that a video is AI-generated, especially when it contains
            clear human faces.
          </li>
          <li>
            <span className="font-semibold">Cannot:</span> guarantee that
            a video is real or fake. It may be wrong for stylized,
            animated, or heavily edited clips.
          </li>
          <li>
            Results around <span className="font-semibold">40-60%</span>{" "}
            fake should be treated as{" "}
            <span className="font-semibold">“uncertain / mixed”</span> rather
            than a strong verdict.
          </li>
        </ul>
      </div>
    </section>
  );
}
