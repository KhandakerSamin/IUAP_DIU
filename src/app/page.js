import Nev from "@/components/global/nev";
import Footer from "@/components/global/footer";
import HomeEffects from "@/components/homepage/homeEffects";
import homeSections from "@/components/homepage/sections";

export default function Page() {
  return (
    <>
      <Nev />
      <main>
        {homeSections.map(({ id, Component }, index) => (
          <Component key={id || `section-${index}`} />
        ))}
      </main>
      <Footer />
      <HomeEffects />
    </>
  );
}