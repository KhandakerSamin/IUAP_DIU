import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";

export const metadata = {
  title: "Event Gallery | IAUP Semi-Annual Meeting 2026",
  description: "Official IAUP Semi-Annual Meeting 2026 event page by DIU Media Lab.",
};

const EVENT_URL = "https://medialab.diu.edu.bd/iaup-semi-annual-meeting-2026";

export default function EventPage() {
  return (
    <>
      <Nev />
      <main className="pt-16 sm:pt-20">
        <iframe
          src={EVENT_URL}
          title="IAUP Semi-Annual Meeting 2026 event page"
          className="block w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] border-0"
          loading="lazy"
        />
        <p className="py-3 text-center text-sm text-slate-500">
          Not loading?{" "}
          <a href={EVENT_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Open in a new tab
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
