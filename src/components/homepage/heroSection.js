export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[calc(100svh-5rem)] md:min-h-[calc(100dvh-5rem)] relative overflow-hidden flex items-center bg-slate-50"
    >
      {/* Delicate Modern Mesh Gradients for Light Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#e0f2fe,transparent_45%),radial-gradient(circle_at_100%_0%,#ccfbf1,transparent_45%),radial-gradient(circle_at_100%_100%,#fef08a,transparent_45%),radial-gradient(circle_at_0%_100%,#e0e7ff,transparent_45%)] opacity-80" />
      
      {/* Subtle Grid Pattern with Fade mask */}
      <div className="absolute inset-0 opacity-[0.2] bg-[linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      {/* Floating Animated Orbs for Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-140 h-140 bg-primary/20 rounded-full blur-3xl -top-20 -right-20 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute w-120 h-120 bg-secondary/20 rounded-full blur-3xl -bottom-32 -left-20 animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-340 mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-3xl">
            {/* Minimalist Live Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/60 border border-slate-200/60 shadow-sm backdrop-blur-md mb-8 reveal">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Registration Now Open</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 reveal reveal-delay-1 tracking-tight text-slate-900">
              DIU Semi-Annual
              <br />
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent pb-2">
                Meeting 2026
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-700 font-display font-medium mb-5 reveal reveal-delay-2">
              Resilient Minds, Innovative Pathways
            </p>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl reveal reveal-delay-2">
              Join global academic leaders at Daffodil International University, Dhaka, for an extraordinary gathering focused on resilience, innovation, and the future of higher education.
            </p>

            <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
              <a href="#registration" className="px-8 py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5">
                Register Now
              </a>
              <a href="#about" className="px-8 py-4 rounded-xl bg-white/70 text-slate-900 font-medium hover:bg-white transition-all shadow-sm border border-slate-200 hover:-translate-y-0.5 backdrop-blur-md">
                Learn More
              </a>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6 reveal reveal-delay-4">
              <div className="flex items-center gap-2.5 text-slate-600 text-sm font-medium bg-white/40 px-4 py-2 rounded-lg border border-slate-200/50 backdrop-blur-sm">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                November 15-17, 2026
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 text-sm font-medium bg-white/40 px-4 py-2 rounded-lg border border-slate-200/50 backdrop-blur-sm">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Dhaka, Bangladesh
              </div>
            </div>
          </div>

          <aside className="reveal reveal-delay-2 mt-8 lg:mt-0">
            <div className="relative rounded-3xl border border-white/70 bg-white/50 backdrop-blur-xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] p-8 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/70 to-white/20 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <p className="uppercase text-xs font-bold tracking-[0.2em] text-slate-500">Event Spotlight</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Live Onsite
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight mb-8 text-slate-800">
                  A high-impact forum for global university leadership
                </h3>

                <div className="space-y-3 mb-10">
                  <div className="rounded-2xl bg-white/70 border border-slate-100/60 px-5 py-4 shadow-sm transition-transform hover:-translate-y-1 duration-300 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Date</p>
                    <p className="font-semibold text-slate-900">November 15-17, 2026</p>
                  </div>
                  <div className="rounded-2xl bg-white/70 border border-slate-100/60 px-5 py-4 shadow-sm transition-transform hover:-translate-y-1 duration-300 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Location</p>
                    <p className="font-semibold text-slate-900">Daffodil Smart City, Dhaka</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white/60 border border-slate-100/60 p-4 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-display text-2xl font-black text-primary">35+</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">Countries</p>
                  </div>
                  <div className="rounded-2xl bg-white/60 border border-slate-100/60 p-4 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-display text-2xl font-black text-secondary">50+</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">Partners</p>
                  </div>
                  <div className="rounded-2xl bg-white/60 border border-slate-100/60 p-4 text-center shadow-sm backdrop-blur-sm">
                    <p className="font-display text-2xl font-black text-amber-500">500+</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">Attendees</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Smooth transition to the light section below */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-b from-transparent to-light" />
    </section>
  );
}
