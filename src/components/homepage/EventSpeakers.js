import Image from "next/image";
import { UserSquare2, Sparkles, Award, Globe } from "lucide-react";

const keynoteSpeaker = {
  name: "Alexander A. Mejia",
  designation: "Director",
  organization: "Division for People and Social Development at United Nations Institute for Training and Research (UNITAR)",
  image: "/Alexander.jpeg",
  badge: "Keynote Speaker",
};

const speakers = [
  {
    name: "Devorah Lieberman, PhD",
    designation: "President Emerita",
    organization: "University of La Verne",
    country: "USA",
    image: "/Devorah-Lieberman.jpg",
  },
];

export default function EventSpeakers() {
  return (
    <div id="speakers">
      {/* ========================================================================= */}
      {/* 1. KEYNOTE SPEAKER SECTION (Distinguishable & Distinct Section)           */}
      {/* ========================================================================= */}
      <section
        id="keynote-speaker"
        className="py-24 lg:py-32 bg-white relative overflow-hidden"
      >
        {/* Ambient Decorative Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(9,80,158,0.08),transparent_70%)] pointer-events-none -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 via-amber-500/10 to-secondary/10 border border-primary/20 text-primary font-semibold text-xs uppercase tracking-widest mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Guest of Honor &amp; Keynote</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-4">
              Keynote <span className="gradient-text">Speaker</span>
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              We are honored to welcome our distinguished Keynote Speaker for the IAUP Semi-Annual Meeting 2026.
            </p>
          </div>

          {/* Keynote Featured Card (Distinguishable, Hero-Grade Presentation) */}
          <div className="max-w-4xl mx-auto reveal relative">
            {/* Ambient Multi-Color Rim Glow */}
            <div className="absolute -inset-1.5 rounded-3xl lg:rounded-4xl bg-linear-to-r from-primary/30 via-amber-400/25 to-secondary/30 blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700 -z-10" />

            <div className="group relative bg-linear-to-br from-white via-slate-50/60 to-white rounded-3xl lg:rounded-4xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-primary/10 border-2 border-primary/25 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 overflow-hidden">
              {/* Subtle Decorative Background Mesh */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12 text-center md:text-left">
                {/* Image Section */}
                <div className="relative shrink-0">
                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-68 lg:h-68 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-primary/25 group-hover:ring-primary/50 group-hover:scale-[1.02] transition-all duration-500 ease-out bg-slate-100">
                    <Image
                      src={keynoteSpeaker.image}
                      alt={keynoteSpeaker.name}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 272px"
                    />
                  </div>

                  {/* Overlaid Pill Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-dark text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-white/20 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    <span>Keynote Speaker</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col items-center md:items-start pt-2 md:pt-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3 text-primary" /> Keynote Address
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-dark mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {keynoteSpeaker.name}
                  </h3>

                  <p className="text-primary font-semibold text-lg sm:text-xl mb-3">
                    {keynoteSpeaker.designation}
                  </p>

                  <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full mb-4 group-hover:w-28 transition-all duration-500" />

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                    {keynoteSpeaker.organization}
                  </p>

                  {/* Badges / Pill Tags */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      UNITAR
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs">
                      United Nations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EVENT / FEATURED SPEAKERS SECTION (Devorah Lieberman, PhD)             */}
      {/* ========================================================================= */}
      <section
        id="distinguished-speakers"
        className="py-24 lg:py-32 bg-slate-50 relative border-t border-slate-200/80"
      >
        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
              Distinguished Guests
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6">
              Event <span className="gradient-text">Speakers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* Slot 1: Coming Soon */}
            <div className="reveal" style={{ transitionDelay: "100ms" }}>
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
                    Coming Soon
                  </h4>
                  <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-5 group-hover:bg-primary group-hover:w-20 transition-all duration-500 ease-out" />
                  <p className="text-muted text-sm leading-relaxed px-4">
                    Eminent speaker details will be announced shortly. Stay tuned for updates!
                  </p>
                </div>
              </div>
            </div>

            {/* Slot 2 (Middle - Glowing Featured Speaker): Devorah Lieberman, PhD */}
            <div className="reveal relative" style={{ transitionDelay: "200ms" }}>
              {/* Ambient Background Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/40 via-emerald-500/30 to-primary/40 blur-xl opacity-75 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700 -z-10 animate-pulse" />

              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-primary/15 border-2 border-primary/30 aspect-4/5 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 hover:border-primary/60 hover:-translate-y-2">
                <div className="absolute inset-0 transition-opacity duration-500 bg-linear-to-br from-primary/5 via-white to-emerald-500/5 opacity-100 group-hover:opacity-90" />

                {/* Glowing Corner Accents */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500 pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center p-8 w-full h-full justify-center">
                  <div className="w-32 h-32 rounded-full bg-slate-200 mb-5 flex items-center justify-center border-4 border-white shadow-md overflow-hidden relative ring-4 ring-primary/25 group-hover:ring-primary/60 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <Image
                      src={speakers[0].image}
                      alt={speakers[0].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 128px"
                    />
                  </div>

                  <h4 className="font-display font-bold text-xl text-dark mb-1 group-hover:text-primary transition-colors duration-300">
                    {speakers[0].name}
                  </h4>
                  <p className="text-primary font-semibold text-sm mb-1">
                    {speakers[0].designation}
                  </p>
                  <p className="text-muted text-sm leading-relaxed px-4">
                    {speakers[0].organization}
                    {speakers[0].country ? ` · ${speakers[0].country}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Slot 3: Coming Soon */}
            <div className="reveal" style={{ transitionDelay: "300ms" }}>
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
                    Coming Soon
                  </h4>
                  <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-5 group-hover:bg-primary group-hover:w-20 transition-all duration-500 ease-out" />
                  <p className="text-muted text-sm leading-relaxed px-4">
                    Eminent speaker details will be announced shortly. Stay tuned for updates!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}