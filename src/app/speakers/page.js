import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import Link from "next/link";
import { Crown, Sparkles, Users, PartyPopper, Calendar, MapPin, ArrowRight, BookOpen } from "lucide-react";
import SpeakerCard, { SpeakerPlaceholderCard } from "../../components/speakerPage/speaker-card";

export const metadata = {
  title: "Guest & Speakers | IAUP Semi-Annual Meeting 2026",
  description: "Meet the chief guests, keynote speakers, IAUP leadership, and expert panelists at the IAUP Semi-Annual Meeting 2026 in Dhaka, Bangladesh.",
};

// Enriched speakers list with institutional tags, detailed roles, and verified credentials
const speakerCategories = [
  {
    id: "chief-guests",
    title: "Chief Guests",
    subtitle: "Distinguished government dignitaries and national higher education leaders presiding over major meeting milestones.",
    showDownload: false,
    featured: true,
    speakers: [
      {
        name: "A. N. M. Ehsanul Hoque Milan",
        role: "Chief Guest",
        titleLines: ["Hon'ble Minister", "Ministry of Education"],
        organization: "Ministry of Education, Government of Bangladesh",
        country: "Bangladesh",
        sessionTitle: "Chief Guest, Opening Ceremony",
        bio: "Hon'ble Minister for the Ministry of Education, Government of Bangladesh, presiding as Chief Guest during the grand Opening Ceremony of the IAUP Semi-Annual Meeting 2026.",
        photoUrl: "/milan-edu-minister.jpeg",
        profileUrl: "",
        cardUrl: "",
        tags: ["Ministry of Education", "Government of Bangladesh", "Opening Ceremony"],
      },
      {
        name: "Professor Dr. Mamun Ahmed",
        role: "Chief Guest",
        titleLines: ["Chairman", "University Grants Commission (UGC) of Bangladesh"],
        organization: "University Grants Commission (UGC)",
        country: "Bangladesh",
        sessionTitle: "Chief Guest, Book Launching & Cultural Night",
        bio: "Chairman of the University Grants Commission of Bangladesh, leading national university accreditation and policy, joining as Chief Guest for the prestigious Book Launching and Bangladesh Cultural Night.",
        photoUrl: "/mamun-ahmed.jpeg",
        profileUrl: "",
        cardUrl: "",
        tags: ["UGC Bangladesh", "Higher Education Leadership", "Cultural Night"],
      },
      {
        name: "Chief Guest",
        role: "Chief Guest",
        titleLines: [],
        organization: "",
        country: "Bangladesh",
        sessionTitle: "Chief Guest, Special Plenary Session",
        bio: "",
        isTba: true,
        tbaNote: "The distinguished Chief Guest presiding over this special conference session will be officially announced shortly.",
        photoUrl: "",
        profileUrl: "",
        cardUrl: "",
        tags: ["Announcement Pending", "Special Plenary"],
      },
    ],
  },
  {
    id: "keynote",
    title: "Keynote Speaker",
    subtitle: "World-renowned international development leader sharing visionary perspectives on global higher education.",
    showDownload: false,
    featured: true,
    speakers: [
      {
        name: "Mr. Alexander A. Mejia",
        role: "Keynote Speaker",
        titleLines: [
          "Director, Division for People and Social Development",
          "Managing Director, CIFAL Global Network",
          "United Nations Institute for Training and Research (UNITAR)",
        ],
        organization: "UNITAR",
        country: "United Nations / Switzerland",
        sessionTitle: "Keynote Address",
        bio: "Director of the Division for People and Social Development and Managing Director of the CIFAL Global Network at the United Nations Institute for Training and Research (UNITAR), championing worldwide sustainable development training and capacity building.",
        photoUrl: "/Alexander.jpeg",
        profileUrl: "https://unitar.org",
        cardUrl: "",
        tags: ["UNITAR", "United Nations", "CIFAL Global Network"],
      },
    ],
  },
  {
    id: "iaup-leadership",
    title: "IAUP Leadership",
    subtitle: "Distinguished academic presidents shaping the strategic trajectory of higher education worldwide.",
    showDownload: true,
    featured: true,
    speakers: [
      {
        name: "Devorah Lieberman, PhD",
        role: "IAUP Leadership",
        designation: "President Emerita",
        organization: "University of La Verne",
        country: "USA",
        sessionTitle: "IAUP Leadership & Thematic Sessions",
        bio: "Dr. Devorah Lieberman is President Emerita of the University of La Verne and an active executive leader in the International Association of University Presidents (IAUP), recognized internationally for inclusive academic excellence.",
        photoUrl: "/Devorah-Lieberman.jpg",
        profileUrl: "https://laverne.edu",
        cardUrl: "",
        tags: ["IAUP Leadership", "University of La Verne", "USA"],
      },
    ],
  },
];

