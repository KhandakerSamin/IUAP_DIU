import { CalendarDays, Clock, CheckCircle2, Sparkles } from "lucide-react";

export default function ImportantDatesSection() {
  const timelineSteps = [
    {
      step: "01",
      phase: "Early Bird",
      label: "Early Bird Registration Deadline",
      date: "September 20, 2026",
      desc: "Special discounted rates for early registrants",
      badge: "Save up to $100",
      active: true,
    },
    {
      step: "02",
      phase: "General",
      label: "General Registration Deadline",
      date: "October 10, 2026",
      desc: "Regular registration window for all participants",
      badge: "Standard Rate",
      active: false,
    },
    {
      step: "03",
      phase: "Late",
      label: "Late Registration Deadline",
      date: "October 30, 2026",
      desc: "Final registration window before the conference",
      badge: "Final Call",
      active: false,
    },
    {
      step: "04",
      phase: "Conference",
      label: "Program & Conference Date",
      date: "19–21 November 2026",
      desc: "IAUP Semi-Annual Meeting in Dhaka, Bangladesh",
      badge: "Event Days",
      featured: true,
      active: false,
    },
  ];

  return (
    <section id="important-dates" className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-120 h-120 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-120 h-120 bg-secondary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-primary text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <CalendarDays className="w-4 h-4 text-secondary" />
            Conference Timeline
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Important <span className="gradient-text">Dates & Milestones</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Mark your calendar with key registration deadlines and event dates for the IAUP Semi-Annual Meeting 2026.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Visible on lg & up) */}
        <div className="hidden lg:block reveal reveal-delay-1">
          {/* Horizontal Connecting Progress Line */}
          <div className="relative mb-14">
            <div className="absolute top-6 left-12 right-12 h-1 bg-gradient-to-r from-primary via-secondary to-primary/80 rounded-full z-0 opacity-75" />
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {timelineSteps.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Step Node */}
                  <div
                    className={`w-13 h-13 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg border-2 ${
                      item.featured
                        ? "bg-secondary text-white border-white ring-4 ring-secondary/30 scale-110"
                        : "bg-slate-900 text-slate-200 border-primary ring-4 ring-primary/20 hover:scale-110 hover:border-secondary hover:text-white"
                    }`}
                  >
                    {item.featured ? <Sparkles className="w-5 h-5" /> : item.step}
                  </div>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.phase}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-6">
            {timelineSteps.map((item, idx) => (
              <div
                key={idx}
                className={`group relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  item.featured
                    ? "bg-gradient-to-b from-white/15 via-white/10 to-white/5 border-2 border-secondary/60 shadow-2xl shadow-secondary/20"
                    : "bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/50 hover:bg-white/10 shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        item.featured
                          ? "bg-secondary/20 text-secondary border border-secondary/30"
                          : "bg-white/10 text-slate-300 border border-white/10"
                      }`}
                    >
                      {item.badge}
                    </span>
                    <Clock className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="text-slate-300 font-semibold text-sm leading-snug mb-3 group-hover:text-white transition-colors">
                    {item.label}
                  </h3>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4">
                  <p
                    className={`font-display text-xl xl:text-2xl font-bold tracking-tight ${
                      item.featured ? "text-secondary" : "text-white"
                    }`}
                  >
                    {item.date}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (Visible below lg) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.75 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-primary/50 reveal">
          <div className="space-y-8">
            {timelineSteps.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node on Vertical Track */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 ${
                    item.featured
                      ? "bg-secondary text-white border-white ring-4 ring-secondary/30"
                      : "bg-slate-900 text-slate-200 border-primary ring-2 ring-primary/30"
                  }`}
                >
                  {item.step}
                </div>

                {/* Content Card */}
                <div
                  className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                    item.featured
                      ? "bg-gradient-to-b from-white/15 to-white/5 border-2 border-secondary/60 shadow-xl"
                      : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{item.phase}</span>
                  </div>

                  <h3 className="text-slate-200 font-semibold text-sm sm:text-base mb-2">
                    {item.label}
                  </h3>

                  <p
                    className={`font-display text-lg sm:text-xl font-bold ${
                      item.featured ? "text-secondary" : "text-white"
                    }`}
                  >
                    {item.date}
                  </p>
                  <p className="text-slate-400 text-xs mt-1.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}