import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import IaupLeadersSection from "@/components/homepage/iaupLeadersSection";
import EventSpeakers from "@/components/homepage/EventSpeakers";
import { UserSquare2, Sparkles, Calendar, MapPin, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Guest & Speakers | IAUP Semi-Annual Meeting 2026",
  description: "Meet the chief guests, keynote speaker, IAUP leadership, and panel speakers at the IAUP Semi-Annual Meeting 2026 in Dhaka, Bangladesh.",
};

const chiefGuests = [
  {
    name: "A. N. M. Ehsanul Hoque Milan",
    role: "Hon'ble Minister",
    institution: "Ministry of Education, Government of Bangladesh",
    position: "Chief Guest, Opening Ceremony",
    image: "/milan-edu-minister.jpeg",
  },
  {
    name: "Professor Dr. Mamun Ahmed",
    role: "Chairman",
    institution: "University Grants Commission (UGC) of Bangladesh",
    position: "Chief Guest, Book Launching & Cultural Night",
    image: "/mamun-ahmed.jpeg",
  },
  {
    isTba: true,
    position: "Chief Guest, Special Plenary Session",
    tbaNote: "The distinguished Chief Guest presiding over this special conference session will be officially announced shortly.",
  },
];

function ChiefGuestComingSoonCard({ position, tbaNote }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-border aspect-4/5 flex items-center justify-center transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-2">
      <div className="absolute inset-0 transition-opacity duration-500 bg-linear-to-br from-slate-50 to-slate-100 opacity-100 group-hover:opacity-80" />

      <div className="relative z-10 flex flex-col items-center text-center p-8 w-full h-full justify-center">
        <div className="w-32 h-32 rounded-full bg-slate-200 mb-8 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden relative group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          <UserSquare2 className="text-slate-400 w-12 h-12" />
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Soon</span>
          </div>
        </div>

        <h4 className="font-display font-bold text-2xl text-dark mb-3 group-hover:text-primary transition-colors duration-300">
          To Be Announced
        </h4>
        <p className="text-primary font-semibold text-sm mb-3">{position}</p>
        <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-5 group-hover:bg-primary group-hover:w-20 transition-all duration-500 ease-out" />
        <p className="text-muted text-sm leading-relaxed px-4">{tbaNote}</p>
      </div>
    </div>
  );
}

function ChiefGuestCard({ guest }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-primary/15 border-2 border-primary/30 aspect-4/5 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 hover:border-primary/60 hover:-translate-y-2">
      <div className="absolute inset-0 transition-opacity duration-500 bg-linear-to-br from-primary/5 via-white to-emerald-500/5 opacity-100 group-hover:opacity-90" />

      <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center p-8 w-full h-full justify-center">
        <div className="w-32 h-32 rounded-full bg-slate-200 mb-5 flex items-center justify-center border-4 border-white shadow-md overflow-hidden relative ring-4 ring-primary/25 group-hover:ring-primary/60 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          <Image
            src={guest.image}
            alt={guest.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 128px"
          />
        </div>

        <h4 className="font-display font-bold text-xl text-dark mb-1 group-hover:text-primary transition-colors duration-300">
          {guest.name}
        </h4>
        <p className="text-primary font-semibold text-sm mb-1">{guest.position}</p>
        <p className="text-muted text-sm leading-relaxed px-4">
          {guest.role}
          {guest.institution ? ` · ${guest.institution}` : ""}
        </p>
      </div>
    </div>
  );
}

function ChiefGuestsSection() {
  return (
    <section id="chief-guests" className="py-24 lg:py-32 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            Distinguished Guests
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6">
            Chief <span className="gradient-text">Guests</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {chiefGuests.map((guest, index) => (
            <div key={guest.name || guest.position} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
              {guest.isTba ? (
                <ChiefGuestComingSoonCard position={guest.position} tbaNote={guest.tbaNote} />
              ) : (
                <ChiefGuestCard guest={guest} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SpeakersPage() {
  return (
    <>
      <Nev />

      <main className="min-h-screen pt-20">
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

        <ChiefGuestsSection />
        <IaupLeadersSection />
        <EventSpeakers />

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
                href="/program-schedule"
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
