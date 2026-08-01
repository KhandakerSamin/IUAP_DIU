import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import AccommodationSection from "@/components/homepage/accommodationSection";
import HomeEffects from "@/components/homepage/homeEffects";
import VisaGuidelineSection from "@/components/homepage/visaGuidelineSection";

export const metadata = {
  title: "Pre-Departure Guidelines | IAUP Semi-Annual Conference 2026",
  description: "Travel, accommodation, and visa guidance for IAUP Semi-Annual Conference 2026 attendees.",
};

export default function PreDepartureGuidelinesPage() {
  return (
    <>
      <Nev />
      <main className="pt-20">
        <section className="bg-light border-b border-slate-100 py-16 sm:py-20 lg:py-20">
          <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
                Pre-Departure Guidelines
              </span>
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight reveal reveal-delay-1">
                Travel, visa, and accommodation guidance for delegates
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted reveal reveal-delay-2">
                Review the official information below before traveling to Dhaka. The guidance keeps the same conference branding while bringing the accommodation and visa resources into one place.
              </p>
            </div>
          </div>
        </section>

        <VisaGuidelineSection />
        <AccommodationSection />
      </main>
      <HomeEffects />
      <Footer />
    </>
  );
}
