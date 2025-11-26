import Link from "next/link";

export default function HeaderBar() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="h-9 w-9 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        >
          AI
        </Link>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            <Link href="/">DeepScan</Link>
          </h1>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="text-[11px] text-slate-400 hover:text-slate-200 transition"
            >
              Experimental AI Video Detector by
            </Link>

            <Link
              href="https://portfolio-kappa-eight-44.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-300 hover:text-emerald-200 font-medium transition"
            >
              PaGo
            </Link>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300">
        <a href="#how-it-works" className="hover:text-sky-300 transition-colors">
          How it works
        </a>
        <a href="#detector" className="hover:text-sky-300 transition-colors" >
          Detector
        </a>
        <a href="#limitations" className="hover:text-sky-300 transition-colors">
          Limitations
        </a>
        <a href="#disclaimer" className="hover:text-sky-300 transition-colors">
          Disclaimer
        </a>
      </nav>
    </header>
  );
}
