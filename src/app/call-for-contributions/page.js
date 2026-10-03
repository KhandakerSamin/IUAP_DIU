import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import HomeEffects from "@/components/homepage/homeEffects";
import SpeakersSection from "../../components/callForPage/speakersSection";
import PosterPresentationSection from "../../components/callForPage/posterPresentationSection";
import BookChaptersSection from "../../components/callForPage/bookChaptersSection";

export const metadata = {
  title: "Call for Contributions | IAUP Semi-Annual Meeting 2026",
  description:
    "Submit your panel speaker, poster presentation, and book chapter contributions for the IAUP Semi-Annual Meeting 2026.",
};

export default function CallForContributionsPage() {
  return (
    <>
      <Nev />
      <main className="">
        <SpeakersSection />
        <PosterPresentationSection />
        <BookChaptersSection />
      </main>
      <Footer />
      <HomeEffects />
    </>
  );
}