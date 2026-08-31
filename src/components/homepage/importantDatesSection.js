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
      badgeClass: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      active: true,
    },
    {
      step: "02",
      phase: "General",
      label: "General Registration Deadline",
      date: "October 10, 2026",
      desc: "Regular registration window for all participants",
      badge: "Standard Rate",
      badgeClass: "bg-slate-700/70 text-slate-200 border-slate-600",
      active: false,
    },
    {
      step: "03",
      phase: "Late",
      label: "Late Registration Deadline",
      date: "October 30, 2026",
      desc: "Final registration window before the conference",
      badge: "Final Call",
      badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      active: false,
    },
    {
      step: "04",
      phase: "Conference",
      label: "Program & Conference Date",
      date: "19–21 November 2026",
      desc: "IAUP Semi-Annual Meeting in Dhaka, Bangladesh",
      badge: "Event Days",
      badgeClass: "bg-emerald-500/25 text-emerald-300 border-emerald-400/50",
      featured: true,
      active: false,
    },
  ];

  return (
    <section id="important-dates" className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-120 h-120 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-120 h-120 bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <CalendarDays className="w-4 h-4 text-emerald-400" />
            Conference Timeline
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Important{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Dates
            </span>
          </h2>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Mark your calendar with key registration deadlines and event dates for the IAUP Semi-Annual Meeting 2026.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (Visible on lg & up) */}
        <div className="hidden lg:block reveal reveal-delay-1">
          {/* Horizontal Connecting Progress Line */}
          <div className="relative mb-14">
            <div className="absolute top-[26px] -translate-y-1/2 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-teal-400 rounded-full z-0 shadow-[0_0_12px_rgba(52,211,153,0.3)]" />
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {timelineSteps.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Step Node */}
                  <div
                    className={`w-13 h-13 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-xl border-2 ${
                      item.featured
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 border-white ring-4 ring-emerald-400/40 scale-110 shadow-emerald-500/30 font-black"
                        : "bg-slate-900 text-white border-blue-400 ring-4 ring-blue-500/20 hover:scale-110 hover:border-emerald-400 hover:text-emerald-300"
                    }`}
                  >
                    {item.featured ? <Sparkles className="w-5 h-5 text-slate-950" /> : item.step}
                  </div>
                  <span
                    className={`mt-3 text-xs font-bold uppercase tracking-wider ${
                      item.featured ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
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
                    ? "bg-gradient-to-b from-emerald-950/60 via-slate-900/95 to-slate-900/95 border-2 border-emerald-400 shadow-2xl shadow-emerald-950/50 hover:border-emerald-300"
                    : "bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 hover:border-blue-400/60 hover:bg-slate-850 hover:shadow-xl hover:shadow-blue-500/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                    <Clock
                      className={`w-4 h-4 transition-colors ${
                        item.featured
                          ? "text-emerald-400 group-hover:text-white"
                          : "text-slate-400 group-hover:text-blue-400"
                      }`}
                    />
                  </div>

                  <h3
                    className={`font-semibold text-sm leading-snug mb-3 transition-colors min-h-10 ${
                      item.featured
                        ? "text-emerald-100 group-hover:text-white"
                        : "text-white group-hover:text-blue-300"
                    }`}
                  >
                    {item.label}
                  </h3>
                </div>

                <div
                  className={`pt-4 border-t mt-4 ${
                    item.featured ? "border-emerald-500/30" : "border-slate-700/80"
                  }`}
                >
                  <p
                    className={`font-display text-lg xl:text-xl 2xl:text-2xl font-bold tracking-tight whitespace-nowrap ${
                      item.featured
                        ? "text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                        : "text-white"
                    }`}
                  >
                    {item.date}
                  </p>
                  <p
                    className={`text-xs mt-2 leading-relaxed min-h-8 ${
                      item.featured ? "text-emerald-200/80" : "text-slate-300"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (Visible below lg) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.75 before:bg-gradient-to-b before:from-blue-400 before:via-emerald-400 before:to-emerald-300 reveal">
          <div className="space-y-8">
            {timelineSteps.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node on Vertical Track */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 shadow-lg ${
                    item.featured
                      ? "bg-emerald-500 text-slate-950 border-white ring-4 ring-emerald-400/40"
                      : "bg-slate-900 text-white border-blue-400 ring-2 ring-blue-500/30"
                  }`}
                >
                  {item.step}
                </div>

                {/* Content Card */}
                <div
                  className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                    item.featured
                      ? "bg-gradient-to-b from-emerald-950/60 via-slate-900/95 to-slate-900/95 border-2 border-emerald-400 shadow-xl shadow-emerald-950/40"
                      : "bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        item.featured ? "text-emerald-400" : "text-slate-300"
                      }`}
                    >
                      {item.phase}
                    </span>
                  </div>

                  <h3
                    className={`font-semibold text-sm sm:text-base mb-2 ${
                      item.featured ? "text-emerald-100" : "text-white"
                    }`}
                  >
                    {item.label}
                  </h3>

                  <p
                    className={`font-display text-lg sm:text-xl font-bold ${
                      item.featured ? "text-emerald-300" : "text-white"
                    }`}
                  >
                    {item.date}
                  </p>
                  <p
                    className={`text-xs mt-1.5 ${
                      item.featured ? "text-emerald-200/80" : "text-slate-300"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}