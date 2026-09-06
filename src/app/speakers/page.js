import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import SpeakerCard from "../../components/speakerPage/speaker-card";

export const metadata = {
  title: "Speakers | IAUP Semi-Annual Meeting 2026",
  description: "Meet the keynote speakers, IAUP leadership, and expert panelists at the IAUP Semi-Annual Meeting 2026.",
};

// Edit this list to add, remove, or update speakers. Each category renders
// as its own section, in the order listed below.
const speakerCategories = [
  {
    id: "keynote",
    title: "Keynote Speaker",
    showDownload: false,
    speakers: [
      {
        name: "Alexander A. Mejia",
        designation: "Director",
        organization:
          "Division for People and Social Development at United Nations Institute for Training and Research (UNITAR)",
        country: "",
        sessionTitle: "Keynote Address",
        bio: "Director of the Division for People and Social Development at the United Nations Institute for Training and Research (UNITAR).",
        photoUrl: "/Alexander.jpeg",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
  {
    id: "iaup-leadership",
    title: "IAUP Leadership",
    showDownload: true,
    speakers: [
      {
        name: "Devorah Lieberman, PhD",
        designation: "President Emerita",
        organization: "University of La Verne",
        country: "USA",
        sessionTitle: "IAUP Leadership & Thematic Sessions",
        bio: "Dr. Devorah Lieberman is the President Emerita of the University of La Verne and an active leader in the International Association of University Presidents (IAUP).",
        photoUrl: "/Devorah-Lieberman.jpg",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
  {
    id: "ministers-government",
    title: "Ministers and Government Leaders",
    showDownload: true,
    speakers: [
      {
        name: "Speaker Name TBA",
        designation: "Designation",
        organization: "Ministry / Government Body",
        country: "Country",
        sessionTitle: "Session title to be announced",
        bio: "Short biography placeholder covering this leader's portfolio and policy focus.",
        photoUrl: "",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
  {
    id: "ai-technology",
    title: "AI and Technology Experts",
    showDownload: true,
    speakers: [
      {
        name: "Speaker Name TBA",
        designation: "Designation",
        organization: "University / Organization",
        country: "Country",
        sessionTitle: "Session title to be announced",
        bio: "Short biography placeholder describing this expert's research or industry focus in AI and technology.",
        photoUrl: "",
        profileUrl: "#",
        cardUrl: "",
      },
      {
        name: "Speaker Name TBA",
        designation: "Designation",
        organization: "University / Organization",
        country: "Country",
        sessionTitle: "Session title to be announced",
        bio: "Short biography placeholder describing this expert's research or industry focus in AI and technology.",
        photoUrl: "",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability Experts",
    showDownload: true,
    speakers: [
      {
        name: "Speaker Name TBA",
        designation: "Designation",
        organization: "University / Organization",
        country: "Country",
        sessionTitle: "Session title to be announced",
        bio: "Short biography placeholder describing this expert's work in sustainability.",
        photoUrl: "",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
  {
    id: "industry-leaders",
    title: "Industry Leaders",
    showDownload: true,
    speakers: [
      {
        name: "Speaker Name TBA",
        designation: "Designation",
        organization: "Company / Organization",
        country: "Country",
        sessionTitle: "Session title to be announced",
        bio: "Short biography placeholder describing this leader's industry background.",
        photoUrl: "",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
  {
    id: "international-orgs",
    title: "International Organization Representatives",
    showDownload: true,
    speakers: [
      {
        name: "Speaker Name TBA",
        designation: "Designation",
        organization: "Organization",
        country: "Country",
        sessionTitle: "Session title to be announced",
        bio: "Short biography placeholder describing this representative's role and organization.",
        photoUrl: "",
        profileUrl: "#",
        cardUrl: "",
      },
    ],
  },
];

export default function SpeakersPage() {
  return (
    <>
      <Nev />
      <main className="min-h-screen pt-24 pb-16">
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Speakers</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">Speakers</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Meet the keynote speaker, IAUP leadership, and expert panelists joining the IAUP
              Semi-Annual Meeting 2026. Profiles below will be updated as speakers are confirmed.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
          {speakerCategories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{category.title}</h2>
                <span className="text-sm font-medium text-slate-400">
                  {category.speakers.length} {category.speakers.length === 1 ? "speaker" : "speakers"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.speakers.map((speaker, index) => (
                  <SpeakerCard
                    key={`${category.id}-${index}`}
                    speaker={speaker}
                    showDownload={category.showDownload}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}