// Static Tailwind classes for compilation safety
const CATEGORY_STYLES = {
  "chief-guests": {
    icon: Crown,
    badge: "border-primary/20 bg-primary/10 text-primary",
    glow: "from-primary/35 via-secondary/20 to-primary/35",
    ring: "border-primary/25 ring-primary/10",
    avatarRing: "ring-primary/25",
    session: "text-primary",
    dot: "bg-primary",
    section: "bg-white",
    blob: "bg-primary/10",
  },
  keynote: {
    icon: Sparkles,
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-600",
    glow: "from-amber-400/40 via-amber-300/20 to-primary/25",
    ring: "border-amber-400/35 ring-amber-400/15",
    avatarRing: "ring-amber-400/35",
    session: "text-amber-600",
    dot: "bg-amber-500",
    section: "bg-slate-50/60",
    blob: "bg-amber-400/15",
  },
  "iaup-leadership": {
    icon: Users,
    badge: "border-secondary/25 bg-secondary/10 text-secondary",
    glow: "from-secondary/35 via-emerald-300/20 to-secondary/35",
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

      {/* Fixed Category Quick Nav */}
      <nav className="fixed inset-x-0 top-16 z-30 h-[62px] border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md sm:top-20">
        <div className="mx-auto flex h-full max-w-340 items-center justify-between gap-2 overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {speakerCategories.map((category) => {
              const style = CATEGORY_STYLES[category.id] || DEFAULT_CATEGORY_STYLE;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition-all hover:border-primary hover:text-primary hover:shadow-xs"
                >
                  <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
                  {category.title}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">
              19–21 November 2026 | Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </nav>

      <main className="min-h-screen pt-[140px]">
        {/* Hero Header Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(9,80,158,0.12),transparent_70%)]" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative mx-auto max-w-340 px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-linear-to-r from-primary/10 via-amber-500/10 to-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-xs">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Distinguished Guests &amp; Keynote
              </span>

              <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl font-display">
                Guests &amp; <span className="gradient-text">Speakers</span>
              </h1>

              {/* Event Metadata Highlights */}
              <div className="mt-1 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700 sm:text-base">
                <span className="inline-flex items-center gap-1.5 text-primary">
                  <Calendar className="h-4 w-4 text-primary" />
                  19–21 November 2026
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-700">
                  <MapPin className="h-4 w-4 text-secondary" />
                  Dhaka, Bangladesh
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                  IAUP Semi-Annual Meeting 2026
                </span>
              </div>

              <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Meet the esteemed ministers, global educational dignitaries, keynote addresses, and university presidents shaping the future of global higher education.
              </p>
            </div>
          </div>
        </section>

        {/* Categories & Speaker Cards */}
        {speakerCategories.map((category, index) => {
          const count = categorySpeakerCount(category);
          const style = CATEGORY_STYLES[category.id] || DEFAULT_CATEGORY_STYLE;
          const Icon = style.icon;

          return (
            <section
              key={category.id}
              id={category.id}
              className={`relative scroll-mt-36 overflow-hidden py-16 sm:py-24 ${style.section} ${
                index > 0 ? "border-t border-slate-200/90" : ""
              }`}
            >
              <div className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full ${style.blob} blur-3xl`} />
              <div className={`pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full ${style.blob} blur-3xl`} />

              <div className="relative mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
                {/* Category Header */}
                <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/70 pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${style.badge} shadow-xs`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-4xl">
                        {category.title}
                      </h2>
                    </div>
                    {category.subtitle && (
                      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-600 self-start sm:self-auto">
                    {count} {count === 1 ? "Profile" : "Profiles"}
                  </span>
                </div>

                {/* Speaker Cards Grid */}
                <div
                  className={
                    category.speakers.length === 1
                      ? "mx-auto max-w-xl"
                      : "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
                  }
                >
                  {category.speakers.map((speaker, speakerIndex) =>
                    speaker.tba ? (
                      <SpeakerPlaceholderCard
                        key={`${category.id}-${speakerIndex}`}
                        count={speaker.count}
                        role={category.title}
                        accent={style}
                      />
                    ) : (
                      <SpeakerCard
                        key={`${category.id}-${speakerIndex}`}
                        speaker={speaker}
                        showDownload={category.showDownload}
                        size={category.featured ? "lg" : "md"}
                        accent={{
                          ring: style.ring,
                          glow: style.glow,
                          session: style.session,
                          avatarRing: style.avatarRing,
                          badge: style.badge,
                          dot: style.dot,
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom Call to Action Section */}
        <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative mx-auto max-w-340 px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              IAUP 2026 Dhaka
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Be Part of This Global Leadership Gathering
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
              Engage directly with international university presidents, key policymakers, and thought leaders at the IAUP Semi-Annual Meeting 2026.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/registration"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-primary/30"
              >
                Register for Conference
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tentative-program"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <BookOpen className="h-4 w-4" />
                View Event Schedule
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}