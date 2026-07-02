import { UserSquare2 } from "lucide-react";

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-border aspect-4/5 flex items-center justify-center transition-all duration-500 hover:shadow-sm hover:-translate-y-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}