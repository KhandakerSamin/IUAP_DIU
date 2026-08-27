import Image from "next/image";
import { UserSquare2 } from "lucide-react";

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
    <section id="speakers" className="py-24 lg:py-32 bg-slate-50 relative">
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
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  Featured Speaker
                </span>

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
  );
}