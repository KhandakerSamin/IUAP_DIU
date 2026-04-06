import Nev from "@/components/global/nev";
import Footer from "@/components/global/footer";
import HomeEffects from "@/components/homepage/homeEffects";
import homeSections from "@/components/homepage/sections";

export default function Page() {
  return (
    <>
      <Nev />
      <main className="pt-20">
        {homeSections.map((Section) => (
          <Section key={Section.name} />
        ))}
      </main>
      <Footer />
      <HomeEffects />
    </>
  );
}
