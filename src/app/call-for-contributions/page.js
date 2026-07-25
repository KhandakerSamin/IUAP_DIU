import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import HomeEffects from "@/components/homepage/homeEffects";
import SpeakersSection from "../../components/callForPage/speakersSection";
import PosterPresentationSection from "../../components/callForPage/posterPresentationSection";

export const metadata = {
  title: "Call for Contributions | IAUP Semi-Annual Meeting 2026",
  description:
    "Submit your panel speaker and poster presentation contributions for the IAUP Semi-Annual Meeting 2026.",
};

export default function CallForContributionsPage() {
  return (
    <>
      <Nev />
      <main className="pt-24">
        <SpeakersSection />
        <PosterPresentationSection />
      </main>
      <Footer />
      <HomeEffects />
    </>
  );
}