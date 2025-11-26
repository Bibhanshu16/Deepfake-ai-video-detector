export default function DisclaimerSection() {
  return (
    <section
      id="disclaimer"
      className="mt-2 text-[11px] text-slate-500 border-t border-slate-800 pt-4 space-y-1"
    >
      <p>
        This project is for educational and experimental purposes only. It
        uses open-source deepfake detection models and may produce incorrect
        results. Do not rely on this tool as the sole basis for important
        decisions.
      </p>
      <p>
        All processing happens through a local Python backend. Videos are
        not sent to third-party services.
      </p>
    </section>
  );
}
