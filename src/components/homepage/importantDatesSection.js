import { CalendarDays } from "lucide-react";

export default function ImportantDatesSection() {
  const importantDates = [
    { label: "Early Bird Registration Deadline", date: "September 30, 2026" },
    { label: "General Registration Deadline", date: "October 30, 2026" },
    { label: "Late Registration Deadline", date: "November 10, 2026" },
    { label: "Program Date", date: "19-21 November 2026" },
  ];

  return (
    <section id="important-dates" className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-secondary/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            <CalendarDays className="w-5 h-5" />
            Timeline
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Important <span className="gradient-text">Dates</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 reveal reveal-delay-1">
          {importantDates.map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300">
              <span className="text-slate-300 font-medium text-sm tracking-wide uppercase mb-6 flex-1">
                {item.label}
              </span>
              <span className="font-display text-lg sm:text-xl xl:text-2xl whitespace-nowrap font-bold text-white">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}