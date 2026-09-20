import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import { Crown, Sparkles, Users, PartyPopper } from "lucide-react";
import SpeakerCard, { SpeakerPlaceholderCard } from "../../components/speakerPage/speaker-card";

export const metadata = {
  title: "Guest & Speakers | IAUP Semi-Annual Meeting 2026",
  description: "Meet the chief guests, keynote speakers, IAUP leadership, and expert panelists at the IAUP Semi-Annual Meeting 2026.",
};

// Edit this list to add, remove, or update speakers. Each category renders
// as its own section, in the order listed below.
const speakerCategories = [
  {
    id: "chief-guests",
    title: "Chief Guests",
    showDownload: false,
    featured: true,
    speakers: [
      {
        name: "A. N. M. Ehsanul Hoque Milan",
        titleLines: ["Hon'ble Minister", "Ministry of Education"],
        country: "",
        sessionTitle: "Chief Guest, Opening Ceremony",
        bio: "",
        photoUrl: "/milan-edu-minister.jpeg",
        profileUrl: "",
        cardUrl: "",
      },
      {
        name: "Professor Dr. Mamun Ahmed",
        titleLines: ["Chairman", "University Grants Commission (UGC) of Bangladesh"],
        country: "",
        sessionTitle: "Chief Guest, Book Launching & Bangladesh Cultural Night",
        bio: "",
        photoUrl: "/mamun-ahmed.jpeg",
        profileUrl: "",
        cardUrl: "",
      },
      {
        name: "To Be Confirmed",
        titleLines: [],
        country: "",
        sessionTitle: "Chief Guest",
        bio: "",
        photoUrl: "",
        profileUrl: "",
        cardUrl: "",
      },
    ],
  },
  {
    id: "keynote",
    title: "Keynote Speaker",
    showDownload: false,
    featured: true,
    speakers: [
      {
        name: "Mr. Alexander A. Mejia",
        titleLines: [
          "Director, Division for People and Social Development",
          "Managing Director, CIFAL Global Network",
          "United Nations Institute for Training and Research (UNITAR)",
        ],
        country: "",
        sessionTitle: "Keynote Address",
        bio: "Director of the Division for People and Social Development and Managing Director of the CIFAL Global Network at the United Nations Institute for Training and Research (UNITAR).",
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
  // The categories below are commented out until their speakers are
  // confirmed — uncomment (and remove the block-comment markers) to publish
  // them again. Give any re-enabled category an entry in CATEGORY_STYLES too.
  /*
  {
    id: "ministers-government",
    title: "Ministers and Government Leaders",
    showDownload: true,
    speakers: [{ tba: true, count: 1 }],
  },
  {
    id: "ai-technology",
    title: "AI and Technology Experts",
    showDownload: true,
    speakers: [{ tba: true, count: 2 }],
  },
  {
    id: "sustainability",
    title: "Sustainability Experts",
    showDownload: true,
    speakers: [{ tba: true, count: 1 }],
  },
  {
    id: "industry-leaders",
    title: "Industry Leaders",
    showDownload: true,
    speakers: [{ tba: true, count: 1 }],
  },
  {
    id: "international-orgs",
    title: "International Organization Representatives",
    showDownload: true,
    speakers: [{ tba: true, count: 1 }],
  },
  */
];

// Static Tailwind classes only — these get keyed by id, never built from a
// dynamic string, so the compiler can see every class name it needs to keep.
const CATEGORY_STYLES = {
  "chief-guests": {
    icon: Crown,
    badge: "border-primary/20 bg-primary/10 text-primary",
    glow: "from-primary/30 via-secondary/20 to-primary/30",
    ring: "border-primary/20 ring-primary/10",
    avatarRing: "ring-primary/20",
    session: "text-primary",
    dot: "bg-primary",
    section: "bg-white",
    blob: "bg-primary/10",
  },
  keynote: {
    icon: Sparkles,
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-600",
    glow: "from-amber-400/35 via-amber-300/15 to-primary/20",
    ring: "border-amber-400/30 ring-amber-400/15",
    avatarRing: "ring-amber-400/30",
    session: "text-amber-600",
    dot: "bg-amber-500",
    section: "bg-slate-50",
    blob: "bg-amber-400/10",
  },
  "iaup-leadership": {
    icon: Users,
    badge: "border-secondary/25 bg-secondary/10 text-secondary",
    glow: "from-secondary/30 via-emerald-300/15 to-secondary/30",
    ring: "border-secondary/25 ring-secondary/15",
    avatarRing: "ring-secondary/25",
    session: "text-secondary",
    dot: "bg-secondary",
    section: "bg-white",
    blob: "bg-secondary/10",
  },
};

const DEFAULT_CATEGORY_STYLE = {
  icon: PartyPopper,
  badge: "border-slate-300 bg-slate-100 text-slate-600",
  glow: "from-slate-300/30 via-slate-200/15 to-slate-300/30",
  ring: "border-slate-300 ring-slate-200",
  avatarRing: "ring-slate-200",
  session: "text-slate-600",
  dot: "bg-slate-400",
  section: "bg-white",
  blob: "bg-slate-200/40",
};

function categorySpeakerCount(category) {
  return category.speakers.reduce((total, s) => total + (s.tba ? s.count || 1 : 1), 0);
}

export default function SpeakersPage() {
  return (
    <>
      <Nev />

      {/* Fixed Category Quick Nav (position: sticky is unusable here — body has
          overflow-x: hidden globally, which breaks sticky in every browser) */}
      <nav className="fixed inset-x-0 top-16 z-30 h-[60px] border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md sm:top-20">
        <div className="mx-auto flex h-full max-w-340 items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8">
          {speakerCategories.map((category) => {
            const style = CATEGORY_STYLES[category.id] || DEFAULT_CATEGORY_STYLE;
            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary"
              >
                <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
                {category.title}
              </a>
            );
          })}
        </div>
      </nav>

      <main className="min-h-screen pt-[140px]">
        {/* Header Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(9,80,158,0.1),transparent_70%)]" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative mx-auto max-w-340 px-4 py-12 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-linear-to-r from-primary/10 via-amber-500/10 to-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Guest &amp; Speakers
            </span>
            <h1 className="mt-4 text-[30px] font-bold leading-[1.15] text-slate-950 sm:text-[44px]">
              Guest &amp; <span className="gradient-text">Speakers</span>
            </h1>
            <p className="mt-3 text-[17px] font-bold text-slate-800 sm:text-[19px]">
              19–21 November 2026 | Dhaka, Bangladesh
            </p>
            <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-slate-600 sm:text-[18px]">
              Meet the distinguished leaders, experts, and higher education professionals joining
              the IAUP Semi-Annual Meeting 2026. Profiles below will be updated as guests and
              speakers are confirmed.
            </p>
          </div>
        </section>

        {speakerCategories.map((category, index) => {
          const count = categorySpeakerCount(category);
          const style = CATEGORY_STYLES[category.id] || DEFAULT_CATEGORY_STYLE;
          const Icon = style.icon;

          return (
            <section
              key={category.id}
              id={category.id}
              className={`relative scroll-mt-36 overflow-hidden py-16 sm:py-20 ${style.section} ${
                index > 0 ? "border-t border-slate-200" : ""
              }`}
            >
              <div className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full ${style.blob} blur-3xl`} />
              <div className={`pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full ${style.blob} blur-3xl`} />

              <div className="relative mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${style.badge}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">{category.title}</h2>
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    {count} {count === 1 ? "speaker" : "speakers"}
                  </span>
                </div>

                <div
                  className={
                    category.speakers.length === 1
                      ? "mx-auto max-w-md"
                      : `grid grid-cols-1 gap-6 sm:grid-cols-2 ${category.featured ? "" : "lg:grid-cols-3"}`
                  }
                >
                  {category.speakers.map((speaker, speakerIndex) =>
                    speaker.tba ? (
                      <SpeakerPlaceholderCard key={`${category.id}-${speakerIndex}`} count={speaker.count} />
                    ) : (
                      <SpeakerCard
                        key={`${category.id}-${speakerIndex}`}
                        speaker={speaker}
                        showDownload={category.showDownload}
                        size={category.featured ? "lg" : "md"}
                        accent={
                          category.featured
                            ? { ring: style.ring, glow: style.glow, session: style.session, avatarRing: style.avatarRing }
                            : undefined
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}