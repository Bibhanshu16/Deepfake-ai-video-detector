// app/page.jsx

import HeaderBar from "@/components/deepscan/HeaderBar";
import HeroSection from "@/components/deepscan/HeroSection";
import DetectorSection from "@/components/deepscan/DetectorSection";
import DisclaimerSection from "@/components/deepscan/DisclaimerSection";
import HowToUseSection from "@/components/deepscan/HowToUseSection";
import LimitationsSection from "@/components/deepscan/LimitationsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-10 md:gap-14">
        <HeaderBar />

        <section className="relative px-4 py-8 md:px-10 md:py-12">
          <HeroSection />
        </section>

        <section>
          {" "}
          <HowToUseSection />{" "}
        </section>

        <section className="px-4 py-6 md:px-8 md:py-8">
          <DetectorSection />
        </section>

        <section>
          <LimitationsSection />
        </section>

        <section className=" pt-6 md:pt-8 text-xs md:text-sm text-slate-400">
          <DisclaimerSection />
        </section>
      </div>
    </main>
  );
}
