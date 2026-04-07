"use client";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const targetDate = new Date("2026-11-19T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="h-screen relative overflow-hidden flex items-center justify-center bg-slate-50 text-center"
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center h-full">
        
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/60 border border-slate-200/60 shadow-sm backdrop-blur-md mb-6 reveal">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide uppercase">Registration Now Open</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight text-slate-900 reveal reveal-delay-1">
          IAUP Semi-Annual
          <br />
          <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Meeting 2026
          </span>
        </h1>

        <p className="text-xl sm:text-3xl text-slate-800 font-display font-bold mb-3 reveal reveal-delay-1">
          19–21 November
        </p>

        <p className="text-lg sm:text-xl text-slate-700 font-display font-semibold mb-5 reveal reveal-delay-2 max-w-3xl leading-snug">
          Transforming Higher Education for a Sustainable, Innovative, and AI-Enabled Future
        </p>

        <div className="text-base text-slate-600 mb-8 max-w-2xl reveal reveal-delay-2 flex flex-col items-center gap-1 md:gap-0 font-medium">
          <p className="font-bold text-slate-800 text-lg">Daffodil International University</p>
          <p>Daffodil Smart City, Birulia, Savar, Dhaka – 1216, Bangladesh</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal reveal-delay-3 mb-10">
          <a href="#registration" className="group relative inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-200 bg-primary border border-transparent rounded-full shadow-lg hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary overflow-hidden">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative">Register Now</span>
          </a>
        </div>

        {/* Modern Countdown Timer */}
        <div className="reveal reveal-delay-4 flex justify-center gap-3 sm:gap-5 mt-2 w-full">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 flex items-center justify-center mb-2 shadow-sm transition-transform hover:-translate-y-0.5">
                <span className="font-display text-2xl sm:text-3xl font-bold text-slate-800 tabular-nums relative">
                  {mounted ? String(item.value).padStart(2, "0") : "00"}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
        
      </div>

      {/* Smooth transition to the light section below */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-b from-transparent to-light pointer-events-none" />
    </section>
  );
}
